import { createBrowserRouter } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AppLayout } from './components/layout/AppLayout'
import { Loading } from './components/ui/Loading'
import { ErrorElement } from './components/ErrorElement'
import AppSkeleton from './components/AppSkeleton'

// Lazy load all pages
const HomePage = lazy(() => import('./pages/HomePage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const RoiPage = lazy(() => import('./pages/RoiPage'))
const ReportsPage = lazy(() => import('./pages/ReportsPage'))
const SubleasePage = lazy(() => import('./pages/SubleasePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<AppSkeleton />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<AppSkeleton />}>
            <DashboardPage />
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'roi',
        element: (
          <Suspense fallback={<AppSkeleton />}>
            <RoiPage />
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'reports',
        element: (
          <Suspense fallback={<AppSkeleton />}>
            <ReportsPage />
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: 'sublease',
        element: (
          <Suspense fallback={<AppSkeleton />}>
            <SubleasePage />
          </Suspense>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<AppSkeleton />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
])
