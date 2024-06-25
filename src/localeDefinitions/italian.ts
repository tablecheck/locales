import { localeTypeCheck } from '../types';

export const italian = {
  code: 'it',
  facebook: 'it_IT',
  label: 'Italiano',
  loadingText: 'Caricamento in corso...',
  translations: {
    ar: 'Araba',
    de: 'Tedesco',
    en: 'English',
    es: 'Spagnolo',
    fr: 'French',
    id: 'Indonesiana',
    it: 'Italiano',
    ja: 'Japanese',
    ko: 'Korean',
    lo: 'Lao',
    ms: 'Malese',
    pt: 'Portoghese',
    ru: 'Russo',
    th: 'Tailandese',
    tl: 'Filippina',
    tr: 'Turca',
    vi: 'Vietnamita',
    'zh-CN': '‪Chinese (simp.)',
    'zh-TW': '‪Chinese (trad.)'
  }
} as const;
localeTypeCheck(italian);
