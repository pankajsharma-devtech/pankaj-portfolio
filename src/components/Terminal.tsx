import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { links } from '../data/links'
import { profile as p } from '../data/profile'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'
import { dsaTopics } from '../data/learning'
import { open } from '../utils/open'

type Line = { t: string; cta?: boolean }
const help = ['help  about  skills  projects  dsa', 'github  leetcode  linkedin  resume  contact  clear']

export default function Terminal({ onClose }: { onClose: () => void }) {
  const [out, setOut] = useState<Line[]>([{ t: 'Type "help" to see commands.' }])
  const [v, setV] = useState('')
  const end = useRef<HTMLDivElement>(null)
  useEffect(() => { end.current?.scrollIntoView() }, [out])
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [onClose])

  const run = (raw: string) => {
    const c = raw.trim().toLowerCase(); let r: string[] = []; let cta = false
    switch (c) {
      case '': break
      case 'help': r = help; break
      case 'about': r = [`${p.name} — ${p.degree}, ${p.specialization}`, `${p.university}, ${p.year}, CGPA ${p.cgpa}`, p.intro]; break
      case 'skills': r = skillGroups.map(g => `${g.name}: ${g.items.join(', ')}`); break
      case 'projects': r = projects.map(x => x.name); break
      case 'dsa': r = ['Topics: ' + dsaTopics.map(x => x.t).join(', '), 'Type "leetcode" to open my profile.']; break
      case 'github': r = ['Opening GitHub...']; open(links.github); break
      case 'leetcode': r = ['Opening LeetCode...']; open(links.leetcode); break
      case 'linkedin': r = ['Opening LinkedIn...']; open(links.linkedin); break
      case 'resume': r = ['Opening resume...']; open(links.resume); break
      case 'contact': r = [links.email, 'Opening your email client...']; window.location.href = links.mailto; break
      case 'sudo hire-pankaj': r = ['Permission denied.', "You haven't talked to Pankaj yet."]; cta = true; break
      case 'clear': setOut([]); return
      default: r = [`command not found: ${c}. Try "help".`]
    }
    setOut(o => [...o, { t: '> ' + raw }, ...r.map(t => ({ t })), ...(cta ? [{ t: '[Start a conversation]', cta: true }] : [])])
  }
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Terminal" style={{ background: 'color-mix(in srgb,var(--bg) 92%,transparent)', backdropFilter: 'blur(6px)' }}>
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="card mono" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid var(--bd)' }}>
            <span className="mut" style={{ fontSize: 13 }}>pankaj@portfolio ~ </span>
            <button className="btn" onClick={onClose} aria-label="Close terminal" style={{ padding: 6 }}><X size={16} /></button>
          </div>
          <div style={{ padding: 16, minHeight: 320, maxHeight: '60vh', overflow: 'auto', fontSize: 14, lineHeight: 1.7 }} aria-live="polite">
            {out.map((l, i) => l.cta
              ? <a key={i} href={links.mailto} className="btn p" style={{ marginTop: 6 }}>{l.t}</a>
              : <div key={i} style={{ whiteSpace: 'pre-wrap', color: l.t.startsWith('>') ? 'var(--ac)' : 'var(--fg)' }}>{l.t}</div>)}
            <div ref={end} />
          </div>
          <form onSubmit={e => { e.preventDefault(); run(v); setV('') }} style={{ display: 'flex', gap: 8, padding: 12, borderTop: '1px solid var(--bd)' }}>
            <span style={{ color: 'var(--ac)', alignSelf: 'center' }}>{'>'}</span>
            <input autoFocus aria-label="Terminal command" value={v} onChange={e => setV(e.target.value)} className="mono" style={{ border: 0, padding: 4 }} autoCapitalize="off" autoCorrect="off" spellCheck={false} />
          </form>
        </div>
      </div>
    </div>
  )
}
