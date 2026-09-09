const SAVED_MEALS_KEY = 'hfmp_saved_meals'
const SHOPPING_LIST_KEY = 'hfmp_shopping_list'

export function loadSavedMealIds(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_MEALS_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

export function saveSavedMealIds(ids: string[]): void {
  localStorage.setItem(SAVED_MEALS_KEY, JSON.stringify(ids))
}

export function loadShoppingList<T>(): T[] {
  try {
    const raw = localStorage.getItem(SHOPPING_LIST_KEY)
    return raw ? (JSON.parse(raw) as T[]) : []
  } catch {
    return []
  }
}

export function saveShoppingList<T>(items: T[]): void {
  localStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(items))
}
