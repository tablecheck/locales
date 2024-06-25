import { localeTypeCheck } from '../types';

export const german = {
  code: 'de',
  facebook: 'de_DE',
  label: 'Deutsch',
  loadingText: 'Laden...',
  translations: {
    ar: 'Arabisch',
    de: 'Deutsch',
    en: 'Englisch',
    es: 'Spanisch',
    fr: 'Französich',
    id: 'Indonesisch',
    it: 'Italienisch',
    ja: 'Japanisch',
    ko: 'Koreanisch',
    lo: 'Laotisch',
    ms: 'Malaiisch',
    pt: 'Portugiesisch',
    ru: 'Russisch',
    th: 'Thai',
    tl: 'Philippinisch',
    tr: 'Türkisch',
    vi: 'Vietnamesisch',
    'zh-CN': '‪Chinesisch (Einf.)',
    'zh-TW': '‪Chinesisch (Trad.)'
  }
} as const;
localeTypeCheck(german);
