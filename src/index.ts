import { arabic } from './localeDefinitions/arabic';
import { chineseSimplified } from './localeDefinitions/chineseSimplified';
import { chineseTraditional } from './localeDefinitions/chineseTraditional';
import { english } from './localeDefinitions/english';
import { french } from './localeDefinitions/french';
import { german } from './localeDefinitions/german';
import { indonesian } from './localeDefinitions/indonesian';
import { italian } from './localeDefinitions/italian';
import { japanese } from './localeDefinitions/japanese';
import { korean } from './localeDefinitions/korean';
import { lao } from './localeDefinitions/lao';
import { malay } from './localeDefinitions/malay';
import { portuguese } from './localeDefinitions/portuguese';
import { russian } from './localeDefinitions/russian';
import { spanish } from './localeDefinitions/spanish';
import { tagalog } from './localeDefinitions/tagalog';
import { thai } from './localeDefinitions/thai';
import { vietnamese } from './localeDefinitions/vietnamese';

export const locales = {
  english,
  japanese,
  korean,
  chineseSimplified,
  chineseTraditional,
  german,
  spanish,
  french,
  italian,
  indonesian,
  malay,
  portuguese,
  russian,
  tagalog,
  thai,
  lao,
  vietnamese,
  arabic
} as const;

/**
 * Priority ordered array of locales
 */
export const ordered: typeof locales[keyof typeof locales][] = [
  locales.english,
  locales.japanese,
  locales.korean,
  locales.chineseSimplified,
  locales.chineseTraditional,
  locales.german,
  locales.spanish,
  locales.french,
  locales.italian,
  locales.indonesian,
  locales.malay,
  locales.portuguese,
  locales.russian,
  locales.tagalog,
  locales.thai,
  locales.lao,
  locales.vietnamese,
  locales.arabic
];

export type LocaleCode = typeof ordered[number]['code'];

/**
 * Returns the correct default locale
 */
export function getDefaultLocale(
  selectableLocales?: LocaleCode[]
): typeof ordered[number] {
  const filteredLocales = selectableLocales
    ? ordered.filter((item) =>
        selectableLocales.find((locale) => locale === item.code)
      )
    : ordered;

  const englishLocale = filteredLocales.find((locale) => locale.code === 'en');
  if (englishLocale) return englishLocale;

  const japaneseLocale = filteredLocales.find((locale) => locale.code === 'ja');
  if (japaneseLocale) return japaneseLocale;

  return filteredLocales[0];
}

/**
 * Priority ordered array of ISO 639-1 locale codes
 */
export const orderedLocaleCodes: LocaleCode[] = ordered.map(
  (locale) => locale.code
);

/**
 * Re-order and filter a list of locales to match the default order
 * @param localesToOrder
 */
export function orderLocales(localesToOrder: LooseLocaleCode[]): LocaleCode[] {
  return orderedLocaleCodes.filter(
    (locale) => localesToOrder.indexOf(locale) >= 0
  );
}

// eslint-disable-next-line @typescript-eslint/ban-types -- this supports autocomplete of only LocaleCode values but is typed as string
type LooseLocaleCode = LocaleCode | (string & {});

/**
 * Function to check if a locale is CJK - Chinese/Japanese/Korean.
 * Often logic is set to be different in these three language types as they
 * use chinese characters or their derivatives
 * @param locale
 */
export function isCJKLocale(locale: LooseLocaleCode): boolean {
  return (
    locale === japanese.code ||
    locale === korean.code ||
    locale === chineseSimplified.code ||
    locale === chineseTraditional.code
  );
}
