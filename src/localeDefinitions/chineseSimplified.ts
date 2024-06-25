import { localeTypeCheck } from '../types';

export const chineseSimplified = {
  code: 'zh-CN',
  facebook: 'zh_CN',
  label: '简体中文',
  loadingText: '上传中・・・',
  aliases: ['zh', 'zh-Hans'],
  translations: {
    ar: '阿拉伯语',
    de: '德语',
    en: '英语',
    es: '西班牙语',
    fr: '法国语',
    id: '印度尼西亚语',
    it: '意大利语',
    ja: '日语',
    ko: '韩语',
    lo: '老挝语',
    ms: '马来语',
    pt: '葡萄牙语',
    ru: '俄语',
    th: '泰语',
    tl: '菲律宾语',
    tr: '土耳其语',
    vi: '越南语',
    'zh-CN': '‪简体中文‬',
    'zh-TW': '繁体中文'
  }
} as const;
localeTypeCheck(chineseSimplified);
