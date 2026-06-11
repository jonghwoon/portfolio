'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import TechStackInput from '@/components/admin/TechStackInput'

const LANGS = ['ja', 'en', 'ko'] as const
type Lang = typeof LANGS[number]
const LANG_LABELS: Record<Lang, string> = { ja: '日本語', en: 'English', ko: '한국어' }

interface MultiLang extends Record<string, string> { ja: string; en: string; ko: string }

interface ProjectData {
  id?: number
  title: MultiLang
  description: MultiLang
  features: { ja: string; en: string; ko: string }
  technologies: string[]
  tags: string[]
  emoji: string
  imageUrl?: string | null
  demoLink?: string | null
  githubLink?: string | null
  date: string
  published: boolean
  order: number
}

const emptyProject: ProjectData = {
  title: { ja: '', en: '', ko: '' },
  description: { ja: '', en: '', ko: '' },
  features: { ja: '', en: '', ko: '' },
  technologies: [],
  tags: [],
  emoji: '💼',
  imageUrl: null,
  demoLink: '',
  githubLink: '',
  date: '',
  published: true,
  order: 1,
}

export default function ProjectFormClient({ project, isNew }: { project: unknown | null; isNew: boolean }) {
  const router = useRouter()
  const rawProject = project as (ProjectData & { features: Record<string, unknown> }) | null

  // Convert features array to newline-separated string for textarea
  const parseFeatures = (f: Record<string, unknown> | null): { ja: string; en: string; ko: string } => {
    if (!f) return { ja: '', en: '', ko: '' }
    return {
      ja: Array.isArray(f.ja) ? f.ja.join('\n') : (f.ja as string || ''),
      en: Array.isArray(f.en) ? f.en.join('\n') : (f.en as string || ''),
      ko: Array.isArray(f.ko) ? f.ko.join('\n') : (f.ko as string || ''),
    }
  }

  const [data, setData] = useState<ProjectData>({
    ...(rawProject ? { ...rawProject, features: parseFeatures(rawProject.features) } : emptyProject),
  })
  const [activeLang, setActiveLang] = useState<Lang>('ja')
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const updateLang = (field: 'title' | 'description' | 'features', lang: Lang, value: string) => {
    setData(prev => ({ ...prev, [field]: { ...(prev[field] as MultiLang), [lang]: value } }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const form = new FormData()
    form.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: form })
    if (res.ok) {
      const { url } = await res.json()
      setData(prev => ({ ...prev, imageUrl: url }))
    } else {
      setMessage({ type: 'error', text: 'Image upload failed' })
    }
    setUploading(false)
  }

  const addTag = () => {
    if (!newTag.trim()) return
    setData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
    setNewTag('')
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    // Convert features text to arrays
    const payload = {
      ...data,
      features: {
        ja: data.features.ja.split('\n').filter(Boolean),
        en: data.features.en.split('\n').filter(Boolean),
        ko: data.features.ko.split('\n').filter(Boolean),
      },
    }

    try {
      const url = isNew ? '/api/projects' : `/api/projects/${data.id}`
      const method = isNew ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: isNew ? 'Project created!' : 'Project updated!' })
        setTimeout(() => router.push('/admin/projects'), 1000)
      } else {
        const err = await res.json()
        setMessage({ type: 'error', text: err.error || 'Failed to save.' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error.' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="admin-header">
        <div>
          <h1 className="admin-title">{isNew ? 'Add Project' : 'Edit Project'}</h1>
          <p className="admin-subtitle">{isNew ? 'Create a new portfolio project' : 'Update project details'}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href="/admin/projects" className="btn-admin-secondary">← Back</Link>
          <button className="btn-admin-primary" onClick={handleSave} disabled={saving}>
            {saving ? <><span className="spinner" /> Saving...</> : '💾 Save'}
          </button>
        </div>
      </div>

      {message && (
        <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
          {message.text}
        </div>
      )}

      {/* Language Tabs */}
      <div className="form-tabs">
        {LANGS.map(l => (
          <button key={l} className={`form-tab ${activeLang === l ? 'active' : ''}`} onClick={() => setActiveLang(l)}>
            {LANG_LABELS[l]}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
        <div>
          {/* Basic Info */}
          <div className="admin-card">
            <div className="admin-card-title">Basic Info</div>
            <div className="form-group">
              <label className="form-label">Title ({activeLang})</label>
              <input className="form-input" value={(data.title as Record<string, string>)[activeLang] || ''}
                onChange={e => updateLang('title', activeLang, e.target.value)} placeholder="Project title" />
            </div>
            <div className="form-group">
              <label className="form-label">Description ({activeLang})</label>
              <textarea className="form-textarea" value={(data.description as Record<string, string>)[activeLang] || ''}
                onChange={e => updateLang('description', activeLang, e.target.value)}
                rows={3} placeholder="Project description..." />
            </div>
            <div className="form-group">
              <label className="form-label">Features ({activeLang}) — one per line</label>
              <textarea className="form-textarea" value={(data.features as Record<string, string>)[activeLang] || ''}
                onChange={e => updateLang('features', activeLang, e.target.value)}
                rows={5} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
            </div>
          </div>

          {/* Technologies */}
          <div className="admin-card">
            <div className="admin-card-title">Technologies</div>
            <TechStackInput
              value={data.technologies}
              onChange={techs => setData(prev => ({ ...prev, technologies: techs }))}
            />
          </div>

          {/* Tags */}
          <div className="admin-card">
            <div className="admin-card-title">Tags</div>
            <div className="tag-input-wrapper">
              {data.tags.map((tag, i) => (
                <span key={i} className="tag-chip">
                  {tag}
                  <button className="tag-chip-remove"
                    onClick={() => setData(prev => ({ ...prev, tags: prev.tags.filter((_, j) => j !== i) }))}>×</button>
                </span>
              ))}
              <input className="tag-input-field" value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                placeholder="React, Full-Stack, ..." />
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div>
          <div className="admin-card">
            <div className="admin-card-title">Links</div>
            <div className="form-group">
              <label className="form-label">Demo Link</label>
              <input className="form-input" value={data.demoLink || ''}
                onChange={e => setData(prev => ({ ...prev, demoLink: e.target.value }))}
                placeholder="https://..." />
            </div>
            <div className="form-group">
              <label className="form-label">GitHub Link</label>
              <input className="form-input" value={data.githubLink || ''}
                onChange={e => setData(prev => ({ ...prev, githubLink: e.target.value }))}
                placeholder="https://github.com/..." />
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-title">Settings</div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input className="form-input" value={data.date}
                onChange={e => setData(prev => ({ ...prev, date: e.target.value }))}
                placeholder="2023 - 2024" />
            </div>
            <div className="form-group">
              <label className="form-label">Emoji</label>
              <input className="form-input" value={data.emoji}
                onChange={e => setData(prev => ({ ...prev, emoji: e.target.value }))}
                placeholder="💼" style={{ maxWidth: '80px' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className={`form-tab ${data.published ? 'active' : ''}`}
                  style={{ flex: 1 }}
                  onClick={() => setData(prev => ({ ...prev, published: true }))}>
                  Published
                </button>
                <button
                  className={`form-tab ${!data.published ? 'active' : ''}`}
                  style={{ flex: 1 }}
                  onClick={() => setData(prev => ({ ...prev, published: false }))}>
                  Draft
                </button>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="admin-card">
            <div className="admin-card-title">Image</div>
            {data.imageUrl && (
              <div style={{ position: 'relative', height: '120px', marginBottom: '12px', overflow: 'hidden', borderRadius: '4px' }}>
                <Image src={data.imageUrl} alt="Project" fill style={{ objectFit: 'cover' }} />
              </div>
            )}
            <div className="image-upload-area">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} />
              <p className="body-sm">{uploading ? 'Uploading...' : '📁 Upload image'}</p>
              <p className="body-sm">Max 5MB</p>
            </div>
            {data.imageUrl && (
              <button className="btn-danger" style={{ marginTop: '8px', width: '100%', justifyContent: 'center' }}
                onClick={() => setData(prev => ({ ...prev, imageUrl: null }))}>
                Remove Image
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
