#!/usr/bin/env bun
/**
 * Script to download monolith translations, extract locale translations,
 * and update the localeDefinitions files with those values.
 */

import { mkdir, readdir } from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';
import { Project, PropertyAssignment, SyntaxKind } from 'ts-morph';

import { orderedLocaleCodes } from '../src/constants';

const rootDir = process.cwd();
const tempDirectory = path.join(rootDir, 'temp');
const localesDirectory = path.join(rootDir, 'src/localeDefinitions');
const monolithProjectId = '770288215d664ddccb2d75.81811722';

type LanguageTranslations = Record<string, string>;

type LocaleTranslations = Record<string, LanguageTranslations>;

interface TranslationFile {
  languages?: Record<string, string>;
  [key: string]: unknown;
}

/**
 * Format a file with Prettier
 */
async function formatFile(filePath: string): Promise<void> {
  try {
    const proc = Bun.spawn(['npx', 'prettier', '--write', filePath], {
      stdout: 'pipe',
      stderr: 'pipe',
    });

    await proc.exited;
  } catch (error) {
    console.warn(`Warning: Could not format ${filePath} with Prettier`);
  }
}

/**
 * Downloads translations from Lokalise for the monolith project
 */
async function downloadMonolithTranslations(): Promise<void> {
  const homedir = os.homedir();
  const directory = 'monolith';

  console.log(`⏯️  Downloading ${directory} translations from lokalise...`);

  try {
    await mkdir(tempDirectory, { recursive: true });
    await mkdir(path.join(tempDirectory, directory), { recursive: true });
  } catch (error) {
    // Directory might already exist, continue
  }

  const commandArgs = [
    'file',
    'download',
    `--config=${path.join(homedir, 'lokalise-config.yml')}`,
    '--format=json',
    '--original-filenames=false',
    '--json-unescaped-slashes=true',
    '--plural-format=i18next_v4',
    '--placeholder-format=i18n',
    '--indentation=2sp',
    '--all-platforms=true',
    '--export-sort=a_z',
    '--export-empty-as=skip',
    '--unzip-to=.',
    `--project-id=${monolithProjectId}`,
    `--bundle-structure=${path.join(
      '.',
      'temp',
      directory,
      '%LANG_ISO%.%FORMAT%',
    )}`,
  ];

  try {
    const proc = Bun.spawn(['lokalise2', ...commandArgs], {
      stdout: 'pipe',
      stderr: 'pipe',
    });

    await new Response(proc.stdout).text();
    const exitCode = await proc.exited;

    if (exitCode !== 0) {
      const errorText = await new Response(proc.stderr).text();
      throw new Error(`lokalise2 command failed: ${errorText}`);
    }

    console.log(`📂 Downloaded ${directory} translations.`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error downloading translations: ${error.message}`);
    } else {
      console.error(`Error downloading translations`);
    }
    process.exit(1);
  }
}

/**
 * Extracts language names from monolith translations
 */
async function extractLocaleTranslations(): Promise<LocaleTranslations> {
  console.log('🔍 Extracting locale translations...');

  const monolithDir = path.join(tempDirectory, 'monolith');

  let files: string[];
  try {
    files = await readdir(monolithDir);
    files = files
      .filter((file) => file.endsWith('.json'))
      .map((file) => path.join(monolithDir, file));
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error reading directory: ${error.message}`);
    } else {
      console.error('Error reading directory');
    }
    return {};
  }

  const localeData: LocaleTranslations = {};

  await Promise.all(
    files.map(async (file) => {
      const filename = path.basename(file, '.json');
      const localeCode = filename;

      try {
        const translations = (await Bun.file(file).json()) as TranslationFile;
        if (translations.locales) {
          localeData[localeCode] = translations.locales as LanguageTranslations;
        }
      } catch (error) {
        if (error instanceof Error) {
          console.warn(`Warning: Could not process ${file}: ${error.message}`);
        } else {
          console.warn(`Warning: Could not process ${file}`);
        }
      }
    }),
  );

  return localeData;
}

/**
 * Process files one at a time to avoid linter warnings about await in loops
 */
