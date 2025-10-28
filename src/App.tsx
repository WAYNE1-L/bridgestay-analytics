import { RouterProvider } from 'react-router-dom'
import { useEffect } from 'react'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { initializeErrorLogger, reportWebVitals } from './lib/errorLogger'
import { preloadCriticalResources, preloadNonCriticalResources } from './lib/dynamicImports'
import './lib/i18n'
import { router } from './router'

export default function App() {
  // Initialize error logging
  useEffect(() => {
    initializeErrorLogger()
    
    // Set up web vitals reporting
    if ('web-vital' in window) {
      import('web-vitals').then((webVitals) => {
        if (webVitals.onCLS) webVitals.onCLS(reportWebVitals)
        if (webVitals.onFID) webVitals.onFID(reportWebVitals)
        if (webVitals.onFCP) webVitals.onFCP(reportWebVitals)
        if (webVitals.onLCP) webVitals.onLCP(reportWebVitals)
        if (webVitals.onTTFB) webVitals.onTTFB(reportWebVitals)
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
      <RouterProvider router={router} future={{ v7_startTransition: true, v7_relativeSplatPath: true }} />
    </ErrorBoundary>
  )
}