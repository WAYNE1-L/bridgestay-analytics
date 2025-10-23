import { Outlet, Link, useLocation } from 'react-router-dom'
import { Home, BarChart3, Calculator, FileText } from 'lucide-react'
import { NavItem } from '../../types'
import { ThemeToggle } from '../ui/ThemeToggle'

const navigation: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
  { name: 'ROI Calculator', href: '/roi', icon: Calculator },
  { name: 'Reports', href: '/report', icon: FileText },
]

export function AppLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-background">
      {/* Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Skip to main content
      </a>
      
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link 
              to="/" 
              className="mr-6 flex items-center space-x-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md"
            >
              <div className="h-6 w-6 rounded bg-primary" />
              <span className="hidden font-bold sm:inline-block">
                BridgeStay Analytics
              </span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 transition-colors hover:text-foreground/80 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md px-2 py-1 ${
                    isActive ? 'text-foreground' : 'text-foreground/60'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main id="main-content" className="container mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}
