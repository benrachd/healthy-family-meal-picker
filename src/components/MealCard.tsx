import { Link } from 'react-router-dom'
import { RecipeImage } from './RecipeImage'
import type { Recipe } from '../types/recipe'
import { PREP_TIME_LABELS } from '../types/recipe'

interface MealCardProps {
  recipe: Recipe
  index?: number
  variant?: 'default' | 'compact'
}

export function MealCard({ recipe, index = 0, variant = 'default' }: MealCardProps) {
  const tags = recipe.tags.slice(0, 2)

  if (variant === 'compact') {
    return (
      <Link
        to={`/recipe/${recipe.id}`}
        className={`card-lift animate-fade-in stagger-${Math.min(index + 1, 5)} flex overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]`}
      >
        <div className="relative h-24 w-24 shrink-0">
          <RecipeImage
            src={recipe.image}
            alt={recipe.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-center px-3.5 py-2">
          <h3 className="line-clamp-2 text-sm font-semibold text-green-dark">{recipe.name}</h3>
          <p className="mt-0.5 text-xs text-green-dark/55">{PREP_TIME_LABELS[recipe.prepTime]}</p>
          {tags[0] && <span className="tag-pill mt-1 w-fit">{tags[0]}</span>}
        </div>
      </Link>
    )
  }

  return (
    <article
      className={`animate-fade-in stagger-${Math.min(index + 1, 5)} overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-card)]`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <RecipeImage
          src={recipe.image}
          alt={recipe.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-bold leading-snug text-green-dark">
          {recipe.name}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-green">
          {PREP_TIME_LABELS[recipe.prepTime]}
        </p>
        {tags.length > 0 && (
          <p className="mt-2 text-xs text-green-dark/60">
            {tags.join(' · ')}
          </p>
        )}
        <Link
          to={`/recipe/${recipe.id}`}
          className="card-lift mt-4 flex w-full items-center justify-center rounded-2xl bg-green py-3.5 text-sm font-semibold text-white shadow-sm"
        >
          View Recipe
        </Link>
      </div>
    </article>
  )
}
