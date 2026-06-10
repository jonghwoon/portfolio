export type Language = 'ja' | 'en' | 'ko'

export type MultiLang = {
  ja: string
  en: string
  ko: string
}

export function t(value: MultiLang | Record<string, string> | null | undefined, lang: Language): string {
  if (!value) return ''
  return (value as Record<string, string>)[lang] || (value as Record<string, string>)['ja'] || ''
}

export const defaultLang: Language = 'ja'

export const languageLabels: Record<Language, string> = {
  ja: 'JP',
  en: 'EN',
  ko: 'KR',
}

export const navLabels: Record<Language, { home: string; about: string; portfolio: string }> = {
  ja: { home: 'ホーム', about: '自己紹介', portfolio: 'ポートフォリオ' },
  en: { home: 'Home', about: 'About', portfolio: 'Portfolio' },
  ko: { home: '홈', about: '소개', portfolio: '포트폴리오' },
}

export const footerLabels: Record<Language, string> = {
  ja: 'All rights reserved.',
  en: 'All rights reserved.',
  ko: 'All rights reserved.',
}
