import { Link } from 'react-router-dom'
import { RecipeImage } from './RecipeImage'
import type { Recipe } from '../types/recipe'
import { PREP_TIME_LABELS } from '../types/recipe'

interface QuickPickCardProps {
  recipe: Recipe
}

export function QuickPickCard({ recipe }: QuickPickCardProps) {
  const tag = recipe.tags[0]

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="card-lift flex shrink-0 w-[260px] overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)]"
    >
      <div className="relative h-[100px] w-[100px] shrink-0">
        <RecipeImage
          src={recipe.image}
          alt={recipe.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center px-3.5 py-2.5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-green-dark">
          {recipe.name}
        </h3>
        <p className="mt-1 text-xs text-green-dark/55">
          {PREP_TIME_LABELS[recipe.prepTime]}
        </p>
        {tag && (
          <span className="tag-pill mt-1.5 w-fit">{tag}</span>
        )}
      </div>
    </Link>
  )
}
