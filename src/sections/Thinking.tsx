import { useState } from 'react'
const steps = [
  ['Understand', 'Restate it in my own words, list inputs, outputs and constraints, and pin down edge cases before touching code.'],
  ['Break Down', 'Split it into smaller pieces that can be solved and checked independently.'],
  ['Design', 'Choose data structures and an approach, then check the time and space cost on paper.'],
  ['Build', 'Implement the smallest working version first, then extend it.'],
  ['Test', 'Run normal cases, edge cases and failing cases, not just the happy path.'],
  ['Debug', 'Reproduce the issue, narrow down where it starts, fix the cause rather than the symptom.'],
  ['Iterate', 'Refactor, simplify and improve based on what the tests and the review showed.'],
]
const dna = [['Build', 'Turn ideas into working software.'], ['Debug', 'Find the real cause, not just the symptom.'], ['Learn', 'Pick up the next tool or concept the project needs.'], ['Iterate', 'Ship, review, improve.']]
export default function Thinking() {
  const [i, setI] = useState(0)
  const [d, setD] = useState(0)
  return (
    <section id="process"><div className="wrap">
      <h2 className="rv">How I Approach Problems</h2>
      <div className="grid rv" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 24 }}>
        <ol role="tablist" aria-orientation="vertical" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
          {steps.map(([t], k) => <li key={t}><button role="tab" aria-selected={k === i} onClick={() => setI(k)} className="btn" style={{ width: '100%', justifyContent: 'flex-start', borderColor: k === i ? 'var(--ac)' : undefined }}>
            <span className="mono mut">{String(k + 1).padStart(2, '0')}</span>{t}</button></li>)}
        </ol>
        <div className="card" role="tabpanel" aria-live="polite" key={i} style={{ animation: 'mi .3s' }}>
          <div className="mono" style={{ color: 'var(--ac)' }}>{String(i + 1).padStart(2, '0')}</div>
          <h3 style={{ fontSize: 24, margin: '8px 0 12px' }}>{steps[i][0]}</h3><p className="mut" style={{ lineHeight: 1.7, margin: 0 }}>{steps[i][1]}</p>
        </div>
      </div>
      <h2 className="rv" style={{ marginTop: 72 }}>Engineering DNA</h2>
      <div className="rv" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
        {dna.map(([t], k) => <button key={t} onClick={() => setD(k)} onMouseEnter={() => setD(k)} className="btn" style={{ fontSize: 'clamp(1.1rem,3vw,1.6rem)', padding: '12px 22px', borderColor: k === d ? 'var(--ac)' : undefined, background: k === d ? 'color-mix(in srgb,var(--ac) 14%,transparent)' : undefined }}>{t}</button>)}
      </div>
      <p className="mut" aria-live="polite" style={{ marginTop: 14 }}>{dna[d][1]}</p>
      <blockquote className="rv" style={{ margin: '40px 0 0', fontSize: 'clamp(1.2rem,3vw,1.7rem)', maxWidth: 640, lineHeight: 1.4, borderLeft: '2px solid var(--ac)', paddingLeft: 18 }}>I don’t expect the first version to be perfect. I expect it to teach me what the next version should be.</blockquote>
    </div></section>
  )
}
