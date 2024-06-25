import { localeTypeCheck } from '../types';

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
    id: 'Индонезийский',
    it: 'Итальянский',
    ja: 'Японский',
    ko: 'Корейский',
    lo: 'Лаосский',
    ms: 'Малайский',
    pt: 'Португальский',
    ru: 'Pусский',
    th: 'Тайский',
    tl: 'Филиппинский',
    tr: 'Турецкий',
    vi: 'Вьетнамский',
    'zh-CN': '‪Китайский (Упр.)‬',
    'zh-TW': '‪Китайский (Трад.)‬'
  }
} as const;
localeTypeCheck(russian);
