import { usePwaInstall } from '../hooks/usePwaInstall'

export function InstallAppButton() {
  const { canInstall, promptInstall } = usePwaInstall()

  if (!canInstall) return null

  return (
    <button
      type="button"
      onClick={() => void promptInstall()}
      className="card-lift mb-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-green/15 bg-white px-4 py-3 text-[15px] font-semibold text-green shadow-[var(--shadow-card)] transition-colors duration-200 hover:bg-cream active:bg-cream-dark/40"
    >
      <InstallIcon />
      Install App
    </button>
  )
}

function InstallIcon() {
  return (
    <svg
      className="h-[18px] w-[18px] shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
      />
    </svg>
  )
}
