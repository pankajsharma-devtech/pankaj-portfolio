import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { archNodes } from '../data/projects'

export default function Architecture({ onClose }: { onClose: () => void }) {
  const [hot, setHot] = useState(0)
  const [auto, setAuto] = useState(true)
  useEffect(() => {
    if (!auto || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setHot(h => (h + 1) % archNodes.length), 1400)
    return () => clearInterval(t)
  }, [auto])
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [onClose])
  const pick = (i: number) => { setAuto(false); setHot(i) }
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="SmartTutor architecture">
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
          <div><h2>SmartTutor AI architecture</h2><p className="mut" style={{ margin: 0 }}>Hover, focus or tap a node. {auto ? 'Auto-playing the request flow.' : ''}</p></div>
          <button className="btn" onClick={onClose} aria-label="Close architecture view" style={{ alignSelf: 'flex-start' }}><X size={16} /> Close</button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', margin: '36px 0' }}>
          {archNodes.map((n, i) => {
            const cls = i === hot ? 'hot' : Math.abs(i - hot) === 1 ? 'near' : 'dim'
            return (
              <span key={n.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <button className={`node ${cls}`} onMouseEnter={() => pick(i)} onFocus={() => pick(i)} onClick={() => pick(i)}>{n.id}</button>
                {i < archNodes.length - 1 && <span aria-hidden style={{ color: i === hot || i + 1 === hot ? 'var(--ac)' : 'var(--bd)', transition: 'color .2s' }}>→</span>}
              </span>)
          })}
        </div>
        <div className="card" aria-live="polite" style={{ maxWidth: 560 }}>
          <h3 style={{ fontSize: 22 }}>{archNodes[hot].id}</h3>
          <p className="mut">{archNodes[hot].d}</p>
          <p className="mono" style={{ fontSize: 12, color: 'var(--mut)', margin: 0 }}>
            {archNodes[hot - 1] ? `from ${archNodes[hot - 1].id}` : 'entry point'} · {archNodes[hot + 1] ? `to ${archNodes[hot + 1].id}` : 'end of flow'}
          </p>
        </div>
        <button className="btn" style={{ marginTop: 16 }} onClick={() => setAuto(a => !a)}>{auto ? 'Pause' : 'Play flow'}</button>
      </div>
    </div>
  )
}
