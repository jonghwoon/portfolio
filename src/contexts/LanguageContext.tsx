'use client'

import React, { createContext, useContext, useSyncExternalStore, ReactNode } from 'react'
import { Language, defaultLang } from '@/lib/i18n'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: defaultLang,
  setLang: () => {},
})

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener('languagechange_custom', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('languagechange_custom', callback)
  }
}

function getSnapshot(): Language {
  const stored = localStorage.getItem('language') as Language | null
  if (stored && ['ja', 'en', 'ko'].includes(stored)) {
    return stored
  }
  return defaultLang
}

function getServerSnapshot(): Language {
  return defaultLang
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const setLang = (newLang: Language) => {
    localStorage.setItem('language', newLang)
    window.dispatchEvent(new Event('languagechange_custom'))
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
