import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RecipeImage } from '../components/RecipeImage'
import { Button } from '../components/ui'
import { useApp } from '../context/AppContext'
import { getRecipeById } from '../data/recipes'
import { PREP_TIME_LABELS } from '../types/recipe'

export function RecipePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isSaved, toggleSaved, addIngredients } = useApp()
  const [savedPulse, setSavedPulse] = useState(false)
  const [addedToList, setAddedToList] = useState(false)

  const recipe = id ? getRecipeById(id) : undefined

  if (!recipe) {
    return (
      <div className="page-shell text-center safe-bottom">
        <p className="mb-4 text-green-dark/55">Recipe not found.</p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    )
  }

  const saved = isSaved(recipe.id)

  const handleSave = () => {
    toggleSaved(recipe.id)
    setSavedPulse(true)
    setTimeout(() => setSavedPulse(false), 400)
  }

  const handleAddToList = () => {
    addIngredients(recipe.ingredients, recipe.id)
    setAddedToList(true)
    setTimeout(() => setAddedToList(false), 2000)
  }

  const handleAnotherMeal = () => {
    navigate(`/time/${recipe.category}`)
  }

  return (
    <div className="recipe-detail min-h-dvh animate-fade-in bg-cream">
      {/* Hero */}
      <div className="recipe-detail-hero relative mx-auto w-full max-w-lg">
        <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10] sm:max-h-[420px]">
          <RecipeImage
            src={recipe.image}
            alt={recipe.name}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-dark/45 via-transparent to-green-dark/55" />
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="absolute left-4 top-[max(0.75rem,env(safe-area-inset-top))] flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/30 active:scale-95"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content panel — overlaps hero for premium card feel */}
      <div className="recipe-detail-body relative z-10 mx-auto w-full max-w-lg pb-[calc(9.5rem+env(safe-area-inset-bottom))]">
        <div className="-mt-8 rounded-t-[1.75rem] bg-cream pt-7 shadow-[0_-6px_24px_rgba(27,67,50,0.07)]">
          <h1 className="text-[1.625rem] font-bold leading-[1.2] tracking-tight text-green-dark sm:text-[1.875rem]">
            {recipe.name}
          </h1>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <MetaItem icon="time">{PREP_TIME_LABELS[recipe.prepTime]}</MetaItem>
            <MetaItem icon="difficulty">{recipe.difficulty}</MetaItem>
          </div>

          {recipe.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <span key={tag} className="recipe-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Ingredients */}
          <section className="mt-8">
            <h2 className="recipe-section-label">Ingredients</h2>
            <ul className="mt-3 overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]">
              {recipe.ingredients.map((ing, i) => (
                <li
                  key={`${ing.name}-${i}`}
                  className={`flex items-start gap-3 px-4 py-4 ${
                    i > 0 ? 'border-t border-cream-dark/70' : ''
                  }`}
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <span className="block text-base font-medium leading-snug text-green-dark">
                      {ing.name}
                    </span>
                    {ing.quantity && (
                      <span className="mt-0.5 block text-sm text-green-dark/50">
                        {ing.quantity}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* How to Make */}
          <section className="mt-8">
            <h2 className="recipe-section-label">How to Make</h2>
            <ol className="mt-3 space-y-3">
              {recipe.instructions.map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 rounded-2xl bg-white p-4 shadow-[var(--shadow-card)]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green text-base font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="min-w-0 flex-1 pt-1.5 text-base leading-relaxed text-green-dark">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      {/* Sticky actions */}
      <div
        className="recipe-detail-actions fixed bottom-0 left-0 right-0 z-40 border-t border-cream-dark/80 bg-white/96 backdrop-blur-lg"
        style={{ boxShadow: 'var(--shadow-nav)' }}
      >
        <div className="mx-auto w-full max-w-lg px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={handleSave}
              className={`card-lift flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-2xl border-2 py-3 text-[15px] font-semibold transition-all duration-200 ${
                saved
                  ? 'border-green bg-green/8 text-green'
                  : 'border-cream-dark bg-white text-green-dark'
              } ${savedPulse ? 'animate-save-pulse' : ''}`}
            >
              <HeartIcon filled={saved} />
              <span className="truncate">{saved ? 'Saved' : 'Save Meal'}</span>
            </button>
            <button
              type="button"
              onClick={handleAddToList}
              className="card-lift flex min-h-[52px] min-w-0 flex-[1.35] items-center justify-center gap-1.5 rounded-2xl bg-green px-2.5 py-3 text-sm font-semibold leading-tight text-white shadow-sm sm:px-3 sm:text-[15px]"
            >
              <PlusIcon />
              <span className="text-center">{addedToList ? 'Added!' : 'Add to Shopping List'}</span>
            </button>
          </div>
          <button
            type="button"
            onClick={handleAnotherMeal}
            className="mt-2.5 w-full rounded-xl bg-cream-dark/60 py-3 text-center text-[15px] font-semibold text-green-dark/70 transition-colors hover:bg-cream-dark active:scale-[0.99]"
          >
            Another Meal
          </button>
        </div>
      </div>
    </div>
  )
}

function MetaItem({
  icon,
  children,
}: {
  icon: 'time' | 'difficulty'
  children: React.ReactNode
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-base font-medium text-green-dark">
      {icon === 'time' ? (
        <svg className="h-[18px] w-[18px] text-green" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ) : (
        <svg className="h-[18px] w-[18px] text-green" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )}
      {children}
    </span>
  )
}

function HeartIcon({ filled }: { filled: boolean }) {
  if (filled) {
    return (
      <svg className="h-[18px] w-[18px] shrink-0 fill-green text-green" viewBox="0 0 24 24">
        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
      </svg>
    )
  }
  return (
    <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.063 9 12 9 12s9-4.938 9-12z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="h-[18px] w-[18px] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  )
}
