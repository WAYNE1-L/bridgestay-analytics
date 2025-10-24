import { Outlet, NavLink } from 'react-router-dom'
import { Home, BarChart3, Calculator, FileText } from 'lucide-react'
import { NavItem } from '../../types'
import { ThemeToggle } from '../ui/ThemeToggle'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { FooterVersion } from '../VersionDisplay'
import { useTranslation } from 'react-i18next'

export function AppLayout() {
  const { t } = useTranslation()

  const navigation: NavItem[] = [
    { name: t('nav.home'), href: '/', icon: Home },
    { name: t('nav.dashboard'), href: '/dashboard', icon: BarChart3 },
    { name: t('nav.calculator'), href: '/roi', icon: Calculator },
    { name: t('nav.reports'), href: '/reports', icon: FileText },
  ]

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
            <NavLink 
              to="/" 
              className="mr-6 flex items-center space-x-2 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md"
            >
              <div className="h-6 w-6 rounded bg-primary" />
              <span className="hidden font-bold sm:inline-block">
                BridgeStay Analytics
              </span>
            </NavLink>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => 
                    `flex items-center gap-2 transition-colors hover:text-foreground/80 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md px-2 py-1 ${
                      isActive ? 'text-foreground' : 'text-foreground/60'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </NavLink>
              )
            })}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>
      
      <main id="main-content" className="container mx-auto max-w-6xl px-6 py-10">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-6xl px-6 py-6">
          <FooterVersion />
        </div>
      </footer>
    </div>
  )
}
