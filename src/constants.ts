import { arabic } from './localeDefinitions/arabic';
import { chineseSimplified } from './localeDefinitions/chineseSimplified';
import { chineseTraditional } from './localeDefinitions/chineseTraditional';
import { dutch } from './localeDefinitions/dutch';
import { english } from './localeDefinitions/english';
import { french } from './localeDefinitions/french';
import { german } from './localeDefinitions/german';
import { hebrew } from './localeDefinitions/hebrew';
import { hindi } from './localeDefinitions/hindi';
import { indonesian } from './localeDefinitions/indonesian';
import { italian } from './localeDefinitions/italian';
import { japanese } from './localeDefinitions/japanese';
import { khmer } from './localeDefinitions/khmer';
import { korean } from './localeDefinitions/korean';
import { lao } from './localeDefinitions/lao';
import { malay } from './localeDefinitions/malay';
import { portuguese } from './localeDefinitions/portuguese';
import { russian } from './localeDefinitions/russian';
import { spanish } from './localeDefinitions/spanish';
import { tagalog } from './localeDefinitions/tagalog';
import { thai } from './localeDefinitions/thai';
import { vietnamese } from './localeDefinitions/vietnamese';
import { type Locale } from './types';

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
  arabic,
  hebrew,
  hindi,
  khmer,
  dutch,
} as const;

/**
 * Priority ordered array of locales
 */
export const ordered = [
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
  locales.arabic,
  locales.hebrew,
  locales.hindi,
  locales.khmer,
  locales.dutch,
] as const satisfies Locale[];

/**
 * Lookup of locale objects by LocaleCode
 */
export const localeCodeMap = new Map<LocaleCode, Locale>();
ordered.forEach((l) => {
  localeCodeMap.set(l.code, l);
});

export type LocaleCode = (typeof ordered)[number]['code'];

/**
 * Priority ordered array of ISO 639-1 locale codes
 */
export const orderedLocaleCodes: LocaleCode[] = ordered.map(
  (locale) => locale.code,
);
