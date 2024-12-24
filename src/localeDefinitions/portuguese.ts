import { type Locale } from '../types';

export const portuguese = {
  code: 'pt',
  facebook: 'pt_PT',
  label: 'Português',
  loadingText: 'Carregandot...',
  translations: {
    ar: 'Árabe',
    de: 'Alemão',
    en: 'Inglês',
    es: 'Espanhol',
    fr: 'Francês',
    id: 'Indonésia',
    it: 'Italiano',
    ja: 'Japonês',
    ko: 'Coreano',
    lo: 'Lao',
    ms: 'Malaio',
    pt: 'Português',
    ru: 'Russo',
    th: 'Tailandês',
    tl: 'Filipina',
    tr: 'Turco',
    vi: 'Vietnamita',
    'zh-CN': '‪Chinês (Simp.)',
    'zh-TW': '‪Chinês (Trad.)',
  },
} as const satisfies Locale;
