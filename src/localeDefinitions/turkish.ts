import { type Locale } from '../types';

export const turkish = {
  code: 'tr',
  facebook: 'tr_TR',
  label: 'Türkçe',
  loadingText: 'Yükleniyor...',
  translations: {
    ar: 'Arapça',
    de: 'Almanca',
    en: 'ingilizce',
    es: 'İspanyol',
    fr: 'Fransızca',
    he: 'İbranice',
    hi: 'Hintçe',
    id: 'Endonezya dili',
    it: 'İtalyan',
    ja: 'Japonca',
    km: 'Kmerce',
    ko: 'Koreli',
    lo: 'Laoca',
    ms: 'Malay',
    nl: 'Hollandaca',
    pt: 'Portekizce',
    ru: 'Rusça',
    th: 'Tay dili',
    tl: 'Filipinli',
    tr: 'Türkçe',
    vi: 'vietnam',
    'zh-CN': 'Basitleştirilmiş Çince',
    'zh-TW': 'Çin geleneği',
  },
} as const satisfies Locale;
