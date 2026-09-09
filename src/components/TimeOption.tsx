import type { PrepTime } from '../types/recipe'
import { PREP_TIME_LABELS } from '../types/recipe'

const TIME_HINTS: Record<PrepTime, string> = {
  5: 'Grab-and-go speed',
  10: 'Quick & easy',
  20: 'A little more time',
  35: 'Worth the wait',
}

interface TimeOptionProps {
  time: PrepTime
  selected: boolean
  onSelect: (time: PrepTime) => void
}

export function TimeOption({ time, selected, onSelect }: TimeOptionProps) {
  const label = PREP_TIME_LABELS[time]

  return (
    <button
      type="button"
      onClick={() => onSelect(time)}
      className={`card-lift flex w-full items-center justify-between rounded-2xl px-5 py-4 text-left transition-all duration-200 ${
        selected
          ? 'bg-green text-white shadow-[0_4px_20px_rgba(45,106,79,0.3)] ring-2 ring-green ring-offset-2 ring-offset-cream'
          : 'bg-white text-green-dark shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]'
      }`}
    >
      <div>
        <span className={`block text-2xl font-bold tracking-tight ${selected ? 'text-white' : 'text-green-dark'}`}>
          {label}
        </span>
        <span className={`mt-0.5 block text-sm ${selected ? 'text-white/75' : 'text-green-dark/50'}`}>
          {TIME_HINTS[time]}
        </span>
      </div>
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
          selected ? 'bg-white/20 text-white' : 'bg-cream text-green-dark/40'
        }`}
        aria-hidden="true"
      >
        →
      </span>
    </button>
  )
}
