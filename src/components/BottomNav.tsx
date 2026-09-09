import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/saved', label: 'Saved', icon: SavedIcon },
  { to: '/shopping', label: 'Shopping', icon: ShoppingIcon },
]

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-cream-dark/80 bg-white/95 backdrop-blur-md"
      style={{ boxShadow: 'var(--shadow-nav)' }}
    >
      <div className="mx-auto flex h-[58px] max-w-lg items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className="flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl transition-colors duration-200"
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-xl transition-colors ${
                    isActive ? 'bg-green/10' : ''
                  }`}
                >
                  <Icon active={isActive} />
                </span>
                <span
                  className={`text-[10px] font-semibold tracking-wide ${
                    isActive ? 'text-green' : 'text-green-dark/45'
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={`h-[18px] w-[18px] ${active ? 'text-green' : 'text-green-dark/45'}`}
      fill={active ? 'currentColor' : 'none'}
      viewBox="0 0 24 24"
      strokeWidth={active ? 0 : 1.75}
      stroke="currentColor"
    >
      {active ? (
        <path d="M11.47 3.841a1.5 1.5 0 011.06 0l8.69 4.345a1.5 1.5 0 01.78 1.317V19.5a1.5 1.5 0 01-1.5 1.5h-4.5a1.5 1.5 0 01-1.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-3a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5V9.503a1.5 1.5 0 01.78-1.317l8.69-4.345z" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      )}
    </svg>
  )
}

function SavedIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={`h-[18px] w-[18px] ${active ? 'text-green' : 'text-green-dark/45'}`}
      fill={active ? 'currentColor' : 'none'}
      viewBox="0 0 24 24"
      strokeWidth={active ? 0 : 1.75}
      stroke="currentColor"
    >
      {active ? (
        <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.653 1.383 2.653 2.897v11.964c0 .664-.505 1.223-1.17 1.266l-5.442.312a2.25 2.25 0 01-2.076-1.183l-.9-1.713a2.25 2.25 0 00-2.076-1.183H6.75c-1.036 0-1.875-.84-1.875-1.875V5.474c0-1.514 1.156-2.723 2.653-2.897z" clipRule="evenodd" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
      )}
    </svg>
  )
}

function ShoppingIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={`h-[18px] w-[18px] ${active ? 'text-green' : 'text-green-dark/45'}`}
      fill={active ? 'currentColor' : 'none'}
      viewBox="0 0 24 24"
      strokeWidth={active ? 0 : 1.75}
      stroke="currentColor"
    >
      {active ? (
        <path fillRule="evenodd" d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25z" clipRule="evenodd" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
      )}
    </svg>
  )
}
