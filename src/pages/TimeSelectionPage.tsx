import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BackButton } from '../components/ui'
import { TimeOption } from '../components/TimeOption'
import type { Category, PrepTime } from '../types/recipe'
import { CATEGORY_DESCRIPTIONS, CATEGORY_LABELS } from '../types/recipe'

const timeOptions: PrepTime[] = [5, 10, 20, 35]
const validCategories = new Set([
  'school-lunch',
  'school-snack',
  'breakfast',
  'family-dinner',
  'protein-snack',
])

export function TimeSelectionPage() {
  const { category } = useParams<{ category: Category }>()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<PrepTime | null>(null)

  useEffect(() => {
    if (!category || !validCategories.has(category)) {
      navigate('/')
    }
  }, [category, navigate])

  if (!category || !validCategories.has(category)) {
    return null
  }

  const handleSelect = (time: PrepTime) => {
    setSelected(time)
    navigate(`/results/${category}/${time}`)
  }

  return (
    <div className="page-shell safe-bottom animate-fade-in">
      <BackButton to="/" />

      <header className="mb-7 mt-1">
        <p className="brand-label">{CATEGORY_LABELS[category].toUpperCase()}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-green-dark/60">
          {CATEGORY_DESCRIPTIONS[category]}
        </p>
      </header>

      <p className="mb-4 text-sm font-semibold text-green-dark/70">
        How much time do you have?
      </p>

      <div className="flex flex-col gap-3">
        {timeOptions.map((time) => (
          <TimeOption
            key={time}
            time={time}
            selected={selected === time}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  )
}
