import { useCallback, useEffect, useRef, useState } from 'react'
import type { BeforeInstallPromptEvent } from '../types/pwa'
import { isStandaloneMode } from '../types/pwa'

export function usePwaInstall() {
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null)
  const [canInstall, setCanInstall] = useState(false)

  useEffect(() => {
    if (isStandaloneMode()) return

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault()
      deferredPromptRef.current = event as BeforeInstallPromptEvent
      setCanInstall(true)
    }

    const handleAppInstalled = () => {
      deferredPromptRef.current = null
      setCanInstall(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const promptInstall = useCallback(async () => {
    const promptEvent = deferredPromptRef.current
    if (!promptEvent) return

    await promptEvent.prompt()
    await promptEvent.userChoice

    deferredPromptRef.current = null
    setCanInstall(false)
  }, [])

  return { canInstall, promptInstall }
}
