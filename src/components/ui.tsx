import { Link, useNavigate } from 'react-router-dom'

interface BackButtonProps {
  to?: string
  label?: string
  preferHistory?: boolean
  overlay?: boolean
}

export function BackButton({
  to = '/',
  label = 'Back',
  preferHistory = false,
  overlay = false,
}: BackButtonProps) {
  const navigate = useNavigate()

  const baseClass = overlay
    ? 'inline-flex items-center gap-1.5 rounded-full bg-green-dark/50 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-green-dark/65'
    : 'inline-flex items-center gap-1.5 text-sm font-medium text-green-dark/65 transition-colors hover:text-green'

  if (preferHistory) {
    return (
      <button type="button" onClick={() => navigate(-1)} className={baseClass}>
        <BackArrow />
        {label}
      </button>
    )
  }

  return (
    <Link to={to} className={baseClass}>
      <BackArrow />
      {label}
    </Link>
  )
}

function BackArrow() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  )
}

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'text'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const variants = {
    primary: 'bg-green text-white shadow-sm hover:bg-green-light active:bg-green-dark',
    secondary: 'bg-white text-green-dark border border-cream-dark hover:bg-cream',
    accent: 'bg-orange text-white shadow-sm hover:bg-coral',
    ghost: 'bg-cream-dark/60 text-green-dark hover:bg-cream-dark',
    text: 'bg-transparent text-green font-semibold hover:text-green-light underline-offset-2 hover:underline',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`card-lift w-full rounded-2xl px-4 py-3.5 text-[15px] font-semibold transition-colors duration-200 disabled:opacity-40 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export function PageHeader({
  title,
  subtitle,
  className = '',
}: {
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <header className={`mb-6 ${className}`}>
      <h1 className="text-2xl font-bold tracking-tight text-green-dark">{title}</h1>
      {subtitle && (
        <p className="mt-1 text-[15px] text-green-dark/55">{subtitle}</p>
      )}
    </header>
  )
}

export function SectionHeading({
  title,
  subtitle,
}: {
  title: string
  subtitle?: string
}) {
  return (
    <div className="mb-3.5">
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  )
}
