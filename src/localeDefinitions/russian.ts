import { type Locale } from '../types';

export const russian = {
  code: 'ru',
  facebook: 'ru_RU',
  label: 'Русский',
  loadingText: 'Загрузка...',
  translations: {
    ar: 'Арабский',
    de: 'Немецкий',
    en: 'Английский',
    es: 'Испанский',
    fr: 'Французский',
    he: 'Иврит',
    hi: 'Хинди',
    id: 'Индонезийский',
    it: 'Итальянский',
    ja: 'Японский',
    km: 'Кхмерский',
    ko: 'Корейский',
    lo: 'Лаосский',
    ms: 'Малайский',
    nl: 'Нидерландский',
    pt: 'Португальский',
    ru: 'Pусский',
    th: 'Тайский',
    tl: 'Филиппинский',
    tr: 'Турецкий',
    vi: 'Вьетнамский',
    'zh-CN': 'Китайский (Упр.)',
    'zh-TW': 'Китайский (Трад.)',
  },
} as const satisfies Locale;
