import { localeTypeCheck } from '../types';

export const chineseTraditional = {
  code: 'zh-TW',
  facebook: 'zh_TW',
  label: '繁体中文',
  loadingText: '讀取中・・・',
  aliases: ['zh-MO', 'zh-HK', 'zh-Hant'],
  translations: {
    ar: '阿拉伯語',
    de: '德語',
    en: '英語',
    es: '西班牙語',
    fr: '法國語',
    id: '印度尼西亞語',
    it: '意大利語',
    ja: '日語',
    ko: '韩語',
    lo: '老撾語',
    ms: '馬來語',
    pt: '葡萄牙語',
    ru: '俄語',
    th: '泰語',
    tl: '菲律賓語',
    tr: '土耳其語',
    vi: '越南語',
    'zh-CN': '‪簡體中文‬',
    'zh-TW': '繁體中文'
  }
} as const;
localeTypeCheck(chineseTraditional);
