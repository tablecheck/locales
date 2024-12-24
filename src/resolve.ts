import { isLocaleCode } from './assertions';
import {
  type LocaleCode,
  localeCodeMap,
  locales,
  orderedLocaleCodes,
} from './constants';

const ARABIC_COUNTRIES = [
  'DZ',
  'BH',
  'KM',
  'DJ',
  'EG',
  'IQ',
  'JO',
  'KW',
  'LB',
  'LY',
  'MR',
  'MA',
  'OM',
  'PS',
  'QA',
  'SA',
  'SO',
  'SD',
  'SY',
  'TN',
  'AE',
  'YE',
];

function getPreferredLocales(country: string): LocaleCode[] {
  switch (country.toUpperCase()) {
    case 'JP':
      return [locales.japanese.code];
    case 'KR':
      return [locales.korean.code];
    case 'CN':
      return [locales.chineseSimplified.code, locales.chineseTraditional.code];
    case 'TW':
    case 'HK':
      return [locales.chineseTraditional.code, locales.chineseSimplified.code];
    case 'MO':
      return [
        locales.chineseTraditional.code,
        locales.chineseSimplified.code,
        locales.english.code,
        locales.portuguese.code,
      ];
    case 'SG':
      return [
        locales.english.code,
        locales.chineseTraditional.code,
        locales.chineseSimplified.code,
      ];
    case 'TH':
      return [
        locales.thai.code,
        locales.english.code,
        locales.chineseSimplified.code,
        locales.chineseTraditional.code,
      ];
    case 'ID':
      return [
        locales.indonesian.code,
        locales.english.code,
        locales.chineseSimplified.code,
        locales.chineseTraditional.code,
      ];
    case 'MY':
      return [
        locales.malay.code,
        locales.english.code,
        locales.chineseSimplified.code,
        locales.chineseTraditional.code,
      ];
    case 'LA':
      return [
        locales.lao.code,
        locales.english.code,
        locales.chineseSimplified.code,
        locales.chineseTraditional.code,
      ];
    case 'VN':
      return [
        locales.vietnamese.code,
        locales.english.code,
        locales.chineseSimplified.code,
        locales.chineseTraditional.code,
      ];
    case 'DE':
    case 'AT':
      return [locales.german.code];
    case 'ES':
    case 'MX':
      return [locales.spanish.code];
    case 'FR':
      return [locales.french.code];
    case 'PT':
    case 'BR':
      return [locales.portuguese.code];
    case 'IT':
      return [locales.italian.code];
    case 'RU':
      return [locales.russian.code];
    case 'PH':
      return [locales.tagalog.code];
    default:
      if (ARABIC_COUNTRIES.includes(country.toUpperCase())) {
        return [locales.arabic.code];
      }
      return [];
  }
}

function parseLocale({
  locale,
  availableLocales,
  preferredLocales,
}: {
  locale: string | undefined;
  availableLocales: LocaleCode[];
  preferredLocales: LocaleCode[];
}): LocaleCode {
  const availablePreferredLocals = preferredLocales.filter((l) =>
    availableLocales.includes(l),
  );
  if (!isLocaleCode(locale) || !availableLocales.includes(locale)) {
    return (availablePreferredLocals[0] ?? preferredLocales[0])!;
  }
  return locale;
}

function getLocalesForCountry(country?: string): LocaleCode[] {
  if (!country) {
    return orderedLocaleCodes;
  }
  const preferredLocales = getPreferredLocales(country);
  return [
    ...preferredLocales,
    ...orderedLocaleCodes.filter((l) => !preferredLocales.includes(l)),
  ];
}

export function resolveLocaleConfig({
  locale,
  country,
  availableLocales,
}: {
  locale?: string;
  country?: string;
  availableLocales: LocaleCode[];
}): { locale: LocaleCode; supportedLngs: LocaleCode[] } {
  const preferredLocales = getLocalesForCountry(country).filter((l) =>
    availableLocales.includes(l),
  );
  return {
    locale: parseLocale({ locale, availableLocales, preferredLocales }),
    supportedLngs: preferredLocales,
  };
}

class AcceptLanguageParser {
  private supported: Set<LocaleCode>;

  private normalized: Map<string, LocaleCode>;

  private aliases: Map<string, LocaleCode>;

  constructor(supportedLocales: LocaleCode[]) {
    this.aliases = new Map();
    this.supported = new Set(supportedLocales);
    this.normalized = new Map();
    supportedLocales.forEach((l) => {
      this.normalized.set(l.toLowerCase(), l);
      localeCodeMap.get(l)?.aliases?.forEach((alias) => {
        this.aliases.set(alias.toLowerCase(), l);
      });
    });
  }

  public parse(
    acceptLanguage: string | null | undefined | void,
  ): LocaleCode | undefined {
    if (!acceptLanguage) return undefined;
    const languages = acceptLanguage
      .split(',')
      .map((l) => l.split(';')[0])
      .filter((s): s is string => !!s);

    for (const language of languages) {
      const code = this.checkLanguage(language);
      if (code) return code;
    }
    return undefined;
  }

  private checkLanguage(language: string) {
    const { full, short, first } = this.normalizeLanguage(language);
    return (
      this.tryLanguage(full) ??
      this.tryLanguage(short) ??
      this.tryLanguage(first)
    );
  }

  private normalizeLanguage(language: string) {
    const full = language.trim().toLowerCase().replace(/_/g, '-');
    const [first, suffix] = full.split('-') as [string, ...string[]];
    return { full, first, short: suffix ? `${first}-${suffix}` : first };
  }

  private tryLanguage(lang: string) {
    const exact = this.normalized.get(lang);
    if (exact && this.supported.has(exact)) return exact;
    const alias = this.aliases.get(lang);
    if (alias && this.supported.has(alias)) return alias;
    return undefined;
  }
}

export function configureAcceptLanguageParser(
  supportedLocales: LocaleCode[],
): (
  acceptLanguage: string | undefined | null | void,
) => LocaleCode | undefined {
  const parser = new AcceptLanguageParser(supportedLocales);
  return (acceptLanguage) => parser.parse(acceptLanguage);
}
