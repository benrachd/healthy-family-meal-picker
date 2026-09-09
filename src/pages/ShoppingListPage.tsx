import { ShoppingListItem } from '../components/ShoppingListItem'
import { Button, PageHeader } from '../components/ui'
import { useApp } from '../context/AppContext'

export function ShoppingListPage() {
  const { items, toggleItem, clearCompleted, clearAll } = useApp()
  const hasCompleted = items.some((i) => i.checked)

  return (
    <div className="page-shell safe-bottom animate-fade-in">
      <PageHeader
        title="Shopping List"
        subtitle="Everything you need for your saved meals."
      />

      {items.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cream-dark/80">
            <svg className="h-8 w-8 text-green/50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
          </div>
          <p className="text-[15px] text-green-dark/55">
            Add ingredients from a recipe to get started.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-2">
            {items.map((item) => (
              <ShoppingListItem
                key={item.id}
                item={item}
                onToggle={toggleItem}
              />
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            {hasCompleted && (
              <Button variant="secondary" onClick={clearCompleted}>
                Clear Completed
              </Button>
            )}
            <Button variant="ghost" onClick={clearAll}>
              Clear All
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
