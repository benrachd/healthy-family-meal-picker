import { useMemo } from 'react'
import { CategoryCard } from '../components/CategoryCard'
import { QuickPickCard } from '../components/QuickPickCard'
import { SearchBar } from '../components/SearchBar'
import { SectionHeading } from '../components/ui'
import { recipes } from '../data/recipes'
import { getRandomRecipes } from '../lib/recipeUtils'
import type { Category } from '../types/recipe'

const categories: Category[] = [
  'school-lunch',
  'school-snack',
  'breakfast',
  'family-dinner',
  'protein-snack',
]

export function HomePage() {
  const quickPicks = useMemo(() => getRandomRecipes(recipes, 3), [])

  return (
    <div className="page-shell-home safe-bottom">
      <header className="mb-6 animate-fade-in">
        <p className="brand-label">Healthy Family Meals</p>
        <h1 className="mt-2 text-[1.75rem] font-bold leading-tight tracking-tight text-green-dark sm:text-3xl">
          What are we making today?
        </h1>
        <p className="mt-2 text-[15px] leading-relaxed text-green-dark/55">
          Healthy ideas for busy family days.
        </p>
      </header>

      <SearchBar />

      <section className="mb-7">
        <SectionHeading title="Choose a meal" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {categories.map((category, i) => (
            <CategoryCard key={category} category={category} index={i} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Quick Picks" subtitle="Healthy choices. Easier days." />
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 no-scrollbar">
          {quickPicks.map((recipe) => (
            <QuickPickCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  )
}
