import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/auth'
import { AuthForm } from './components/AuthForm'
import { SubscriptionPlans } from './components/SubscriptionPlans'
import { PropertyCalculator } from './components/PropertyCalculator'
import { Dashboard } from './components/Dashboard'
import { useState } from 'react'

function App() {
  const { user, loading } = useAuthStore()
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'reset'>('signin')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm mode={authMode} onModeChange={setAuthMode} />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calculator" element={<PropertyCalculator />} />
          <Route path="/pricing" element={<SubscriptionPlans />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App