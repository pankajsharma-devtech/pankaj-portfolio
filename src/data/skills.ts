export type Level = 'Working With' | 'Building With' | 'Currently Learning'
export const skillGroups: { name: string; level: Level; items: string[] }[] = [
  { name: 'Languages', level: 'Working With', items: ['C', 'C++', 'Python', 'JavaScript', 'TypeScript', 'SQL'] },
  { name: 'Frontend', level: 'Building With', items: ['React', 'HTML', 'CSS', 'Tailwind CSS', 'Vite'] },
  { name: 'Backend', level: 'Building With', items: ['Python', 'FastAPI', 'Node.js fundamentals', 'REST APIs'] },
  { name: 'Database', level: 'Building With', items: ['PostgreSQL', 'SQL', 'pgvector'] },
  { name: 'AI / ML', level: 'Building With', items: ['Generative AI', 'RAG', 'Embeddings', 'Vector Databases', 'Google Gemini API', 'Machine Learning fundamentals'] },
  { name: 'Tools / Infra', level: 'Working With', items: ['Git', 'GitHub', 'Docker', 'Alembic', 'Uvicorn'] },
  { name: 'Currently Learning', level: 'Currently Learning', items: ['Advanced DSA', 'AWS / Cloud fundamentals', 'Cybersecurity fundamentals'] },
]
export const consoleRows = [
  { k: 'Frontend', s: 'ACTIVE', tip: 'React, TypeScript, Vite and Tailwind CSS for interfaces like LPU Touch Prototype.' },
  { k: 'Backend', s: 'ACTIVE', tip: 'FastAPI + PostgreSQL services with REST APIs and SSE streaming (SmartTutor AI).' },
  { k: 'AI / ML', s: 'BUILDING', tip: 'RAG pipelines, embeddings and vector search with the Gemini API.' },
  { k: 'DSA', s: 'PRACTICING', tip: 'Working through problem-solving patterns on LeetCode.' },
  { k: 'Cloud', s: 'EXPLORING', tip: 'Learning AWS / cloud fundamentals.' },
  { k: 'Cybersecurity', s: 'EXPLORING', tip: 'Learning security fundamentals.' },
]
export const snapshot = [
  { s: 'BUILDING', t: 'SmartTutor AI', d: 'AI-powered personalised learning platform' },
  { s: 'PRACTICING', t: 'DSA', d: 'Practicing problem-solving patterns' },
  { s: 'BUILDING', t: 'Full Stack', d: 'Building production-style applications' },
  { s: 'EXPLORING', t: 'Cloud', d: 'Learning AWS fundamentals' },
  { s: 'EXPLORING', t: 'Cybersecurity', d: 'Exploring security fundamentals' },
  { s: 'LEARNING', t: 'AI/ML', d: 'Exploring RAG and Generative AI' },
]
