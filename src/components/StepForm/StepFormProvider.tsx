import React, { createContext, useContext, useState, useCallback } from 'react'
import type { RoiValues } from '../../lib/schema'

export interface StepFormContextType {
  currentStep: number
  totalSteps: number
  data: Partial<RoiValues>
  errors: Record<string, string>
  isValid: boolean
  goToStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateData: (data: Partial<RoiValues>) => void
  setErrors: (errors: Record<string, string>) => void
  reset: () => void
}

const StepFormContext = createContext<StepFormContextType | null>(null)

export interface StepFormProviderProps {
  children: React.ReactNode
  totalSteps: number
  initialData?: Partial<RoiValues>
  onStepChange?: (step: number) => void
  onDataChange?: (data: Partial<RoiValues>) => void
}

export function StepFormProvider({
  children,
  totalSteps,
  initialData = {},
  onStepChange,
  onDataChange,
}: StepFormProviderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<Partial<RoiValues>>(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step)
      onStepChange?.(step)
    }
  }, [totalSteps, onStepChange])

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      const next = currentStep + 1
      setCurrentStep(next)
      onStepChange?.(next)
    }
  }, [currentStep, totalSteps, onStepChange])

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      const prev = currentStep - 1
      setCurrentStep(prev)
      onStepChange?.(prev)
    }
  }, [currentStep, onStepChange])

  const updateData = useCallback((newData: Partial<RoiValues>) => {
    setData(prev => {
      const updated = { ...prev, ...newData }
      onDataChange?.(updated)
      return updated
    })
  }, [onDataChange])

  const reset = useCallback(() => {
    setCurrentStep(0)
    setData(initialData)
    setErrors({})
  }, [initialData])

  const isValid = Object.keys(errors).length === 0

  const value: StepFormContextType = {
    currentStep,
    totalSteps,
    data,
    errors,
    isValid,
    goToStep,
    nextStep,
    prevStep,
    updateData,
    setErrors,
    reset,
  }

  return (
    <StepFormContext.Provider value={value}>
      {children}
    </StepFormContext.Provider>
  )
}

export function useStepForm(): StepFormContextType {
  const context = useContext(StepFormContext)
  if (!context) {
    throw new Error('useStepForm must be used within a StepFormProvider')
  }
  return context
}
