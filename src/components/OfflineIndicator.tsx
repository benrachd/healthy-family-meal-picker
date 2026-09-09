import { useOnlineStatus } from '../hooks/useOnlineStatus'

export function OfflineIndicator() {
  const isOnline = useOnlineStatus()

  if (isOnline) return null

  return (
    <div
      className="pointer-events-none fixed left-1/2 top-[max(0.5rem,env(safe-area-inset-top))] z-50 -translate-x-1/2 rounded-full bg-green-dark/88 px-3.5 py-1.5 text-[11px] font-medium text-white/95 shadow-md backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      Offline · Your meals still work
    </div>
  )
}
