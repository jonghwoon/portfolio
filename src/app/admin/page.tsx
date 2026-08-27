import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export default async function AdminDashboard() {
  let projectCount = 0
  let publishedCount = 0
  let hasProfile = false
  let hasHome = false
  let dbError = false

  try {
    projectCount = await prisma.project.count()
    publishedCount = await prisma.project.count({ where: { published: true } })
    hasProfile = !!(await prisma.profile.findUnique({ where: { id: 1 } }))
    hasHome = !!(await prisma.homeContent.findUnique({ where: { id: 1 } }))
  } catch {
    dbError = true
  }

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Dashboard</h1>
          <p className="admin-subtitle">Portfolio management overview</p>
        </div>
      </div>

      {dbError && (
        <div className="error-message" style={{ marginBottom: '16px' }}>
          ⚠️ Database connection failed. The information below may not be accurate.
        </div>
      )}

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
          <div className="stat-value" style={{ color: dbError ? 'var(--danger)' : hasProfile ? 'var(--success)' : 'var(--warning)' }}>
            {dbError ? '✕' : hasProfile ? '✓' : '!'}
          </div>
          <div className="stat-label">Profile Status</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: dbError ? 'var(--danger)' : hasHome ? 'var(--success)' : 'var(--warning)' }}>
            {dbError ? '✕' : hasHome ? '✓' : '!'}
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
              <span className={`badge ${dbError ? 'badge-danger' : hasHome ? 'badge-success' : 'badge-muted'}`}>
                {dbError ? 'DB Error' : hasHome ? 'Ready' : 'Not set'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: 'var(--body)' }}>Profile</span>
              <span className={`badge ${dbError ? 'badge-danger' : hasProfile ? 'badge-success' : 'badge-muted'}`}>
                {dbError ? 'DB Error' : hasProfile ? 'Ready' : 'Not set'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', color: 'var(--body)' }}>Projects</span>
              <span className={`badge ${dbError ? 'badge-danger' : projectCount > 0 ? 'badge-success' : 'badge-muted'}`}>
                {dbError ? 'DB Error' : projectCount > 0 ? `${projectCount} total` : 'Empty'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
