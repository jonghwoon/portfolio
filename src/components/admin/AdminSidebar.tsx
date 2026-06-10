'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/home', label: 'Home Page', icon: '🏠' },
  { href: '/admin/about', label: 'About Page', icon: '👤' },
  { href: '/admin/projects', label: 'Projects', icon: '💼' },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <aside className="admin-sidebar">
      <div className="admin-logo">
        <div className="admin-logo-title">LEE JONGHOON</div>
        <div className="admin-logo-sub">Admin Panel</div>
      </div>

      <nav className="admin-nav">
        <div className="admin-nav-section">
          <div className="admin-nav-section-label">Navigation</div>
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="admin-nav-section">
          <div className="admin-nav-section-label">Site</div>
          <Link href="/" target="_blank" className="admin-nav-item">
            <span className="admin-nav-icon">🌐</span>
            View Site
          </Link>
        </div>
      </nav>

      <div className="admin-sidebar-footer">
        <button
          className="btn-admin-secondary"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? <span className="spinner" /> : '🚪'}
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </aside>
  )
}
