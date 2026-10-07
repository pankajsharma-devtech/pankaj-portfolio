export type Category = 'AI / ML' | 'FULL STACK' | 'FRONTEND' | 'COMPUTER VISION'
export interface Project {
  id: string; name: string; short: string; category: Category; tech: string[]
  github?: string; demo?: string; featured?: boolean; features?: string[]
  study?: Record<string, string | string[]>
}
export const projects: Project[] = [
  {
    id: 'smarttutor', name: 'SmartTutor AI', category: 'AI / ML', featured: true,
    short: 'An AI-powered personalized learning platform that combines RAG, document intelligence and generative AI to help students learn from their own study material.',
    tech: ['Python', 'FastAPI', 'Streamlit', 'Google Gemini API / GenAI SDK', 'RAG', 'PostgreSQL', 'pgvector', 'Docker', 'Alembic', 'PyPDF2', 'SSE streaming'],
    features: ['AI Tutor Chat', 'Document Intelligence', 'PDF Upload', 'Text Extraction', 'Chunking', 'Embeddings', 'Vector Search', 'Quiz Generator', 'Study Planner', 'Flashcards', 'Analytics'],
    github: '',
    study: {
      Problem: 'Students have PDFs and notes but struggle to turn them into an interactive learning workflow.',
      Approach: 'Built a RAG-powered learning system that processes uploaded documents and uses semantic retrieval before generating responses.',
      System: 'PDF → Text Extraction → Chunking → Embeddings → pgvector → Retrieval → Gemini → Response. Open the interactive architecture for the full request flow from user to response.',
      'Key Decisions': ['Why RAG: answers are grounded in the student’s own material instead of the model’s general knowledge.', 'Why pgvector: embeddings live next to the relational data in PostgreSQL, so one database handles both.', 'Why FastAPI: typed, async Python APIs that sit naturally beside the AI libraries.', 'Why streaming (SSE): the tutor’s answer appears as it is generated instead of after a long wait.', 'Why Docker: the app, database and extensions run the same way on any machine.', 'Chunking: extracted text is split into smaller passages so retrieval returns focused context.'],
      Features: ['AI Tutor Chat', 'PDF Document Intelligence', 'Quiz Generator', 'Study Planner', 'Flashcards', 'Analytics'],
      'What I Learned': ['Integrating AI APIs into a real application', 'Document processing', 'Vector search', 'Backend architecture', 'Debugging', 'Deployment and infrastructure'],
    },
  },
  {
    id: 'lpu-touch', name: 'LPU Touch Prototype', category: 'FRONTEND',
    short: 'A frontend prototype inspired by the LPU Touch experience, featuring a mess scanner interface.',
    tech: ['React', 'TypeScript', 'Vite'], features: ['Mess scanner interface'],
    github: 'https://github.com/pankajsharma-devtech/lpu-touch-prototype.git',
    study: { Overview: 'A frontend prototype (not a production application) inspired by the LPU Touch experience, including a mess scanner interface.', Focus: ['Frontend engineering', 'Component design', 'UI implementation', 'Interaction design', 'Recreating a real-world university interface'], 'Tech Stack': ['React', 'TypeScript', 'Vite'] },
  },
  {
    id: 'attendance', name: 'Smart Attendance System', category: 'COMPUTER VISION',
    short: 'A computer vision and machine learning based attendance project.',
    tech: ['Computer Vision', 'Machine Learning'], github: '', demo: '', features: [],
    study: { Overview: 'A computer vision and machine learning based attendance project.' },
  },
  {
    id: 'landguard', name: 'LANDGUARD-X', category: 'FULL STACK',
    short: 'A full stack project (repository: LANDGUARD-X-FULL-STACK).', tech: ['Full Stack'],
    github: '', demo: '', features: [],
    study: { Overview: 'A full stack project. Repository: LANDGUARD-X-FULL-STACK.' },
  },
]
export const filters = ['ALL', 'AI / ML', 'FULL STACK', 'FRONTEND', 'COMPUTER VISION'] as const
export const archNodes = [
  { id: 'User', d: 'Uploads study PDFs and asks questions.' },
  { id: 'Frontend', d: 'Streamlit interface for chat, uploads, quizzes and study tools.' },
  { id: 'FastAPI', d: 'Backend API (served by Uvicorn) that orchestrates uploads, retrieval and generation.' },
  { id: 'Document Processor', d: 'Extracts raw text from uploaded PDFs (PyPDF2).' },
  { id: 'Chunker', d: 'Splits extracted text into smaller passages suitable for embedding.' },
  { id: 'Embedding Model', d: 'Converts chunks and queries into vectors.' },
  { id: 'pgvector', d: 'Stores document embeddings and enables similarity-based retrieval.' },
  { id: 'Retriever', d: 'Finds the chunks most similar to the question.' },
  { id: 'Gemini', d: 'Generates an answer grounded in the retrieved context.' },
  { id: 'Response', d: 'The answer is streamed back to the user using SSE.' },
]
