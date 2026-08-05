'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import ImageUploadWithCrop from '@/components/admin/ImageUploadWithCrop'

const LANGS = ['ja', 'en', 'ko'] as const
type Lang = typeof LANGS[number]
const LANG_LABELS: Record<Lang, string> = { ja: '日本語', en: 'English', ko: '한국어' }

interface MultiLang extends Record<string, string> { ja: string; en: string; ko: string }

interface Experience {
  period: MultiLang
  title: MultiLang
  desc: MultiLang
}

interface Stat {
  value: string
  label: MultiLang
}

interface ProfileData {
  photoUrl?: string | null
  statement: MultiLang
  skills: string[]
  experiences: Experience[]
  stats: Stat[]
}

const defaultProfile: ProfileData = {
  photoUrl: null,
  statement: { ja: '', en: '', ko: '' },
  skills: [],
  experiences: [],
  stats: [],
}

export default function AdminAboutPage() {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile)
  const [activeLang, setActiveLang] = useState<Lang>('ja')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [newSkill, setNewSkill] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('/api/profile')
      if (res.ok) {
        const data = await res.json()
        if (data) setProfile(data)
      }
    }
    fetchProfile()
  }, [])

  const addSkill = () => {
    if (!newSkill.trim()) return
    setProfile(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }))
    setNewSkill('')
  }

  const removeSkill = (idx: number) => {
    setProfile(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }))
  }

  const addExperience = () => {
    setProfile(prev => ({
      ...prev,
      experiences: [...prev.experiences, {
        period: { ja: '', en: '', ko: '' },
        title: { ja: '', en: '', ko: '' },
        desc: { ja: '', en: '', ko: '' },
      }],
    }))
  }

  const removeExperience = (idx: number) => {
    setProfile(prev => ({ ...prev, experiences: prev.experiences.filter((_, i) => i !== idx) }))
  }

  const updateExp = (idx: number, field: keyof Experience, lang: Lang, value: string) => {
    setProfile(prev => {
      const exps = [...prev.experiences]
      exps[idx] = { ...exps[idx], [field]: { ...(exps[idx][field] as MultiLang), [lang]: value } }
      return { ...prev, experiences: exps }
    })
  }

  const addStat = () => {
    setProfile(prev => ({
      ...prev,
      stats: [...prev.stats, { value: '', label: { ja: '', en: '', ko: '' } }],
    }))
  }

  const removeStat = (idx: number) => {
    setProfile(prev => ({ ...prev, stats: prev.stats.filter((_, i) => i !== idx) }))
  }

  const updateStat = (idx: number, field: 'value' | 'label', lang: Lang | null, value: string) => {
    setProfile(prev => {
      const stats = [...prev.stats]
      if (lang) {
        stats[idx] = { ...stats[idx], [field]: { ...(stats[idx][field] as MultiLang), [lang]: value } }
      } else {
        stats[idx] = { ...stats[idx], value }
      }
      return { ...prev, stats }
    })
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile saved successfully!' })
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
          <h1 className="admin-title">About Page</h1>
          <p className="admin-subtitle">Edit profile photo, statement, skills, and experience</p>
        </div>
        <button className="btn-admin-primary" onClick={handleSave} disabled={saving}>
          {saving ? <><span className="spinner" /> Saving...</> : '💾 Save Changes'}
        </button>
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

      {/* Profile Photo */}
      <div className="admin-card">
        <div className="admin-card-title">Profile Photo</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {profile.photoUrl ? (
            <Image src={profile.photoUrl} alt="Profile" width={100} height={100} className="image-preview" style={{ width: '100px', height: '100px', margin: 0 }} />
          ) : (
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--surface-elevated)', border: '2px dashed var(--admin-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px' }}>
              👤
            </div>
          )}
          <div>
            <ImageUploadWithCrop 
              onUploadSuccess={(url) => setProfile(prev => ({ ...prev, photoUrl: url }))} 
              aspectRatio={1} 
              style={{ display: 'inline-block' }}
            />
            {profile.photoUrl && (
              <button className="btn-danger" style={{ marginLeft: '8px', fontSize: '12px' }}
                onClick={() => setProfile(prev => ({ ...prev, photoUrl: null }))}>
                Remove
              </button>
            )}
            <p className="body-sm" style={{ marginTop: '8px' }}>Max 5MB. JPEG, PNG, WebP, GIF</p>
          </div>
        </div>
      </div>

      {/* Statement */}
      <div className="admin-card">
        <div className="admin-card-title">Statement ({activeLang})</div>
        <textarea
          className="form-textarea"
          value={(profile.statement as Record<string, string>)[activeLang] || ''}
          onChange={e => setProfile(prev => ({ ...prev, statement: { ...prev.statement, [activeLang]: e.target.value } }))}
          rows={4}
          placeholder="Brief professional statement..."
        />
      </div>

      {/* Skills */}
      <div className="admin-card">
        <div className="admin-card-title">Skills</div>
        <div className="tag-input-wrapper">
          {profile.skills.map((skill, idx) => (
            <span key={idx} className="tag-chip">
              {skill}
              <button className="tag-chip-remove" onClick={() => removeSkill(idx)}>×</button>
            </span>
          ))}
          <input
            className="tag-input-field"
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addSkill() } }}
            placeholder="Type skill and press Enter..."
          />
        </div>
        <p className="body-sm" style={{ marginTop: '8px' }}>Press Enter or comma to add a skill</p>
      </div>

      {/* Experience */}
      <div className="admin-card">
        <div className="admin-card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Experience
          <button className="btn-admin-secondary" onClick={addExperience} style={{ fontSize: '12px', padding: '4px 12px' }}>
            + Add
          </button>
        </div>
        {profile.experiences.map((exp, idx) => (
          <div key={idx} style={{ padding: '16px', border: '1px solid var(--admin-border)', borderRadius: '4px', marginBottom: '12px', position: 'relative' }}>
            <button className="btn-danger" style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '11px', padding: '4px 10px' }}
              onClick={() => removeExperience(idx)}>Remove</button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '12px' }}>
              <div>
                <label className="form-label">Period ({activeLang})</label>
                <input className="form-input" value={(exp.period as Record<string, string>)[activeLang] || ''}
                  onChange={e => updateExp(idx, 'period', activeLang, e.target.value)} placeholder="2020 - Present" />
              </div>
              <div>
                <label className="form-label">Title ({activeLang})</label>
                <input className="form-input" value={(exp.title as Record<string, string>)[activeLang] || ''}
                  onChange={e => updateExp(idx, 'title', activeLang, e.target.value)} placeholder="Senior Developer" />
              </div>
            </div>
            <div>
              <label className="form-label">Description ({activeLang})</label>
              <textarea className="form-textarea" value={(exp.desc as Record<string, string>)[activeLang] || ''}
                onChange={e => updateExp(idx, 'desc', activeLang, e.target.value)} rows={2} placeholder="Role description..." />
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="admin-card">
        <div className="admin-card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Stats (Side Panel)
          <button className="btn-admin-secondary" onClick={addStat} style={{ fontSize: '12px', padding: '4px 12px' }}>
            + Add
          </button>
        </div>
        {profile.stats.map((stat, idx) => (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '12px', alignItems: 'end', marginBottom: '12px' }}>
            <div>
              <label className="form-label">Value (e.g. LEAD, 6+ YRS)</label>
              <input className="form-input" value={stat.value}
                onChange={e => updateStat(idx, 'value', null, e.target.value)} placeholder="LEAD" />
            </div>
            <div>
              <label className="form-label">Label ({activeLang})</label>
              <input className="form-input" value={(stat.label as Record<string, string>)[activeLang] || ''}
                onChange={e => updateStat(idx, 'label', activeLang, e.target.value)} placeholder="Architecture" />
            </div>
            <button className="btn-danger" onClick={() => removeStat(idx)}>×</button>
          </div>
        ))}
      </div>
    </>
  )
}
