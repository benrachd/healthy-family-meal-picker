import { useCallback, useEffect, useState } from 'react'
import { loadSavedMealIds, saveSavedMealIds } from '../lib/storage'

export function useSavedMeals() {
  const [savedIds, setSavedIds] = useState<string[]>(() => loadSavedMealIds())

  useEffect(() => {
    saveSavedMealIds(savedIds)
  }, [savedIds])

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  )

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }, [])

  const removeSaved = useCallback((id: string) => {
    setSavedIds((prev) => prev.filter((x) => x !== id))
  }, [])

  return { savedIds, isSaved, toggleSaved, removeSaved }
}
