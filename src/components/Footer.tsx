'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { lang } = useLanguage()
  const year = new Date().getFullYear()

  const rights: Record<string, string> = {
    ja: 'All rights reserved.',
    en: 'All rights reserved.',
    ko: 'All rights reserved.',
  }

  return (
    <footer>
      <div className="footer-inner">
        <p className="body-sm">
          &copy; {year} LEE JONGHOON. {rights[lang]}
        </p>
      </div>
    </footer>
  )
}
