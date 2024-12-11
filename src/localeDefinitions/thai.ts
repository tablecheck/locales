import { type Locale } from '../types';

export const thai = {
  code: 'th',
  facebook: 'th_TH',
  label: 'ไทย',
  loadingText: 'กำลังโหลด...',
  translations: {
    ar: 'ภาษาอารบิก',
    de: 'ภาษาเยอรมัน',
    en: 'ภาษาอังกฤษ',
    es: 'ภาษาสเปน',
    fr: 'ภาษาฝรั่งเศส',
    id: 'ภาษาอินโดนีเซีย',
    it: 'ภาษาอิตาเลียน',
    ja: 'ภาษาญี่ปุ่น',
    ko: 'ภาษาเกาหลี',
    lo: 'ภาษาลาว',
    ms: 'ภาษามาเลย์',
    pt: 'ภาษาโปรตุเกส',
    ru: 'รัสเซีย',
    th: 'ภาษาไทย',
    tl: 'ภาษาฟิลิปปินส์',
    tr: 'ภาษาตุรกี',
    vi: 'ภาษาเวียดนาม',
    'zh-CN': '‪ภาษาจีน (กลาง)‬',
    'zh-TW': '‪ภาษาจีน (ดั้งเดิม)‬‬‬‬',
  },
} as const satisfies Locale;
