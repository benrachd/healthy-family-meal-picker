import { useState } from 'react'
import type { ShoppingItem } from '../types/recipe'

interface ShoppingListItemProps {
  item: ShoppingItem
  onToggle: (id: string) => void
}

export function ShoppingListItem({ item, onToggle }: ShoppingListItemProps) {
  const [animating, setAnimating] = useState(false)

  const handleToggle = () => {
    setAnimating(true)
    onToggle(item.id)
    setTimeout(() => setAnimating(false), 250)
  }

  return (
    <label
      className={`flex cursor-pointer items-center gap-3.5 rounded-2xl bg-white px-4 py-3.5 shadow-[var(--shadow-card)] transition-all duration-200 ${
        item.checked ? 'opacity-55' : ''
      }`}
    >
      <span className={`relative shrink-0 ${animating ? 'animate-check' : ''}`}>
        <input
          type="checkbox"
          checked={item.checked}
          onChange={handleToggle}
          className="peer sr-only"
        />
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-colors duration-200 ${
            item.checked
              ? 'border-green bg-green text-white'
              : 'border-cream-dark bg-cream peer-focus-visible:ring-2 peer-focus-visible:ring-green/40'
          }`}
        >
          {item.checked && (
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          )}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block text-[15px] font-medium text-green-dark ${
            item.checked ? 'line-through decoration-green-dark/30' : ''
          }`}
        >
          {item.name}
        </span>
        {item.quantity && (
          <span className={`mt-0.5 block text-sm ${item.checked ? 'text-green-dark/35' : 'text-green-dark/50'}`}>
            {item.quantity}
          </span>
        )}
      </span>
    </label>
  )
}
