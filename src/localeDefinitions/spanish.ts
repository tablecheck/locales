import { type Locale } from '../types';

export const spanish = {
  code: 'es',
  facebook: 'es_ES',
  label: 'Español',
  loadingText: 'Cargando...',
  translations: {
    ar: 'Árabe',
    de: 'Alemán',
    en: 'Inglés',
    es: 'Español',
    fr: 'Francés',
    he: 'Hebreo',
    hi: 'Hindi',
    id: 'Indonesio',
    it: 'Italiano',
    ja: 'Japonés',
    km: 'Jemer',
    ko: 'Coreano',
    lo: 'Lao',
    ms: 'Malayo',
    nl: 'Neerlandés',
    pt: 'Portugués',
    ru: 'Ruso',
    th: 'Tailandés',
    tl: 'Filipina',
    tr: 'Turco',
    vi: 'Vietnamita',
    'zh-CN': 'Chino (Simp.)',
    'zh-TW': 'Chino (Trad.)',
  },
} as const satisfies Locale;
