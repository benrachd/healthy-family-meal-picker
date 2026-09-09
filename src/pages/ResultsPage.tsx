import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BackButton, Button, PageHeader } from '../components/ui'
import { MealCard } from '../components/MealCard'
import { filterRecipesByCategoryAndTime, getRandomRecipes } from '../lib/recipeUtils'
import type { Category, PrepTime, Recipe } from '../types/recipe'

export function ResultsPage() {
  const { category, time } = useParams<{ category: Category; time: string }>()
  const navigate = useNavigate()
  const prepTime = Number(time) as PrepTime
  const [meals, setMeals] = useState<Recipe[]>([])
  const [shownIds, setShownIds] = useState<string[]>([])

  const loadMeals = useCallback(
    (exclude: string[] = []) => {
      if (!category) return
      const pool = filterRecipesByCategoryAndTime(category, prepTime)
      const picked = getRandomRecipes(pool, 3, exclude)
      setMeals(picked)
      setShownIds((prev) => [...prev, ...picked.map((m) => m.id)])
    },
    [category, prepTime]
  )

  useEffect(() => {
    if (!category || ![5, 10, 20, 35].includes(prepTime)) {
      navigate('/')
      return
    }
    loadMeals()
  }, [category, prepTime, navigate, loadMeals])

  const handleTryDifferent = () => {
    loadMeals(shownIds)
  }

  if (!category) return null

  return (
    <div className="page-shell safe-bottom">
      <BackButton to={`/time/${category}`} />

      <PageHeader
        title="Your Quick Picks"
        subtitle="Easy ideas that fit your time."
        className="animate-fade-in"
      />

      {meals.length === 0 ? (
        <div className="py-12 text-center animate-fade-in">
          <p className="mb-4 text-green-dark/55">
            No meals found for this time. Try a different option.
          </p>
          <Button variant="secondary" onClick={() => navigate(`/time/${category}`)}>
            Choose Different Time
          </Button>
        </div>
      ) : (
        <>
          <div className="mb-5 flex flex-col gap-4">
            {meals.map((meal, i) => (
              <MealCard key={meal.id} recipe={meal} index={i} />
            ))}
          </div>

          <button
            type="button"
            onClick={handleTryDifferent}
            className="w-full py-3 text-center text-[15px] font-semibold text-green transition-colors hover:text-green-light"
          >
            Try Different Meals
          </button>
        </>
      )}
    </div>
  )
}
