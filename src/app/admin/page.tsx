import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function AdminDashboard() {
  let projectCount = 0
  let publishedCount = 0
  let hasProfile = false
  let hasHome = false

  try {
    projectCount = await prisma.project.count()
    publishedCount = await prisma.project.count({ where: { published: true } })
    hasProfile = !!(await prisma.profile.findUnique({ where: { id: 1 } }))
    hasHome = !!(await prisma.homeContent.findUnique({ where: { id: 1 } }))
  } catch {
    // DB not yet connected
  }

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Dashboard</h1>
          <p className="admin-subtitle">Portfolio management overview</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{projectCount}</div>
          <div className="stat-label">Total Projects</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{publishedCount}</div>
          <div className="stat-label">Published</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: hasProfile ? 'var(--success)' : 'var(--warning)' }}>
            {hasProfile ? '✓' : '!'}
          </div>
          <div className="stat-label">Profile Status</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: hasHome ? 'var(--success)' : 'var(--warning)' }}>
            {hasHome ? '✓' : '!'}
          </div>
          <div className="stat-label">Home Status</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div className="admin-card">
          <div className="admin-card-title">Quick Actions</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link href="/admin/home" className="btn-admin-secondary">
              🏠 Edit Home Page
            </Link>
            <Link href="/admin/about" className="btn-admin-secondary">
              👤 Edit About Page
            </Link>
            <Link href="/admin/projects" className="btn-admin-secondary">
              💼 Manage Projects
            </Link>
            <Link href="/admin/projects/new" className="btn-admin-primary" style={{ justifyContent: 'center' }}>
              + Add New Project
            </Link>
          </div>
        </div>

        <div className="admin-card">
          <div className="admin-card-title">Content Status</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: 'var(--body)' }}>Home Content</span>
              <span className={`badge ${hasHome ? 'badge-success' : 'badge-muted'}`}>
                {hasHome ? 'Ready' : 'Not set'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: 'var(--body)' }}>Profile</span>
              <span className={`badge ${hasProfile ? 'badge-success' : 'badge-muted'}`}>
                {hasProfile ? 'Ready' : 'Not set'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: 'var(--body)' }}>Projects</span>
              <span className={`badge ${projectCount > 0 ? 'badge-success' : 'badge-muted'}`}>
                {projectCount > 0 ? `${projectCount} total` : 'Empty'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
