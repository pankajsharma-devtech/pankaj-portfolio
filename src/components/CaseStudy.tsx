import { useEffect, useState } from 'react'
import { X, Github, ExternalLink } from 'lucide-react'
import type { Project } from '../data/projects'
import { open } from '../utils/open'

export default function CaseStudy({ p, onClose, onArch }: { p: Project; onClose: () => void; onArch: () => void }) {
  const tabs = Object.keys(p.study ?? {})
  const [tab, setTab] = useState(tabs[0])
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [onClose])
  const c = p.study?.[tab]
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={`${p.name} case study`}>
      <div className="wrap" style={{ maxWidth: 820 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div><span className="chip">{p.category}</span><h2 style={{ marginTop: 10 }}>{p.name}</h2></div>
          <button className="btn" onClick={onClose} aria-label="Close case study" style={{ alignSelf: 'flex-start' }}><X size={16} /> Close</button>
        </div>
        <div role="tablist" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '8px 0 16px' }}>
          {tabs.map((t, i) => <button key={t} role="tab" aria-selected={t === tab} className={`chip ${t === tab ? 'on' : ''}`} style={{ cursor: 'pointer', background: 'none', whiteSpace: 'nowrap', padding: '7px 12px' }} onClick={() => setTab(t)}><span className="mono">{String(i + 1).padStart(2, '0')}</span> {t}</button>)}
        </div>
        <div className="card" role="tabpanel" style={{ minHeight: 160 }}>
          {Array.isArray(c)
            ? <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{c.map(x => <span className="chip on" key={x}>{x}</span>)}</div>
            : <p style={{ margin: 0, lineHeight: 1.7 }}>{c}</p>}
          {tab === 'System' && p.id === 'smarttutor' && <button className="btn p" style={{ marginTop: 16 }} onClick={onArch}>Explore Architecture</button>}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
          {p.github && <button className="btn" onClick={() => open(p.github!)}><Github size={16} /> View GitHub</button>}
          {!p.github && <span className="chip">GitHub · coming soon</span>}
          {p.demo && <button className="btn" onClick={() => open(p.demo!)}><ExternalLink size={16} /> Live demo</button>}
        </div>
      </div>
    </div>
  )
}
