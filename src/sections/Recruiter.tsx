import { Github, Linkedin, Code2, Mail, FileText } from 'lucide-react'
import { profile as p } from '../data/profile'
import { links } from '../data/links'
import { projects } from '../data/projects'
const best = projects.find(x => x.featured)!
const rest = projects.filter(x => !x.featured)
const L = ({ children }: { children: string }) => <div className="mono mut" style={{ fontSize: 11, letterSpacing: '.1em', marginBottom: 6 }}>{children}</div>
export default function Recruiter() {
  const q = [['Resume', links.resume, FileText], ['GitHub', links.github, Github], ['LinkedIn', links.linkedin, Linkedin], ['LeetCode', links.leetcode, Code2], ['Email', links.mailto, Mail]] as const
  const facts = [['EDUCATION', `B.Tech CSE — LPU`], ['DURATION', p.duration], ['SPECIALIZATION', p.specialization], ['CURRENT YEAR', p.year], ['CGPA', p.cgpa], ['LOCATION', p.location]]
  return (
    <main id="main" className="wrap fadein" style={{ paddingTop: 88, paddingBottom: 64, maxWidth: 860 }}>
      <h1 style={{ fontSize: 'clamp(2rem,7vw,3.4rem)' }}>{p.name}</h1>
      <p className="mut" style={{ margin: '6px 0 20px' }}>Recruiter summary · readable in 20 seconds</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,230px),1fr))', gap: 10, marginBottom: 20 }}>
        {q.map(([n, u, I]) => <a key={n} className="btn p" style={{ justifyContent: 'center' }} href={u} {...(n === 'Email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}><I size={16} /> {n}</a>)}
      </div>
      <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 18 }}>
        {facts.map(([k, v]) => <div key={k}><L>{k}</L><div style={{ fontWeight: 500 }}>{v}</div></div>)}
        <div><L>FOCUS</L><div style={{ fontWeight: 500 }}>Full Stack • AI/ML • DSA</div></div>
        <div><L>LOOKING FOR</L><div style={{ fontWeight: 500 }}>Internships • Software Engineering • Full Stack • AI/ML</div></div>
      </div>
      <h2 style={{ fontSize: 14, margin: '32px 0 10px' }} className="mono mut">STRONGEST PROJECT</h2>
      <div className="card" style={{ borderColor: 'var(--ac)' }}>
        <h3 style={{ fontSize: 28 }}>{best.name}</h3>
        <p className="mut" style={{ lineHeight: 1.6 }}>{best.short}</p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{['FastAPI', 'RAG', 'Google Gemini API', 'PostgreSQL', 'pgvector', 'Docker'].map(t => <span key={t} className="chip">{t}</span>)}</div>
      </div>
      <h2 style={{ fontSize: 14, margin: '28px 0 10px' }} className="mono mut">OTHER PROJECTS</h2>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>{rest.map(x => <li key={x.id}><b>{x.name}</b> <span className="mut">· {x.id === 'lpu-touch' ? 'Frontend prototype' : x.category}</span></li>)}</ul>
      <p style={{ marginTop: 32 }}>Contact: <a href={links.mailto} style={{ color: 'var(--fg)' }}>{links.email}</a></p>
    </main>
  )
}
