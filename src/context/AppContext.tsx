import { createContext, useContext, type ReactNode } from 'react'
import { useSavedMeals } from '../hooks/useSavedMeals'
import { useShoppingList } from '../hooks/useShoppingList'

type AppContextValue = ReturnType<typeof useSavedMeals> &
  ReturnType<typeof useShoppingList>

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const savedMeals = useSavedMeals()
  const shoppingList = useShoppingList()

  return (
    <AppContext.Provider value={{ ...savedMeals, ...shoppingList }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
