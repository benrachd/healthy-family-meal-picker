import { useCallback, useEffect, useState } from 'react'
import type { ShoppingItem } from '../types/recipe'
import type { Ingredient } from '../types/recipe'
import { loadShoppingList, saveShoppingList } from '../lib/storage'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>(() =>
    loadShoppingList<ShoppingItem>()
  )

  useEffect(() => {
    saveShoppingList(items)
  }, [items])

  const addIngredients = useCallback(
    (ingredients: Ingredient[], recipeId: string) => {
      const newItems: ShoppingItem[] = ingredients.map((ing) => ({
        id: generateId(),
        name: ing.name,
        quantity: ing.quantity,
        checked: false,
        recipeId,
      }))
      setItems((prev) => [...prev, ...newItems])
    },
    []
  )

  const toggleItem = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }, [])

  const clearCompleted = useCallback(() => {
    setItems((prev) => prev.filter((item) => !item.checked))
  }, [])

  const clearAll = useCallback(() => {
    setItems([])
  }, [])

  return { items, addIngredients, toggleItem, clearCompleted, clearAll }
}
