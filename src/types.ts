export interface Locale {
  /**
   * Optional locale ISO codes that should resolve to this one
   */
  aliases?: readonly string[];
  /**
   * The ISO code of the locale
   */
  code: string;
  /**
   * Writing direction, if not defined assume 'ltr'
   */
  dir?: 'rtl' | 'ltr';
  /**
   * Locale code for facebook
   */
  facebook: string;
  /**
   * display label - always in this locale
   */
  label: string;
  /**
   * text to display when loading the locale
   */
  loadingText: string;
  /**
   * Locale code for moment, defaults to code
   */
  moment?: string;
  /**
   * Just for Japan, uses special post code prefix
   */
  postCodePrefix?: string;
  /**
   * All locale names in this language
   */
  translations: {
    [key: string]: string;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function localeTypeCheck(locale: Readonly<Locale>): void {}
