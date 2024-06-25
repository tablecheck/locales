import { localeTypeCheck } from '../types';

export const arabic = {
  code: 'ar',
  facebook: 'ar_AR',
  label: 'عربى',
  loadingText: 'جار التحميل...',
  dir: 'rtl',
  translations: {
    ar: 'العربية',
    de: 'الألمانية',
    en: 'الإنجليزية',
    es: 'الإسبانية',
    fr: 'الفرنسية',
    id: 'الإندونيسية',
    it: 'الإبطالية',
    ja: 'اليابانية',
    ko: 'الكورية',
    lo: 'اللاوسية',
    ms: 'الملايو',
    pt: 'البرتغالية',
    ru: 'الروسية',
    th: 'التايلاندية',
    tl: 'الفلبينية',
    tr: 'التركية',
    vi: 'الفيتنامية',
    'zh-CN': 'الصينية (المبسيطة)',
    'zh-TW': 'الصينية (التقليدية)'
  }
} as const;
localeTypeCheck(arabic);
