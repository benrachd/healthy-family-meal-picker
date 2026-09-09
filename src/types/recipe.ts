export type Category =
  | 'school-lunch'
  | 'school-snack'
  | 'breakfast'
  | 'family-dinner'
  | 'protein-snack'

export type PrepTime = 5 | 10 | 20 | 35

export type Difficulty = 'Easy' | 'Medium'

export interface Ingredient {
  name: string
  quantity?: string
}

export interface Recipe {
  id: string
  name: string
  category: Category
  prepTime: PrepTime
  difficulty: Difficulty
  tags: string[]
  ingredients: Ingredient[]
  instructions: string[]
  image: string
  proteinFriendly: boolean
  kidFriendly: boolean
  budgetFriendly: boolean
  makeAhead?: boolean
}

export interface ShoppingItem {
  id: string
  name: string
  quantity?: string
  checked: boolean
  recipeId?: string
}

export const CATEGORY_LABELS: Record<Category, string> = {
  'school-lunch': 'School Lunch',
  'school-snack': 'School Snack',
  breakfast: 'Breakfast',
  'family-dinner': 'Family Dinner',
  'protein-snack': 'High-Protein',
}

export const CATEGORY_SUBTITLES: Record<Category, string> = {
  'school-lunch': 'Easy lunchbox ideas',
  'school-snack': 'Quick kid-friendly snacks',
  breakfast: 'Easy morning favorites',
  'family-dinner': 'Simple weeknight meals',
  'protein-snack': 'Filling snack ideas',
}

export const CATEGORY_DESCRIPTIONS: Record<Category, string> = {
  'school-lunch': 'Easy ideas for busy school mornings.',
  'school-snack': 'Quick snacks kids actually enjoy.',
  breakfast: 'Start the day with something simple.',
  'family-dinner': 'Simple meals everyone will eat.',
  'protein-snack': 'Filling snacks to keep energy up.',
}

export const CATEGORY_ICONS: Record<Category, string> = {
  'school-lunch': '🍱',
  'school-snack': '🥕',
  breakfast: '🍳',
  'family-dinner': '🍽️',
  'protein-snack': '💪',
}

export const PREP_TIME_LABELS: Record<PrepTime, string> = {
  5: '5 min',
  10: '10 min',
  20: '20 min',
  35: '30+ min',
}
