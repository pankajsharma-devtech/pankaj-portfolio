export const learning: Record<string, string[]> = {
  'DSA': ['Problem-solving patterns', 'Advanced DSA', 'LeetCode practice'],
  'AI / ML': ['RAG', 'Embeddings', 'Vector Search', 'LLM Applications', 'Generative AI'],
  'Full Stack': ['Production-style applications', 'FastAPI', 'React + TypeScript'],
  'Cloud': ['AWS fundamentals'],
  'Cybersecurity': ['Security fundamentals'],
}
export type DsaState = 'Learning' | 'Practicing' | 'Comfortable'
// Edit statuses honestly. The order is the learning journey shown on the site.
const practicing = ['Arrays', 'Two Pointers', 'Hashing']
export const dsaTopics: { t: string; s: DsaState }[] = ['Arrays', 'Two Pointers', 'Hashing', 'Binary Search', 'Stack', 'Queue', 'Linked List', 'Trees', 'Graphs']
  .map(t => ({ t, s: (practicing.includes(t) ? 'Practicing' : 'Learning') as DsaState }))
