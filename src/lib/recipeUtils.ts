import type { Category, PrepTime, Recipe } from '../types/recipe'
import { recipes } from '../data/recipes'

export function filterRecipesByCategoryAndTime(
  category: Category,
  prepTime: PrepTime
): Recipe[] {
  return recipes.filter((r) => r.category === category && r.prepTime === prepTime)
}

export function getRandomRecipes(
  pool: Recipe[],
  count: number,
  exclude: string[] = []
): Recipe[] {
  const available = pool.filter((r) => !exclude.includes(r.id))
  const shuffled = [...available].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}

export function searchRecipes(query: string): Recipe[] {
  const q = query.toLowerCase().trim()
  if (!q) return recipes
  return recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q)) ||
      r.ingredients.some((i) => i.name.toLowerCase().includes(q))
  )
}
