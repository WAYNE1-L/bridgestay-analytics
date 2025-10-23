import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AppLayout } from './components/layout/AppLayout'
import { Loading } from './components/ui/Loading'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { ErrorElement } from './components/ErrorElement'

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
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  )
}