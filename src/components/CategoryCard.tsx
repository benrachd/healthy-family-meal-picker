import { Link } from 'react-router-dom'
import { CATEGORY_IMAGE_PATHS } from '../lib/images'
import { RecipeImage } from './RecipeImage'
import type { Category } from '../types/recipe'
import { CATEGORY_LABELS, CATEGORY_SUBTITLES } from '../types/recipe'

const featuredCategories = new Set<Category>(['school-lunch', 'school-snack'])

interface CategoryCardProps {
  category: Category
  index: number
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  const featured = featuredCategories.has(category)

  return (
    <Link
      to={`/time/${category}`}
      className={`card-lift animate-fade-in stagger-${Math.min(index + 1, 5)} group relative block overflow-hidden rounded-3xl bg-white shadow-[var(--shadow-card)]`}
    >
      <div className={`relative overflow-hidden ${featured ? 'aspect-[2/1]' : 'aspect-[5/3]'}`}>
        <RecipeImage
          src={CATEGORY_IMAGE_PATHS[category]}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-dark/80 via-green-dark/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="text-lg font-bold text-white leading-tight sm:text-xl">
            {CATEGORY_LABELS[category]}
          </h3>
          <p className="mt-1 text-sm text-white/80">
            {CATEGORY_SUBTITLES[category]}
          </p>
        </div>
      </div>
    </Link>
  )
}
