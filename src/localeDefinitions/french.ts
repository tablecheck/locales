import { localeTypeCheck } from '../types';

export const french = {
  code: 'fr',
  facebook: 'fr_FR',
  label: 'Français',
  loadingText: 'Chargement...',
  translations: {
    ar: 'Arabe',
    de: 'Allemand',
    en: 'Anglais',
    es: 'Espagnol',
    fr: 'Français',
    id: 'Indonésienne',
    it: 'Italien',
    ja: 'Japonais',
    ko: 'Coréen',
    lo: 'Lao',
    ms: 'Malaise',
    pt: 'Portugaise',
    ru: 'Russe',
    th: 'Thai',
    tl: 'Philippine',
    tr: 'Turque',
    vi: 'Vietnamienne',
    'zh-CN': 'Chinois (Simp.)',
    'zh-TW': 'Chinois (Trad.)'
  }
} as const;
localeTypeCheck(french);