async function processLocaleFile(
  localeCode: string,
  fileName: string,
  filePath: string,
  localeTranslations: LocaleTranslations,
): Promise<void> {
  try {
    if (!localeTranslations[localeCode]) {
      console.warn(`Warning: No translations found for ${localeCode}`);
      return;
    }

    console.log(`📝 Updating ${fileName}...`);

    const project = new Project({
      compilerOptions: {
        target: 99, // Use numeric value instead of string - for ES2022
        moduleResolution: 2, // Use numeric value instead of string - for 'node'
        skipLibCheck: true,
        strict: true,
      },
    });

    const sourceFile = project.addSourceFileAtPath(filePath);

    const variableName = path.basename(fileName, '.ts');
    const variableDeclarations = sourceFile.getVariableDeclarations();
    const variableDeclaration = variableDeclarations.find(
      (decl) => decl.getName() === variableName,
    );

    if (!variableDeclaration) {
      throw new Error(
        `Could not find variable declaration for ${variableName}`,
      );
    }

    const initializer = variableDeclaration.getInitializer();
    if (!initializer) {
      throw new Error(`Could not find initializer for ${variableName}`);
    }

    const objectLiteralExpression = sourceFile
      .getDescendantsOfKind(SyntaxKind.ObjectLiteralExpression)
      .find((obj) =>
        obj
          .getProperties()
          .some(
            (prop) =>
              PropertyAssignment.isPropertyAssignment(prop) &&
              prop.getName() === 'translations',
          ),
      );

    if (!objectLiteralExpression) {
      throw new Error(
        `Could not find object with translations property in ${fileName}`,
      );
    }

    const translationsProperty = objectLiteralExpression.getProperty(
      'translations',
    ) as PropertyAssignment;

    if (
      !translationsProperty ||
      !PropertyAssignment.isPropertyAssignment(translationsProperty)
    ) {
      throw new Error(`Translations property not found in ${fileName}`);
    }

    const translationsObjectLiteral = translationsProperty.getInitializerIfKind(
      SyntaxKind.ObjectLiteralExpression,
    );
    if (!translationsObjectLiteral) {
      throw new Error(`Translations is not an object literal in ${fileName}`);
    }

    const existingTranslations: Record<string, string> = {};
    for (const prop of translationsObjectLiteral.getProperties()) {
      if (PropertyAssignment.isPropertyAssignment(prop)) {
        const keyNode = prop.getNameNode();
        const valueNode = prop.getInitializer();

        let key: string;
        if (keyNode.getKind() === SyntaxKind.StringLiteral) {
          key = keyNode.getText().replace(/['"]/g, '');
        } else {
          key = keyNode.getText();
        }

        if (valueNode && valueNode.getKind() === SyntaxKind.StringLiteral) {
          const value = valueNode.getText().replace(/['"]/g, '');
          existingTranslations[key] = value;
        }
      }
    }

    const downloadedTranslations = localeTranslations[localeCode];

    const supportedLocaleCodes = new Set(orderedLocaleCodes);

    const mergedTranslations = {
      ...existingTranslations,
      ...downloadedTranslations,
    };

    translationsObjectLiteral.getProperties().forEach((prop) => prop.remove());

    const sortedKeys = Object.keys(mergedTranslations)
      .filter((key) => supportedLocaleCodes.has(key as never))
      .sort();

    for (const key of sortedKeys) {
      const value = mergedTranslations[key];
      if (value) {
        const propName = key.includes('-') ? `'${key}'` : key;
        translationsObjectLiteral.addPropertyAssignment({
          name: propName,
          initializer: `'${value.replace(/'/g, "\\'")}'`,
        });
      }
    }

    // Save the changes
    await sourceFile.save();

    // Format the file with Prettier
    await formatFile(filePath);

    console.log(`✅ Updated ${fileName}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error updating ${fileName}: ${error.message}`);
    } else {
      console.error(`Error updating ${fileName}`);
    }
  }
}

/**
 * Updates locale definition files with extracted translations
 */
async function updateLocaleDefinitionFiles(
  localeTranslations: LocaleTranslations,
): Promise<void> {
  console.log('🔄 Updating locale definition files...');

  const localeCodeMap: Record<string, string> = {
    en: 'english.ts',
    ja: 'japanese.ts',
    ko: 'korean.ts',
    'zh-CN': 'chineseSimplified.ts',
    'zh-TW': 'chineseTraditional.ts',
    de: 'german.ts',
    es: 'spanish.ts',
    fr: 'french.ts',
    it: 'italian.ts',
    id: 'indonesian.ts',
    ms: 'malay.ts',
    pt: 'portuguese.ts',
    ru: 'russian.ts',
    tl: 'tagalog.ts',
    th: 'thai.ts',
    lo: 'lao.ts',
    vi: 'vietnamese.ts',
    ar: 'arabic.ts',
    he: 'hebrew.ts',
    hi: 'hindi.ts',
    km: 'khmer.ts',
    nl: 'dutch.ts',
    tr: 'turkish.ts',
  };

  await Promise.all(
    Object.keys(localeCodeMap).map(async (localeCode) => {
      const fileName = localeCodeMap[localeCode];
      const filePath = path.join(localesDirectory, fileName);
      await processLocaleFile(
        localeCode,
        fileName,
        filePath,
        localeTranslations,
      );
    }),
  );
}

/**
 * Cleans up the temp directory
 */
async function cleanupTempDirectory(): Promise<void> {
  try {
    const proc = Bun.spawn(['rm', '-rf', tempDirectory], {
      stdout: 'pipe',
    });
    await proc.exited;
  } catch (error) {
    if (error instanceof Error) {
      console.warn(
        `Warning: Unable to clean up temp directory: ${error.message}`,
      );
    } else {
      console.warn('Warning: Unable to clean up temp directory');
    }
  }
}

async function main(): Promise<void> {
  try {
    console.log('🚀 Starting locale definitions update...');
    await downloadMonolithTranslations();
    const localeTranslations = await extractLocaleTranslations();
    await updateLocaleDefinitionFiles(localeTranslations);
    console.log('✅ Locale definitions updated successfully!');
    await cleanupTempDirectory();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`Error: Unknown error occurred`);
    }
    process.exit(1);
  }
}

void main();
