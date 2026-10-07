import { useEffect, useState } from 'react'
export default function Typed({ text }: { text: string }) {
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  const [n, setN] = useState(still ? text.length : 0)
  useEffect(() => { if (n >= text.length) return; const t = setTimeout(() => setN(n + 1), 45); return () => clearTimeout(t) }, [n, text])
  return <span>{text.slice(0, n)}<span aria-hidden style={{ opacity: n < text.length ? 1 : 0 }}>▍</span></span>
}
