import { Link } from 'react-router-dom'
import { SavedMealCard } from '../components/SavedMealCard'
import { Button, PageHeader } from '../components/ui'
import { useApp } from '../context/AppContext'
import { getRecipeById } from '../data/recipes'

export function SavedPage() {
  const { savedIds } = useApp()
  const savedRecipes = savedIds
    .map((id) => getRecipeById(id))
    .filter(Boolean)

  return (
    <div className="page-shell safe-bottom animate-fade-in">
      <PageHeader
        title="Saved Meals"
        subtitle="Your family favorites, ready anytime."
      />

      {savedRecipes.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cream-dark/80">
            <svg className="h-8 w-8 text-green/50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </div>
          <p className="mb-6 text-[15px] text-green-dark/55">
            Your favorites will appear here.
          </p>
          <Link to="/" className="w-full max-w-xs">
            <Button>Find a Meal</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {savedRecipes.map((recipe) =>
            recipe ? <SavedMealCard key={recipe.id} recipe={recipe} /> : null
          )}
        </div>
      )}
    </div>
  )
}
