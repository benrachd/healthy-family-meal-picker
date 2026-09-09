import type { Category } from '../types/recipe'

/** Local recipe image paths — resolved from public/images/recipes/ */
export const RECIPE_IMAGE_PATHS: Record<string, string> = {
  salad: '/images/recipes/salad.jpg',
  bowl: '/images/recipes/bowl.jpg',
  sandwich: '/images/recipes/sandwich.jpg',
  breakfast: '/images/recipes/breakfast.jpg',
  dinner: '/images/recipes/dinner.jpg',
  wrap: '/images/recipes/wrap.jpg',
  pasta: '/images/recipes/pasta.jpg',
  chicken: '/images/recipes/chicken.jpg',
  snack: '/images/recipes/snack.jpg',
  yogurt: '/images/recipes/yogurt.jpg',
  eggs: '/images/recipes/eggs.jpg',
  stirfry: '/images/recipes/stirfry.jpg',
  tacos: '/images/recipes/tacos.jpg',
  oats: '/images/recipes/oats.jpg',
  fish: '/images/recipes/fish.jpg',
  rice: '/images/recipes/rice.jpg',
  veggies: '/images/recipes/veggies.jpg',
  protein: '/images/recipes/protein.jpg',
  burrito: '/images/recipes/burrito.jpg',
  skillet: '/images/recipes/skillet.jpg',
}

export const CATEGORY_IMAGE_PATHS: Record<Category, string> = {
  'school-lunch': '/images/categories/school-lunch.jpg',
  'school-snack': '/images/categories/school-snack.jpg',
  breakfast: '/images/categories/breakfast.jpg',
  'family-dinner': '/images/categories/family-dinner.jpg',
  'protein-snack': '/images/categories/protein-snack.jpg',
}

export const PLACEHOLDER_IMAGE = '/images/placeholder.svg'

/** Prefix Vite base path for GitHub Pages subdirectory deployment. */
export function assetPath(path: string): string {
  if (path.startsWith('http')) return path
  const base = import.meta.env.BASE_URL
  if (path.startsWith('/')) return `${base}${path.slice(1)}`
  return `${base}${path}`
}

/** Resolve a recipe image URL (local path or legacy remote) to a display src. */
export function resolveRecipeImage(src: string): string {
  if (src.startsWith('http')) return src
  if (src.startsWith('/images/')) return assetPath(src)
  const key = Object.entries(RECIPE_IMAGE_PATHS).find(([, path]) => path === src)?.[0]
  if (key) return assetPath(RECIPE_IMAGE_PATHS[key])
  return assetPath(PLACEHOLDER_IMAGE)
}
