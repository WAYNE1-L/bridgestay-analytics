import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { AppLayout } from './components/layout/AppLayout'
import { Loading } from './components/ui/Loading'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { ErrorElement } from './components/ErrorElement'
import { initializeErrorLogger, reportWebVitals } from './lib/errorLogger'
import { preloadCriticalResources, preloadNonCriticalResources } from './lib/dynamicImports'
import './lib/i18n'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const RoiPage = lazy(() => import('./pages/RoiPage'))
const ReportsPage = lazy(() => import('./pages/ReportsPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<Loading message="Loading dashboard..." />}>
            <DashboardPage />
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'roi',
        element: (
          <Suspense fallback={<Loading message="Loading calculator..." />}>
            <RoiPage />
          </Suspense>
        ),
      },
      {
        path: 'report',
        element: (
          <Suspense fallback={<Loading message="Loading reports..." />}>
            <ReportsPage />
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
    ],
  },
])

export default function App() {
  // Initialize error logging
  useEffect(() => {
    initializeErrorLogger()
    
    // Set up web vitals reporting
    if ('web-vital' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportWebVitals)
        getFID(reportWebVitals)
        getFCP(reportWebVitals)
        getLCP(reportWebVitals)
        getTTFB(reportWebVitals)
      }).catch(() => {
        // web-vitals not available, skip
      })
    }

    // Preload critical resources after initial load
    const timer = setTimeout(() => {
      preloadCriticalResources()
    }, 2000)

    // Preload non-critical resources when user is idle
    const idleTimer = setTimeout(() => {
      preloadNonCriticalResources()
    }, 10000)

    return () => {
      clearTimeout(timer)
      clearTimeout(idleTimer)
    }
  }, [])

  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}