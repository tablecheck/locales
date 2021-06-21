export enum LocaleCode {
  Arabic = 'ar',
  ChineseSimplified = 'zh-CN',
  ChineseTraditional = 'zh-TW',
  English = 'en',
  French = 'fr',
  German = 'de',
  Indonesian = 'id',
  Italian = 'it',
  Japanese = 'ja',
  Korean = 'ko',
  Lao = 'lo',
  Malay = 'ms',
  Portuguese = 'pt',
  Russian = 'ru',
  Spanish = 'es',
  Tagalog = 'tl',
  Thai = 'th',
  Turkish = 'tr',
  Vietnamese = 'vi'
}

export interface Locale {
  /**
   * Optional locale ISO codes that should resolve to this one
   */
  aliases?: string[];
  /**
   * The ISO code of the locale
   */
  code: LocaleCode;
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
    [key in LocaleCode]: string;
  };
}
