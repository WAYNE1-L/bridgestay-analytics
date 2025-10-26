import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initSentry } from './observability/sentry'
import './index.css'
import './print.css'
import App from './App.tsx'

// Initialize Sentry before rendering
initSentry()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)