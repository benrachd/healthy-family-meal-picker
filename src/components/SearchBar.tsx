import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface SearchBarProps {
  initialQuery?: string
  compact?: boolean
}

export function SearchBar({ initialQuery = '', compact = false }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`)
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? '' : 'mb-6'}>
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-green-dark/35"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search meals..."
          className="w-full rounded-2xl border border-cream-dark/80 bg-white py-3 pl-10 pr-4 text-[15px] text-green-dark shadow-[var(--shadow-card)] placeholder:text-green-dark/35 focus:border-green/25 focus:outline-none focus:ring-2 focus:ring-green/15"
        />
      </div>
    </form>
  )
}
