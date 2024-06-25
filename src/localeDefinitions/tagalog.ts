import { localeTypeCheck } from '../types';

export const tagalog = {
  code: 'tl',
  facebook: 'tl_PH',
  label: 'Tagalog',
  loadingText: 'Naglo-load...',
  moment: 'tl-ph',
  aliases: ['fil'],
  translations: {
    ar: 'Arabe',
    de: 'Aleman',
    en: 'Ingles',
    es: 'Espanyol',
    fr: 'Pranses',
    id: 'Indonesiyo',
    it: 'Italyano',
    ja: 'Hapones',
    ko: 'Koreano',
    lo: 'Lao',
    ms: 'Malay',
    pt: 'Portuges',
    ru: 'Ruso',
    th: 'Thai',
    tl: 'Tagalog',
    tr: 'Turko',
    vi: 'Vietnamese',
    'zh-CN': 'Tsino (Pinasimple)',
    'zh-TW': 'Tsino (Tradisyonal)'
  }
} as const;
localeTypeCheck(tagalog);
