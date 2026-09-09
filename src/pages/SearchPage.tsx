import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { MealCard } from '../components/MealCard'
import { SearchBar } from '../components/SearchBar'
import { BackButton, PageHeader } from '../components/ui'
import { searchRecipes } from '../lib/recipeUtils'

export function SearchPage() {
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''

  const results = useMemo(() => searchRecipes(query), [query])

  return (
    <div className="page-shell safe-bottom animate-fade-in">
      <BackButton to="/" label="Home" />
      <PageHeader title="Search" subtitle="Find meals by name, ingredient, or tag." />
      <SearchBar initialQuery={query} compact />

      {query ? (
        <>
          <p className="mb-4 text-sm text-green-dark/50">
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
          {results.length === 0 ? (
            <p className="py-8 text-center text-green-dark/55">
              No recipes found. Try a different search.
            </p>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              {results.map((recipe, i) => (
                <MealCard key={recipe.id} recipe={recipe} index={i} variant="compact" />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="py-8 text-center text-green-dark/55">
          Type a meal name or ingredient above.
        </p>
      )}
    </div>
  )
}
