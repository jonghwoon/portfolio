'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import { languageLabels, navLabels, Language } from '@/lib/i18n'

export default function Navbar() {
  const pathname = usePathname()
  const { lang, setLang } = useLanguage()
  const nav = navLabels[lang]

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">LEE JONGHOON</Link>
        <ul className="nav-menu">
          <li>
            <Link href="/" className={pathname === '/' ? 'active' : ''}>
              {nav.home}
            </Link>
          </li>
          <li>
            <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
              {nav.about}
            </Link>
          </li>
          <li>
            <Link href="/portfolio" className={pathname.startsWith('/portfolio') ? 'active' : ''}>
              {nav.portfolio}
            </Link>
          </li>
        </ul>
        <div className="language-selector">
          {(Object.keys(languageLabels) as Language[]).map((l) => (
            <button
              key={l}
              className={`lang-btn ${lang === l ? 'active' : ''}`}
              onClick={() => setLang(l)}
            >
              {languageLabels[l]}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
