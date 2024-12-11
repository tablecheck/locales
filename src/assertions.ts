import { type LocaleCode, orderedLocaleCodes } from './constants';

// eslint-disable-next-line @typescript-eslint/ban-types -- this supports autocomplete of only LocaleCode values but is typed as string
export type LooseLocaleCode = LocaleCode | (string & {});

/**
 * Check if the string is a valid `LocaleCode`
 * @param locale
 * @returns true if the locale is a valid `LocaleCode`
 *
 * @example
 *
 * ```ts
 *   const locale: string = 'en';
 *   if (isLocaleCode(locale)) {
 *     const typedLocale: LocaleCode = locale; // no error
 *   }
 *   const typedLocale2: LocaleCode = locale; // error as locale is string
 * ```
 */
export function isLocaleCode(
  locale: LooseLocaleCode | undefined,
): locale is LocaleCode {
  return !!locale && orderedLocaleCodes.includes(locale as LocaleCode);
}

/**
 * Use this function to assert that a `string` is a valid `LocaleCode`
 * @param locale
 * @throws Error if the locale is not a valid `LocaleCode`
 *
 * @example
 *
 * ```ts
 *   const locale: string = 'en';
 *   assertLocaleCode(locale);
 *   const typedLocale: LocaleCode = locale; // no error as locale is now LocaleCode typed
 * ```
 */
export function assertLocaleCode(
  locale: LooseLocaleCode | undefined,
): asserts locale is LocaleCode | undefined {
  if (locale && !orderedLocaleCodes.includes(locale as LocaleCode)) {
    throw new Error(`Invalid Locale Code: ${locale}`);
  }
}

/**
 * Typed utility to make sure the string is a "LocaleCode" without extra typing
 * @param locale
 * @returns
 */
export function localeString(locale: LocaleCode): LocaleCode {
  return locale;
}
