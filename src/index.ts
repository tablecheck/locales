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
import { turkish } from './localeDefinitions/turkish';
import { vietnamese } from './localeDefinitions/vietnamese';
import { Locale, LocaleCode } from './types';

export * from './types';

/**
 * Priority ordered array of locales
 */
export const ordered: Locale[] = [
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
];

/**
 * Returns the correct default locale
 */
export function getDefaultLocale(selectableLocales?: LocaleCode[]) {
  const locales: Locale[] = selectableLocales ? ordered.filter((item: Locale) =>
      selectableLocales.find((locale) => locale === item.code)) : ordered;

  const englishLocale = locales.find(locale => locale.code === LocaleCode.English);
  if (englishLocale) return englishLocale;

  const japaneseLocale = locales.find(locale => locale.code === LocaleCode.Japanese);
  if (japaneseLocale) return japaneseLocale;

  return locales[0];
}

/**
 * Priority ordered array of LocaleCodes
 */
export const orderedLocales: LocaleCode[] = ordered.map(
  (locale) => locale.code
);

/**
 * All locales
 * @type {Object} keys are locale codes, values are Locale objects
 */
export const locales: { [key in LocaleCode]: Locale } = {
  [LocaleCode.English]: english,
  [LocaleCode.Japanese]: japanese,
  [LocaleCode.Korean]: korean,
  [LocaleCode.ChineseSimplified]: chineseSimplified,
  [LocaleCode.ChineseTraditional]: chineseTraditional,
  [LocaleCode.German]: german,
  [LocaleCode.Spanish]: spanish,
  [LocaleCode.French]: french,
  [LocaleCode.Italian]: italian,
  [LocaleCode.Indonesian]: indonesian,
  [LocaleCode.Malay]: malay,
  [LocaleCode.Portuguese]: portuguese,
  [LocaleCode.Russian]: russian,
  [LocaleCode.Tagalog]: tagalog,
  [LocaleCode.Thai]: thai,
  [LocaleCode.Lao]: lao,
  [LocaleCode.Vietnamese]: vietnamese,
  [LocaleCode.Arabic]: arabic,
  [LocaleCode.Turkish]: turkish
};

/**
 * Function to check if a locale is CJK - Chinese/Japanese/Korean.
 * Often logic is set to be different in these three language types as they
 * use chinese characters or their derivatives
 * @param locale
 */
export function isCJKLocale(locale: LocaleCode): boolean {
  return (
    locale === LocaleCode.Japanese ||
    locale === LocaleCode.Korean ||
    locale === LocaleCode.ChineseSimplified ||
    locale === LocaleCode.ChineseTraditional
  );
}
