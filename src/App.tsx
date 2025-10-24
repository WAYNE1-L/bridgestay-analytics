import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { ErrorElement } from './components/ErrorElement'
import { initializeErrorLogger, reportWebVitals } from './lib/errorLogger'
import { preloadCriticalResources, preloadNonCriticalResources } from './lib/dynamicImports'
import './lib/i18n'

// Simple test layout
function SimpleLayout() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1>BridgeStay Analytics</h1>
        <nav style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
          <a href="/" style={{ textDecoration: 'none', color: '#007bff' }}>Home</a>
          <a href="/dashboard" style={{ textDecoration: 'none', color: '#007bff' }}>Dashboard</a>
          <a href="/roi" style={{ textDecoration: 'none', color: '#007bff' }}>ROI Calculator</a>
          <a href="/reports" style={{ textDecoration: 'none', color: '#007bff' }}>Reports</a>
        </nav>
      </header>
      <main>
        <h2>Welcome to BridgeStay Analytics</h2>
        <p>Real estate investment analysis and property evaluation tools.</p>
        <p>Version: 1.0.0</p>
      </main>
    </div>
  )
}

// Lazy load all pages
const HomePage = lazy(() => import('./pages/HomePage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const RoiPage = lazy(() => import('./pages/RoiPage'))
const ReportsPage = lazy(() => import('./pages/ReportsPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <SimpleLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading home...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<div>Loading dashboard...</div>}>
            <DashboardPage />
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'roi',
        element: (
          <Suspense fallback={<div>Loading calculator...</div>}>
            <RoiPage />
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'reports',
        element: (
          <Suspense fallback={<div>Loading reports...</div>}>
            <ReportsPage />
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFoundPage />
          </Suspense>
        ),
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