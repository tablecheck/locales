import { describe, expect, it } from 'vitest';

import { type LocaleCode, orderedLocaleCodes } from './constants';
import { configureAcceptLanguageParser, resolveLocaleConfig } from './resolve';

function expectResult({
  result,
  locale,
  country,
  availableLocales = orderedLocaleCodes,
}: {
  locale?: string;
  country?: string;
  availableLocales?: LocaleCode[];
  result: { locale: `${LocaleCode}`; supportedLngs: `${LocaleCode}`[] };
}) {
  expect(
    resolveLocaleConfig({
      locale,
      country,
      availableLocales,
    }),
  ).toEqual(result);
}

function orderFirst(...locales: `${LocaleCode}`[]) {
  return [
    ...locales,
    ...orderedLocaleCodes.filter((l) => !locales.includes(l)),
  ];
}

describe('getPreferredLocales', () => {
  it('should return en and ordered locales by default', () => {
    expectResult({
      result: { locale: 'en', supportedLngs: orderedLocaleCodes },
    });
  });

  it('should return default with invalid locale', () => {
    expectResult({
      locale: 'invalid',
      result: { locale: 'en', supportedLngs: orderedLocaleCodes },
    });
  });

  it('should return default with invalid country', () => {
    expectResult({
      country: 'invalid',
      result: { locale: 'en', supportedLngs: orderedLocaleCodes },
    });
  });

  it('should return passed valid locale with no country', () => {
    expectResult({
      locale: 'ja',
      result: { locale: 'ja', supportedLngs: orderedLocaleCodes },
    });
  });

  it('should only return locales in the availableLocales argument', () => {
    expectResult({
      locale: 'ja',
      availableLocales: ['ko'],
      result: { locale: 'ko', supportedLngs: ['ko'] },
    });
    expectResult({
      locale: 'ja',
      availableLocales: ['ko', 'en'],
      result: { locale: 'en', supportedLngs: ['en', 'ko'] },
    });
  });

  describe.each([
    ['JP', orderFirst('ja', 'en', 'ko', 'zh-CN', 'zh-TW')],
    ['KR', orderFirst('ko', 'en', 'ja', 'zh-CN', 'zh-TW')],
    ['CN', orderFirst('zh-CN', 'zh-TW')],
    ['TW', orderFirst('zh-TW', 'zh-CN')],
    ['HK', orderFirst('zh-TW', 'zh-CN')],
    ['SG', orderFirst('en', 'zh-TW', 'zh-CN')],
    ['MO', orderFirst('zh-TW', 'zh-CN', 'en', 'pt')],
    ['TH', orderFirst('th', 'en', 'zh-CN', 'zh-TW')],
    ['ID', orderFirst('id', 'en', 'zh-CN', 'zh-TW')],
    ['MY', orderFirst('ms', 'en', 'zh-CN', 'zh-TW')],
    ['LA', orderFirst('lo', 'en', 'zh-CN', 'zh-TW')],
    ['VN', orderFirst('vi', 'en', 'zh-CN', 'zh-TW')],
    ['DE', orderFirst('de')],
    ['AT', orderFirst('de')],
    ['ES', orderFirst('es')],
    ['MX', orderFirst('es')],
    ['FR', orderFirst('fr')],
    ['PT', orderFirst('pt')],
    ['BR', orderFirst('pt')],
    ['IT', orderFirst('it')],
    ['RU', orderFirst('ru')],
    ['PH', orderFirst('tl')],
    ['DZ', orderFirst('ar')],
    ['BH', orderFirst('ar')],
    ['KM', orderFirst('ar')],
    ['DJ', orderFirst('ar')],
    ['EG', orderFirst('ar')],
    ['IQ', orderFirst('ar')],
    ['JO', orderFirst('ar')],
    ['KW', orderFirst('ar')],
    ['LB', orderFirst('ar')],
    ['LY', orderFirst('ar')],
    ['MR', orderFirst('ar')],
    ['MA', orderFirst('ar')],
    ['OM', orderFirst('ar')],
    ['PS', orderFirst('ar')],
    ['QA', orderFirst('ar')],
    ['SA', orderFirst('ar')],
    ['SO', orderFirst('ar')],
    ['SD', orderFirst('ar')],
    ['SY', orderFirst('ar')],
    ['TN', orderFirst('ar')],
    ['AE', orderFirst('ar')],
    ['YE', orderFirst('ar')],
  ])('with country %s', (country, preferredLocales) => {
    it('should return preferred locales first', () => {
      expectResult({
        country,
        result: {
          locale: preferredLocales[0]!,
          supportedLngs: preferredLocales,
        },
      });
    });
    it('should return valid passed local', () => {
      const defaultLocale = preferredLocales[0];
      const locale = defaultLocale === 'en' ? 'ko' : 'en';
      expectResult({
        country,
        locale,
        result: { locale, supportedLngs: preferredLocales },
      });
    });
  });
});

