import { type LooseLocaleCode } from './assertions';
import {
  type LocaleCode,
  locales,
  ordered,
  orderedLocaleCodes,
} from './constants';
import { type Locale } from './types';

export * from './assertions';
export * from './constants';
export * from './resolve';
export * from './types';

/**
 * Returns the correct default locale
 */
export function getDefaultLocale(selectableLocales?: LocaleCode[]): Locale {
  const filteredLocales = selectableLocales
    ? ordered.filter((item) =>
        selectableLocales.find((locale) => locale === item.code),
      )
    : ordered;

  const englishLocale = filteredLocales.find((locale) => locale.code === 'en');
  if (englishLocale) return englishLocale;

  const japaneseLocale = filteredLocales.find((locale) => locale.code === 'ja');
  if (japaneseLocale) return japaneseLocale;

  return filteredLocales[0] ?? locales.english;
}

/**
 * Re-order and filter a list of locales to match the default order
 * @param localesToOrder
 */
export function orderLocales(localesToOrder: LooseLocaleCode[]): LocaleCode[] {
  return orderedLocaleCodes.filter(
    (locale) => localesToOrder.indexOf(locale) >= 0,
  );
}

/**
 * Function to check if a locale is CJK - Chinese/Japanese/Korean.
 * Often logic is set to be different in these three language types as they
 * use chinese characters or their derivatives
 * @param locale
 */
export function isCJKLocale(locale: LooseLocaleCode): boolean {
  return (
    locale === locales.japanese.code ||
    locale === locales.korean.code ||
    locale === locales.chineseSimplified.code ||
    locale === locales.chineseTraditional.code
  );
}
