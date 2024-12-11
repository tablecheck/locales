import { type Locale } from '../types';

export const english = {
  code: 'en',
  facebook: 'en_US',
  label: 'English',
  loadingText: 'Loading...',
  translations: {
    ar: 'Arabic',
    de: 'German',
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    id: 'Indonesian',
    it: 'Italian',
    ja: 'Japanese',
    ko: 'Korean',
    lo: 'Lao',
    ms: 'Malay',
    pt: 'Portuguese',
    ru: 'Russian',
    th: 'Thai',
    tl: 'Filipino',
    tr: 'Turkish',
    vi: 'Vietnamese',
    'zh-CN': '‪Chinese (Simp.)',
    'zh-TW': '‪Chinese (Trad.)',
  },
} as const satisfies Locale;