describe('parse accept header', () => {
  const parseAcceptLanguage = configureAcceptLanguageParser(orderedLocaleCodes);

  it('handles blank accept-language header', () => {
    expect(parseAcceptLanguage('')).toBeUndefined();
    expect(parseAcceptLanguage(undefined)).toBeUndefined();
    expect(parseAcceptLanguage(null)).toBeUndefined();
  });

  it('parses standard en accept-language header', () => {
    expect(parseAcceptLanguage('en')).toBe('en');
    expect(parseAcceptLanguage('en-US')).toBe('en');
    expect(parseAcceptLanguage('en_US')).toBe('en');
    expect(parseAcceptLanguage('en-US,en;q=0.9')).toBe('en');
    expect(parseAcceptLanguage('en-US;q=0.9,en;q=0.8')).toBe('en');
    expect(parseAcceptLanguage('en-US;q=0.9,ja;q=0.8')).toBe('en');
  });

  it('parses exact accept-language header', () => {
    orderedLocaleCodes.forEach((lang) => {
      expect(parseAcceptLanguage(lang)).toBe(lang);
    });
  });

  it('handles chinese locales', () => {
    expect(parseAcceptLanguage('zh-CN')).toBe('zh-CN');
    expect(parseAcceptLanguage('zh_CN')).toBe('zh-CN');
    expect(parseAcceptLanguage('zh')).toBe('zh-CN');
    expect(parseAcceptLanguage('zh-TW')).toBe('zh-TW');
    expect(parseAcceptLanguage('zh_TW')).toBe('zh-TW');
    expect(parseAcceptLanguage('zh-HK')).toBe('zh-TW');
    expect(parseAcceptLanguage('zh_HK')).toBe('zh-TW');
    expect(parseAcceptLanguage('zh-MO')).toBe('zh-TW');
    expect(parseAcceptLanguage('zh_MO')).toBe('zh-TW');
    expect(parseAcceptLanguage('zh-SG')).toBe('zh-CN');
    expect(parseAcceptLanguage('zh_SG')).toBe('zh-CN');
    expect(parseAcceptLanguage('zh-Hans')).toBe('zh-CN');
    expect(parseAcceptLanguage('zh_Hans')).toBe('zh-CN');
    expect(parseAcceptLanguage('zh-Hant')).toBe('zh-TW');
    expect(parseAcceptLanguage('zh_Hant')).toBe('zh-TW');
    expect(parseAcceptLanguage('zh-Hans_CN')).toBe('zh-CN');
    expect(parseAcceptLanguage('zh_Hans_CN')).toBe('zh-CN');
    expect(parseAcceptLanguage('zh-Hant_CN')).toBe('zh-TW');
    expect(parseAcceptLanguage('zh_Hant_CN')).toBe('zh-TW');
    expect(parseAcceptLanguage('zh-Hant_TW')).toBe('zh-TW');
    expect(parseAcceptLanguage('zh_Hant_TW')).toBe('zh-TW');
    expect(parseAcceptLanguage('zh-Hant_HK')).toBe('zh-TW');
    expect(parseAcceptLanguage('zh_Hant_HK')).toBe('zh-TW');
    expect(parseAcceptLanguage('zh-Hans_SG')).toBe('zh-CN');
    expect(parseAcceptLanguage('zh_Hans_SG')).toBe('zh-CN');
  });
});
