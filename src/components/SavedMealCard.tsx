import { Link } from 'react-router-dom'
import { RecipeImage } from './RecipeImage'
import type { Recipe } from '../types/recipe'
import { PREP_TIME_LABELS } from '../types/recipe'

interface SavedMealCardProps {
  recipe: Recipe
}

export function SavedMealCard({ recipe }: SavedMealCardProps) {
  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="card-lift flex gap-3.5 overflow-hidden rounded-2xl bg-white p-3 shadow-[var(--shadow-card)]"
    >
      <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-xl">
        <RecipeImage
          src={recipe.image}
          alt={recipe.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
        <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug text-green-dark">
          {recipe.name}
        </h3>
        <p className="mt-1 text-sm text-green-dark/55">
          {PREP_TIME_LABELS[recipe.prepTime]}
        </p>
        {recipe.tags[0] && (
          <span className="tag-pill-accent mt-1.5 w-fit">{recipe.tags[0]}</span>
        )}
      </div>
    </Link>
  )
}
