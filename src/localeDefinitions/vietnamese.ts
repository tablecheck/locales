import { type Locale } from '../types';

export const vietnamese = {
  code: 'vi',
  facebook: 'vi_VN',
  label: 'Tiếng việt',
  loadingText: 'Tải...',
  translations: {
    ar: 'Tiếng Ả rập',
    de: 'Tiếng Đức',
    en: 'Tiếng Anh',
    es: 'Tiếng Tây Ban Nha',
    fr: 'Tiếng Pháp',
    id: 'Tiếng Indonesia',
    it: 'Tiếng Ý',
    ja: 'Tiếng Nhật',
    ko: 'Tiếng Hàn',
    lo: 'Tiếng Lào',
    ms: 'Tiếng Malay',
    pt: 'Tiếng Bồ Đào Nha',
    ru: 'Tiếng Nga',
    th: 'Tiếng Thái Lan',
    tl: 'Tiếng Filipino',
    tr: 'Tiếng Thổ Nhĩ Kỳ',
    vi: 'Tiếng Việt',
    'zh-CN': '‪Tiếng Trung (Giản thể)‬‬‬',
    'zh-TW': 'Tiếng Trung (Phồn thể)‬',
  },
} as const satisfies Locale;
