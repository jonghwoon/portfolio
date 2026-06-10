'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Project {
  id: number
  title: Record<string, string>
  tags: string[]
  emoji?: string | null
  date: string
  order: number
  published: boolean
}

export default function AdminProjectsClient({ projects: initialProjects }: { projects: unknown[] }) {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>(initialProjects as Project[])
  const [deleting, setDeleting] = useState<number | null>(null)

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    setDeleting(id)
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setProjects(prev => prev.filter(p => p.id !== id))
      router.refresh()
    }
    setDeleting(null)
  }

  const handleTogglePublish = async (project: Project) => {
    const res = await fetch(`/api/projects/${project.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...project, published: !project.published }),
    })
    if (res.ok) {
      setProjects(prev => prev.map(p => p.id === project.id ? { ...p, published: !p.published } : p))
    }
  }

  return (
    <div className="admin-card">
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Project</th>
            <th>Tags</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td style={{ color: 'var(--muted)', width: '40px' }}>{project.order}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '20px' }}>{project.emoji || '💼'}</span>
                  <span style={{ fontWeight: 600, color: 'var(--primary)' }}>
                    {project.title?.ja || project.title?.en || 'Untitled'}
                  </span>
                </div>
              </td>
              <td>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="tag" style={{ fontSize: '11px' }}>{tag}</span>
                  ))}
                </div>
              </td>
              <td style={{ color: 'var(--muted)', fontSize: '13px' }}>{project.date}</td>
              <td>
                <button
                  onClick={() => handleTogglePublish(project)}
                  className={`badge ${project.published ? 'badge-success' : 'badge-muted'}`}
                  style={{ cursor: 'pointer', border: 'none', background: 'inherit' }}
                >
                  {project.published ? 'Published' : 'Draft'}
                </button>
              </td>
              <td>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Link href={`/admin/projects/${project.id}`} className="btn-admin-secondary" style={{ fontSize: '12px', padding: '5px 12px' }}>
                    Edit
                  </Link>
                  <button
                    className="btn-danger"
                    style={{ fontSize: '12px', padding: '5px 12px' }}
                    onClick={() => handleDelete(project.id)}
                    disabled={deleting === project.id}
                  >
                    {deleting === project.id ? <span className="spinner" style={{ width: '12px', height: '12px' }} /> : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {projects.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: 'var(--muted)' }}>
                No projects yet. <Link href="/admin/projects/new" style={{ color: 'var(--brand-accent-light)' }}>Add one →</Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
