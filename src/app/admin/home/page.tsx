'use client'

import { useState, useEffect, useCallback } from 'react'

interface MultiLang extends Record<string, string> {
  ja: string
  en: string
  ko: string
}

interface Metric {
  value: string
  label: MultiLang
  desc: MultiLang
}

interface HomeData {
  heroTitle: MultiLang
  heroSubtitle: MultiLang
  heroCta: MultiLang
  metrics: Metric[]
}

const LANGS = ['ja', 'en', 'ko'] as const
type Lang = typeof LANGS[number]
const LANG_LABELS = { ja: '日本語', en: 'English', ko: '한국어' }

const defaultData: HomeData = {
  heroTitle: { ja: '', en: '', ko: '' },
  heroSubtitle: { ja: '', en: '', ko: '' },
  heroCta: { ja: '', en: '', ko: '' },
  metrics: [
    { value: '', label: { ja: '', en: '', ko: '' }, desc: { ja: '', en: '', ko: '' } },
  ],
}

export default function AdminHomePage() {
  const [data, setData] = useState<HomeData>(defaultData)
  const [activeLang, setActiveLang] = useState<Lang>('ja')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/home')
      if (res.ok) {
        const json = await res.json()
        if (json) setData(json)
      }
    }
    fetchData()
  }, [])

  const updateField = (field: keyof HomeData, lang: Lang, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: { ...(prev[field] as MultiLang), [lang]: value },
    }))
  }

  const updateMetric = (idx: number, field: keyof Metric, lang: Lang | null, value: string) => {
    setData(prev => {
      const metrics = [...prev.metrics]
      if (lang) {
        metrics[idx] = {
          ...metrics[idx],
          [field]: { ...(metrics[idx][field] as MultiLang), [lang]: value },
        }
      } else {
        metrics[idx] = { ...metrics[idx], [field]: value }
      }
      return { ...prev, metrics }
    })
  }

  const addMetric = () => {
    setData(prev => ({
      ...prev,
      metrics: [...prev.metrics, { value: '', label: { ja: '', en: '', ko: '' }, desc: { ja: '', en: '', ko: '' } }],
    }))
  }

  const removeMetric = (idx: number) => {
    setData(prev => ({
      ...prev,
      metrics: prev.metrics.filter((_, i) => i !== idx),
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)
    try {
      const res = await fetch('/api/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setMessage({ type: 'success', text: 'Home content saved successfully!' })
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
          <h1 className="admin-title">Home Page</h1>
          <p className="admin-subtitle">Edit hero section and business metrics</p>
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

      {/* Hero Section */}
      <div className="admin-card">
        <div className="admin-card-title">Hero Section</div>

        <div className="form-group">
          <label className="form-label">Hero Title ({activeLang})</label>
          <textarea
            className="form-textarea"
            value={(data.heroTitle as Record<string, string>)[activeLang] || ''}
            onChange={e => updateField('heroTitle', activeLang, e.target.value)}
            placeholder="ENGINEERING&#10;PRECISION."
            rows={3}
          />
          <p className="body-sm" style={{ marginTop: '4px' }}>Use line break for multi-line title</p>
        </div>

        <div className="form-group">
          <label className="form-label">Hero Subtitle ({activeLang})</label>
          <textarea
            className="form-textarea"
            value={(data.heroSubtitle as Record<string, string>)[activeLang] || ''}
            onChange={e => updateField('heroSubtitle', activeLang, e.target.value)}
            placeholder="Driving technical leadership..."
            rows={3}
          />
        </div>

        <div className="form-group">
          <label className="form-label">CTA Button Text ({activeLang})</label>
          <input
            className="form-input"
            value={(data.heroCta as Record<string, string>)[activeLang] || ''}
            onChange={e => updateField('heroCta', activeLang, e.target.value)}
            placeholder="View Results"
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="admin-card">
        <div className="admin-card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Business Metrics
          <button className="btn-admin-secondary" onClick={addMetric} style={{ fontSize: '12px', padding: '4px 12px' }}>
            + Add Metric
          </button>
        </div>

        {data.metrics.map((metric, idx) => (
          <div key={idx} style={{ padding: '16px', border: '1px solid var(--admin-border)', borderRadius: '4px', marginBottom: '12px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
              <button className="btn-danger" onClick={() => removeMetric(idx)} style={{ fontSize: '11px', padding: '4px 10px' }}>
                Remove
              </button>
            </div>
            <div className="form-group">
              <label className="form-label">Value (e.g. 40%, 1.2M)</label>
              <input
                className="form-input"
                value={metric.value}
                onChange={e => updateMetric(idx, 'value', null, e.target.value)}
                placeholder="40%"
                style={{ maxWidth: '200px' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Label ({activeLang})</label>
                <input
                  className="form-input"
                  value={(metric.label as Record<string, string>)[activeLang] || ''}
                  onChange={e => updateMetric(idx, 'label', activeLang, e.target.value)}
                  placeholder="Performance Increase"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description ({activeLang})</label>
                <input
                  className="form-input"
                  value={(metric.desc as Record<string, string>)[activeLang] || ''}
                  onChange={e => updateMetric(idx, 'desc', activeLang, e.target.value)}
                  placeholder="Optimized core web vitals..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
