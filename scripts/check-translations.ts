#!/usr/bin/env bun
/**
 * Script to check if any locale files are missing translations
 * This validates that all locale files contain translations for all supported locales
 */

import { readdir } from 'node:fs/promises';
import path from 'node:path';

import { locales, orderedLocaleCodes } from '../src/constants';
import type { Locale } from '../src/types';

interface TranslationIssue {
  locale: string;
  code: string;
  missingCode: string;
  filePath: string;
}

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const localesDir = path.join(
  import.meta.dir as never as string,
  '..',
  'src',
  'localeDefinitions',
);

console.log('=== 1. Locales defined in constants.ts ===');
console.log(
  `Found ${Object.keys(locales).length} locales defined in constants.ts:`,
);
Object.entries(locales).forEach(([name, locale]) => {
  console.log(`  - ${name} (${(locale as Locale).code})`);
});

console.log('\n=== 2. Comparing locale definition files with constants ===');
const expectedFiles = Object.keys(locales).map((name) => `${name}.ts`);

const actualFilesArray = await readdir(localesDir)
  .then((files) => files.filter((file: string) => file.endsWith('.ts')))
  .catch((err: Error) => {
    console.error(`Error reading directory: ${err.message}`);
    return [] as string[];
  });

console.log(
  `Found ${actualFilesArray.length} .ts files in src/localeDefinitions/:`,
);

const missingFiles = expectedFiles.filter(
  (file) => !actualFilesArray.includes(file),
);
const extraFiles = actualFilesArray.filter(
  (file: string) => !expectedFiles.includes(file),
);

actualFilesArray.forEach((file: string) => {
  const baseName = file.replace(/\.ts$/, '');
  const doesExist = Object.keys(locales).includes(baseName);
  const status = doesExist ? '✓' : '✗ (Not in constants.ts)';
  console.log(`  - ${file} ${status}`);
});

if (missingFiles.length > 0) {
  console.log('\n❌ Missing locale definition files:');
  missingFiles.forEach((file) => {
    console.log(`  - ${file} (defined in constants.ts but file not found)`);
  });
}

if (extraFiles.length > 0 && !isGitHubActions) {
  console.log('\n⚠️ Extra locale definition files (not in constants.ts):');
  extraFiles.forEach((file: string) => {
    console.log(`  - ${file}`);
  });
}

console.log('\n=== 3. Checking for missing translations ===');
console.log(
  `Validating that each locale has translations for all ${orderedLocaleCodes.length} locale codes: ${orderedLocaleCodes.join(', ')}`,
);

const issues: TranslationIssue[] = [];
const totalLocales = Object.keys(locales).length;
let checkedCount = 0;

Object.entries(locales).forEach(([localeName, locale]) => {
  const { code, translations } = locale as Locale;
  checkedCount += 1;

  const translationCount = Object.keys(translations).length;
  const isComplete = translationCount >= orderedLocaleCodes.length;
  const statusIcon = isComplete ? '✓' : '✗';
  const progressPercent = Math.floor((checkedCount / totalLocales) * 100);

  if (!isGitHubActions) {
    process.stdout.write(
      `\r[${progressPercent}%] Checking ${localeName} (${code}): ${statusIcon} `,
    );
  }

  const missingTranslations: string[] = [];

  orderedLocaleCodes.forEach((expectedCode) => {
    if (!translations[expectedCode]) {
      const filePath = path.join(localesDir, `${localeName}.ts`);

      issues.push({
        locale: localeName,
        code,
        missingCode: expectedCode,
        filePath,
      });

      missingTranslations.push(expectedCode);
    }
  });

  if (missingTranslations.length > 0) {
    if (!isGitHubActions) {
      console.log(`Missing: ${missingTranslations.join(', ')}`);
    }
  } else if (!isGitHubActions) {
    console.log('');
  }
});

if (!isGitHubActions) {
  console.log('\nTranslation check complete!');
}

// Show final results
console.log('\n=== Results Summary ===');

const hasFileIssues = missingFiles.length > 0;
const hasTranslationIssues = issues.length > 0;

if (!hasFileIssues && !hasTranslationIssues) {
  console.log('✅ All checks passed:');
  console.log(
    `  - All ${Object.keys(locales).length} locales from constants.ts have corresponding files`,
  );
  console.log(
    `  - All locales have complete translations for all ${orderedLocaleCodes.length} locale codes`,
  );
} else {
  if (hasFileIssues) {
    console.log(`❌ Missing ${missingFiles.length} locale definition files`);
  }

  if (hasTranslationIssues) {
    if (isGitHubActions) {
      console.log('\n::group::Missing Translations');
      console.log(
        '::error::Translation check failed. Missing translations found:',
      );

      issues.forEach((issue) => {
        console.log(
          `::error file=${issue.filePath},title=Missing Translation::${issue.locale} (${issue.code}) is missing translation for '${issue.missingCode}'`,
        );
      });

      console.log(`\n::error::Total issues: ${issues.length}`);
      console.log('::endgroup::');
    } else {
      console.log(`\n❌ Found ${issues.length} missing translations:`);

      issues.forEach((issue, index) => {
        console.log(
          `  ${index + 1}. Locale ${issue.locale} (${issue.code}) is missing translation for '${issue.missingCode}'`,
        );
      });
    }
  }

  process.exit(1);
}
