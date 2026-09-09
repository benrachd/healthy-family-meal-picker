import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { BottomNav } from './BottomNav'
import { OfflineIndicator } from './OfflineIndicator'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation()
  const isRecipePage = pathname.startsWith('/recipe/')
  const showNav = !isRecipePage

  return (
    <div className="flex min-h-dvh flex-col">
      <OfflineIndicator />
      <main
        className={`flex-1 page-enter ${showNav ? 'pb-[calc(58px+env(safe-area-inset-bottom))]' : ''}`}
      >
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  )
}
