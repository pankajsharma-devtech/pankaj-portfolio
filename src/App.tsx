import { lazy, Suspense, useEffect, useState } from 'react'
import { Github, Linkedin, Code2, Mail, FileText, Moon, Sun, TerminalSquare, Menu, X, Eye } from 'lucide-react'
import { links } from './data/links'
import { profile as p } from './data/profile'
import { skillGroups, consoleRows, snapshot } from './data/skills'
import { projects, filters, type Project } from './data/projects'
import { learning, dsaTopics } from './data/learning'
import { useReveal } from './hooks/useReveal'
import { open } from './utils/open'
import Typed from './components/Typed'
import Recruiter from './sections/Recruiter'
import Thinking from './sections/Thinking'
const Terminal = lazy(() => import('./components/Terminal'))
const Architecture = lazy(() => import('./components/Architecture'))
const CaseStudy = lazy(() => import('./components/CaseStudy'))

const nav = ['Home', 'About', 'Projects', 'DSA', 'Process', 'Contact']
const pipeline = ['PDF', 'Text Extraction', 'Chunking', 'Embeddings', 'pgvector', 'Retrieval', 'Gemini', 'AI Response']

function Social({ size = 16 }: { size?: number }) {
  return <>{[[Github, links.github, 'GitHub'], [Linkedin, links.linkedin, 'LinkedIn'], [Code2, links.leetcode, 'LeetCode']].map(([I, u, l]) => {
    const Icon = I as typeof Github
    return <a key={l as string} className="btn" style={{ padding: 8 }} href={u as string} target="_blank" rel="noopener noreferrer" aria-label={l as string}><Icon size={size} /></a>
  })}</>
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('theme') as 'dark' | 'light') || 'dark')
  const [rec, setRec] = useState(false)
  const [menu, setMenu] = useState(false)
  const [term, setTerm] = useState(false)
  const [arch, setArch] = useState(false)
  const [study, setStudy] = useState<Project | null>(null)
  const [filter, setFilter] = useState<string>(() => { const f = new URLSearchParams(location.search).get('f'); return f && (filters as readonly string[]).includes(f) ? f : 'ALL' })
  const [tip, setTip] = useState(consoleRows[2].tip)
  const [step, setStep] = useState(0)
  const [cat, setCat] = useState('AI / ML')
  const [dsa, setDsa] = useState(dsaTopics)
  const [repos, setRepos] = useState<{ name: string; html_url: string; description: string | null; language: string | null; pushed_at: string }[] | null>(null)
  const [sent, setSent] = useState('')
  const pickFilter = (f: string) => { setFilter(f); history.replaceState(null, '', f === 'ALL' ? location.pathname + location.hash : `?f=${encodeURIComponent(f)}${location.hash}`) }
  const anyModal = term || arch || !!study
  useReveal(rec)
  useEffect(() => { // focus trap + scroll lock for dialogs
    if (!anyModal) return
    const prev = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    const modal = () => document.querySelector<HTMLElement>('.modal')
    const f = () => Array.from(modal()?.querySelectorAll<HTMLElement>('button,a[href],input,textarea') ?? [])
    const t = setTimeout(() => { if (!modal()?.contains(document.activeElement)) f()[0]?.focus() }, 150)
    const k = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const els = f(); if (!els.length) return
      const a = els[0], z = els[els.length - 1], cur = document.activeElement
      if (!modal()?.contains(cur) || (e.shiftKey && cur === a)) { e.preventDefault(); (e.shiftKey ? z : a).focus() }
      else if (!e.shiftKey && cur === z) { e.preventDefault(); a.focus() }
    }
    document.addEventListener('keydown', k)
    return () => { clearTimeout(t); document.removeEventListener('keydown', k); document.body.style.overflow = ''; prev?.focus() }
  }, [anyModal])
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme) }, [theme])
  useEffect(() => { const t = setInterval(() => setStep(s => (s + 1) % pipeline.length), 1200); return () => clearInterval(t) }, [])
  useEffect(() => {
    fetch(`https://api.github.com/users/${links.githubUser}/repos?sort=pushed&per_page=6`).then(r => r.ok ? r.json() : Promise.reject()).then(setRepos).catch(() => setRepos([]))
  }, [])
  const vis = (x: Project) => filter === 'ALL' || x.category === filter
  const st = projects.find(x => x.id === 'smarttutor')!, lpu = projects.find(x => x.id === 'lpu-touch')!
  const more = projects.filter(x => x.id !== st.id && x.id !== lpu.id)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (links.formEndpoint) {
      try { const r = await fetch(links.formEndpoint, { method: 'POST', body: f, headers: { Accept: 'application/json' } }); setSent(r.ok ? 'Message sent.' : 'Could not send. Please email me directly.'); if (r.ok) e.currentTarget.reset() } catch { setSent('Could not send. Please email me directly.') }
    } else {
      window.location.href = `${links.mailto}?subject=${encodeURIComponent('Portfolio message from ' + f.get('name'))}&body=${encodeURIComponent(`${f.get('message')}\n\n${f.get('name')} (${f.get('email')})`)}`
      setSent('Opening your email client...')
    }
  }

  return (
    <div className={rec ? 'recruiter' : ''}>
      <a href="#main" className="btn" style={{ position: 'absolute', left: -999 }} onFocus={e => (e.currentTarget.style.left = '8px')}>Skip to content</a>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'color-mix(in srgb,var(--bg) 85%,transparent)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--bd)' }}>
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60, gap: 12 }}>
          <a href="#home" style={{ color: 'var(--fg)', fontWeight: 600, textDecoration: 'none' }}>{p.name}</a>
          {!rec && <nav className="navlinks" aria-label="Primary">{nav.map(n => <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}</nav>}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button className="btn" aria-pressed={rec} onClick={() => { setRec(r => !r); window.scrollTo(0, 0) }}><Eye size={16} /><span className="hidden sm:inline">Recruiter Mode{rec ? ': on' : ''}</span></button>
            <button className="btn" onClick={() => setTerm(true)} aria-label="Open terminal"><TerminalSquare size={16} /></button>
            <button className="btn" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}</button>
            <a className="btn p hidden md:inline-flex" href={links.resume} target="_blank" rel="noopener noreferrer">Resume</a>
            {!rec && <button className="btn burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(m => !m)}>{menu ? <X size={16} /> : <Menu size={16} />}</button>}
          </div>
        </div>
        {menu && !rec && <nav className="mnav wrap" style={{ display: 'grid', gap: 14, padding: '12px 20px 20px' }} aria-label="Mobile">
          {nav.map(n => <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setMenu(false)} style={{ fontSize: 17 }}>{n}</a>)}
          <div style={{ display: 'flex', gap: 8 }}><a className="btn p" href={links.resume} target="_blank" rel="noopener noreferrer">Resume</a><Social /></div>
        </nav>}
      </header>

      {rec ? <Recruiter /> : <main id="main">
        <section id="home" style={{ position: 'relative', paddingTop: 112, overflow: 'hidden' }}>
          <div className="glow" aria-hidden />
          <div className="wrap hero-grid" style={{ gridTemplateColumns: 'minmax(0,1.02fr) minmax(420px,.98fr)', gap: 54, alignItems: 'center', position: 'relative' }}>
            <div className="hero-copy-column">
              <div className="hero-status-line mono"><span className="status-pulse" /> AVAILABLE FOR INTERNSHIPS <span className="hero-slash">/</span> 2026</div>
              <p className="eyebrow mono" style={{ margin: '16px 0 0', fontSize: 12, letterSpacing: '.14em' }}><b style={{ color: 'var(--fg)', fontWeight: 500 }}>{p.name}</b> · CSE • AI/ML • FULL STACK</p>
              <h1 className="hero-title" style={{ fontSize: 'clamp(3.15rem,6.4vw,5.75rem)', lineHeight: .93, margin: '18px 0 24px' }}>I build software<br/>that turns ideas<br/>into <span>working systems.</span></h1>
              <p className="hero-copy mut" style={{ maxWidth: 590, lineHeight: 1.72, fontSize: 17 }}>3rd-year CSE student focused on Full Stack, AI/ML and problem solving. I built SmartTutor AI, a RAG-powered learning platform, and I'm practicing DSA on LeetCode.</p>
              <div className="hero-facts mono"><span>B.Tech CSE @ LPU</span><i/> <span>{p.specialization}</span><i/> <span>{p.cgpa} CGPA</span><i/> <span>{p.location}</span></div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '22px 0 12px' }}>
                <a className="btn p hero-primary" href="#projects">View Projects <span>↗</span></a>
                <a className="btn" href={links.resume} target="_blank" rel="noopener noreferrer"><FileText size={16} /> Resume</a>
              </div>
              <div className="hero-socials">
                {[['GitHub', links.github, Github], ['LinkedIn', links.linkedin, Linkedin], ['LeetCode', links.leetcode, Code2]].map(([n, u, I]) => { const Icon = I as typeof Github; return <a key={n as string} href={u as string} target="_blank" rel="noopener noreferrer"><Icon size={15} /> {n as string}</a> })}
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-radial" aria-hidden />
              <div className="hero-orbit hero-orbit-a" aria-hidden />
              <div className="hero-orbit hero-orbit-b" aria-hidden />
              <div className="hero-crosshair crosshair-a" aria-hidden />
              <div className="hero-crosshair crosshair-b" aria-hidden />
              <div className="system-visual" aria-label="SmartTutor AI system architecture">
                <div className="system-noise" aria-hidden />
                <div className="system-head mono"><span>01 / LIVE SYSTEM</span><b><i/> SMARTTUTOR AI</b></div>
                <div className="system-title">From document<br/><span>to intelligence.</span></div>
                <div className="system-stage">
                  <div className="system-orbit system-orbit-1" aria-hidden />
                  <div className="system-orbit system-orbit-2" aria-hidden />
                  <div className="system-core"><span className="mono">RAG</span><b>SmartTutor</b><small>learning engine</small></div>
                  <div className="system-line line-a" aria-hidden />
                  <div className="system-line line-b" aria-hidden />
                  <div className="system-line line-c" aria-hidden />
                  <div className="system-node node-pdf"><small>01</small><b>PDF</b><span>source</span></div>
                  <div className="system-node node-chunk"><small>02</small><b>CHUNK</b><span>process</span></div>
                  <div className="system-node node-vector"><small>03</small><b>EMBED</b><span>vector</span></div>
                  <div className="system-node node-db"><small>04</small><b>PGVECTOR</b><span>memory</span></div>
                  <div className="system-node node-gemini"><small>05</small><b>GEMINI</b><span>reasoning</span></div>
                </div>
                <div className="system-bottom mono"><span>DOCUMENT INTELLIGENCE</span><span>● ONLINE</span></div>
              </div>
              <div className="floating-badge badge-one"><span className="badge-dot" /> AI / ML <small>focused</small></div>
              <div className="floating-badge badge-two">7.64 <small>CGPA</small></div>
              <div className="hero-float-card float-stack"><span className="float-label mono">STACK</span><b>React · Python</b><small>FastAPI · PostgreSQL</small></div>
              <div className="hero-float-card float-dsa"><span className="float-label mono">DSA / NOW</span><b>Arrays → Stack</b><small>LeetCode practice</small></div>
            </div>
          </div>
        </section>

        <section id="about" className="editorial-section"><div className="wrap">
          <div className="section-intro rv"><span className="section-kicker mono">01 / PROFILE</span><h2>About</h2>{p.about.map(t => <p key={t} className="mut" style={{ maxWidth: 680, lineHeight: 1.7 }}>{t}</p>)}
            <p className="mut">Current learning path: {p.learningPath.join(' · ')}</p></div>
          <ol className="grid g3 rv" style={{ listStyle: 'none', padding: 0, margin: '32px 0 0' }} aria-label="Journey">
            {p.journey.map((j, i) => <li key={j.year} className="card hv" style={i === p.journey.length - 1 ? { borderColor: 'var(--ac)' } : {}}>
              <div className="mono" style={{ color: 'var(--ac)' }}>{j.year}</div><h3 style={{ fontSize: 18, margin: '6px 0 10px' }}>{j.title}</h3>
              <div className="mut" style={{ fontSize: 14 }}>{j.items.join(' · ')}</div></li>)}
          </ol>
          <div className="state-heading rv"><div><span className="section-kicker mono">CURRENT SIGNAL</span><h2>What I’m working on</h2></div><span className="mono mut state-note">updated as I learn</span></div>
          <div className="grid g3 rv">{snapshot.map(s => <div className="card hv" key={s.t}><span className="chip on">{s.s}</span><h3 style={{ fontSize: 20, margin: '12px 0 4px' }}>{s.t}</h3><div className="mut" style={{ fontSize: 14 }}>{s.d}</div></div>)}</div>
        </div></section>

        <section id="skills" className="editorial-section"><div className="wrap">
          <div className="section-intro rv"><span className="section-kicker mono">02 / TOOLKIT</span><h2>Skills</h2><p className="mut">Grouped by how I use them, not by self-rated percentages.</p></div>
          <div className="stack-grid rv">{skillGroups.map((g, gi) => <div className="stack-column" key={g.name}><div className="stack-number mono">0{gi + 1}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><h3 style={{ fontSize: 17 }}>{g.name}</h3><span className="mut mono" style={{ fontSize: 11 }}>{g.level}</span></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>{g.items.map(i => <span className="chip" key={i}>{i}</span>)}</div></div>)}</div>
        </div></section>

        <section id="projects"><div className="wrap">
          <div className="section-intro rv"><span className="section-kicker mono">03 / SELECTED WORK</span><h2>Projects</h2></div>
          <div role="group" aria-label="Filter projects" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '4px 0 20px' }}>
            {filters.map(f => <button key={f} aria-pressed={filter === f} className={`chip ${filter === f ? 'on' : ''}`} style={{ background: 'none', cursor: 'pointer', padding: '9px 14px', whiteSpace: 'nowrap' }} onClick={() => pickFilter(f)}>{f}</button>)}
          </div>
          {vis(st) && <article className="featured-project card rv">
            <div className="featured-copy">
              <div className="project-meta-row">
                <span className="chip on">FLAGSHIP · {st.category}</span>
                <span className="mono project-index">01 / 02</span>
              </div>
              <h3 className="project-title">{st.name}</h3>
              <p className="project-lead">An AI-powered personalized learning platform that combines RAG, document intelligence and generative AI to help students learn from their own study material.</p>
              <div className="project-feature-list">
                {(st.study!.Features as string[]).slice(0, 6).map((f, i) => <div key={f}><span>0{i + 1}</span>{f}</div>)}
              </div>
              <div className="tech-row">{st.tech.slice(0, 8).map(t => <span className="chip" key={t}>{t}</span>)}</div>
              <div className="project-actions">
                <button className="btn p" onClick={() => setStudy(st)}>Read Case Study</button>
                <button className="btn" onClick={() => setArch(true)}>Explore Architecture</button>
                {st.github ? <button className="btn" onClick={() => open(st.github!)}><Github size={16} /> View GitHub</button> : <span className="chip">GitHub · coming soon</span>}
              </div>
            </div>
            <div className="project-visual">
              <div className="visual-label mono">SYSTEM / SMARTTUTOR</div>
              <div className="flow-stack">
                {pipeline.map((s, i) => <div key={s} className={`flow-node ${i === step ? 'active' : ''}`}><span>{String(i + 1).padStart(2, '0')}</span><b>{s}</b>{i < pipeline.length - 1 && <i />}</div>)}
              </div>
              <div className="visual-footer mono"><span>RAG PIPELINE</span><span>LIVE PREVIEW</span></div>
            </div>
          </article>}
          {vis(lpu) && <article className="secondary-project card rv">
            <div>
              <div className="project-meta-row"><span className="chip">FRONTEND PROTOTYPE</span><span className="mono project-index">02 / 02</span></div>
              <h3>{lpu.name}</h3>
              <p className="mut">A frontend prototype inspired by the LPU Touch experience, including a mess scanner interface. Focus: component design, UI implementation and recreating a real-world university interface.</p>
              <div className="tech-row">{lpu.tech.map(t => <span className="chip" key={t}>{t}</span>)}</div>
              <div className="project-actions">
                <button className="btn p" onClick={() => setStudy(lpu)}>Explore Case Study</button>
                <button className="btn" onClick={() => open(lpu.github!)}><Github size={16} /> View GitHub</button>
              </div>
            </div>
            <div className="lpu-mock" aria-hidden>
              <div className="mock-top"><span>◌</span><b>LPU TOUCH</b><span>⌁</span></div>
              <div className="mock-card"><small>MESS SCANNER</small><strong>Scan your meal</strong><div className="mock-line"/><div className="mock-line short"/><span className="mock-button">OPEN SCANNER</span></div>
              <div className="mock-nav"><span>Home</span><span>Mess</span><span>Profile</span></div>
            </div>
          </article>}
          {more.some(vis) && <><h3 className="mono mut" style={{ fontSize: 12, letterSpacing: '.1em', margin: '36px 0 12px', fontWeight: 500 }}>MORE PROJECTS</h3>
          <div className="grid g2">{more.filter(vis).map(x => <article key={x.id} className="card" style={{ padding: 16 }}>
            <span className="chip">{x.category}</span><h3 style={{ fontSize: 17, margin: '10px 0 6px' }}>{x.name}</h3>
            <p className="mut" style={{ fontSize: 14, margin: 0 }}>{x.short}</p>
            <button className="btn" style={{ marginTop: 12 }} onClick={() => setStudy(x)}>Details</button></article>)}</div></>}
        </div></section>

        <section id="dsa" className="editorial-section dsa-section"><div className="wrap">
          <div className="section-intro rv"><span className="section-kicker mono">04 / PROBLEM SOLVING</span><h2>DSA Journey</h2></div>
          <p className="mut rv">Currently practicing the early patterns and working toward the later ones. Statuses are set by me, not auto-generated.</p>
          <ol className="rv" style={{ listStyle: 'none', padding: 0, margin: '8px 0 0', display: 'grid', gap: 0, maxWidth: 560 }}>
            {dsa.map((x, i) => <li key={x.t} style={{ display: 'grid', gridTemplateColumns: '28px 1fr auto', gap: 12, alignItems: 'center', padding: '12px 0', borderTop: i ? '1px solid var(--bd)' : 0 }}>
              <span className="mono mut" style={{ fontSize: 12 }}>{String(i + 1).padStart(2, '0')}</span><b style={{ fontWeight: 500 }}>{x.t}</b>
              <span className={`chip ${x.s === 'Learning' ? '' : 'on'}`} style={x.s === 'Practicing' ? { background: 'var(--ac)', color: 'var(--acf)', borderColor: 'var(--ac)' } : {}}>{x.s === 'Practicing' ? 'CURRENTLY PRACTICING' : x.s}</span></li>)}
          </ol>
          <p className="mut" style={{ marginTop: 24 }}>Follow my problem-solving journey on LeetCode.</p>
          <a className="btn p" href={links.leetcode} target="_blank" rel="noopener noreferrer"><Code2 size={16} /> View LeetCode Profile</a>

          <h2 style={{ marginTop: 80 }} className="rv">Learning Lab</h2>
          <div role="tablist" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '12px 0' }}>{Object.keys(learning).map(k => <button role="tab" aria-selected={cat === k} key={k} className={`chip ${cat === k ? 'on' : ''}`} style={{ background: 'none', cursor: 'pointer', padding: '7px 12px' }} onClick={() => setCat(k)}>{k}</button>)}</div>
          <div className="card" role="tabpanel"><div className="mut" style={{ marginBottom: 10 }}>Currently exploring</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{learning[cat].map(t => <span className="chip on" key={t}>{t}</span>)}</div></div>
        </div></section>

        <Thinking />

        <section id="github"><div className="wrap">
          <div className="section-intro rv"><span className="section-kicker mono">05 / CODE ACTIVITY</span><h2>GitHub</h2></div>
          <p className="mut">A live snapshot of my public code activity. GitHub is an enhancement here — the portfolio itself does not depend on the API.</p>
          <div className="grid g3">{repos?.length ? repos.map(r => <a key={r.name} className="card hv" style={{ color: 'var(--fg)', textDecoration: 'none' }} href={r.html_url} target="_blank" rel="noopener noreferrer">
            <b>{r.name}</b><div className="mut" style={{ fontSize: 14, margin: '6px 0' }}>{r.description ?? 'No description'}</div>
            <div className="mono mut" style={{ fontSize: 12 }}>{r.language ?? '—'} · pushed {new Date(r.pushed_at).toLocaleDateString()}</div></a>)
            : <div className="card mut">{repos === null ? 'Loading code activity…' : 'GitHub activity is currently unavailable. View the profile directly.'}</div>}</div>
          <a className="btn p" style={{ marginTop: 20 }} href={links.github} target="_blank" rel="noopener noreferrer"><Github size={16} /> View GitHub</a>
        </div></section>

        <section id="contact"><div className="wrap contact-wrap" style={{ maxWidth: 920 }}>
          <span className="section-kicker mono rv">06 / CONTACT</span><h2 className="rv" style={{ fontSize: 'clamp(2rem,5vw,3.2rem)' }}>Let's build something useful.</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '20px 0 28px' }}>
            <a className="btn p" href={links.mailto}><Mail size={16} /> Email Me</a>
            <a className="btn" href={links.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} /> Connect on LinkedIn</a>
            <a className="btn" href={links.github} target="_blank" rel="noopener noreferrer"><Github size={16} /> GitHub</a>
            <a className="btn" href={links.leetcode} target="_blank" rel="noopener noreferrer"><Code2 size={16} /> LeetCode</a>
          </div>
          <form onSubmit={submit} className="card" style={{ display: 'grid', gap: 12 }}>
            <label>Name<input name="name" required autoComplete="name" /></label>
            <label>Email<input name="email" type="email" required autoComplete="email" /></label>
            <label>Message<textarea name="message" rows={4} required /></label>
            <button className="btn p" type="submit" style={{ justifySelf: 'start' }}>Send message</button>
            <span role="status" className="mut">{sent}</span>
          </form>
          <div style={{ display: 'flex', gap: 8, marginTop: 20 }}><Social /></div>
          <p className="mut" style={{ fontSize: 13, marginTop: 40 }}>© {new Date().getFullYear()} {p.name} · Tip: open the terminal and run <span className="mono">help</span></p>
        </div></section>
      </main>}

      <Suspense fallback={null}>
        {term && <Terminal onClose={() => setTerm(false)} />}
        {arch && <Architecture onClose={() => setArch(false)} />}
        {study && <CaseStudy p={study} onClose={() => setStudy(null)} onArch={() => { setStudy(null); setArch(true) }} />}
      </Suspense>
    </div>
  )
}
