import { z } from 'zod'

/**
 * Comprehensive ROI calculation schema with defaults and validation
 */
export const RoiSchema = z.object({
  // Property Information
  purchasePrice: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const num = typeof val === 'string' ? parseFloat(val.replace(/,/g, '')) : val
      return isNaN(num) ? 0 : num
    })
    .pipe(z.number().min(1, 'Purchase price must be greater than $0'))
    .default(300000),

  // Financing
  downPct: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const str = String(val).trim()
      const num = str.endsWith('%') ? parseFloat(str.slice(0, -1)) : parseFloat(str)
      return isNaN(num) ? 0 : num / 100
    })
    .pipe(z.number().min(0, 'Down payment must be 0% or greater').max(1, 'Down payment cannot exceed 100%'))
    .default(0.2),

  interestPct: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const str = String(val).trim()
      const num = str.endsWith('%') ? parseFloat(str.slice(0, -1)) : parseFloat(str)
      return isNaN(num) ? 0 : num / 100
    })
    .pipe(z.number().min(0, 'Interest rate must be 0% or greater').max(0.5, 'Interest rate cannot exceed 50%'))
    .default(0.065),

  years: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const num = typeof val === 'string' ? parseFloat(val) : val
      return isNaN(num) ? 0 : num
    })
    .pipe(z.number().min(1, 'Loan term must be at least 1 year').max(50, 'Loan term cannot exceed 50 years'))
    .default(30),

  // Income
  rentMonthly: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const num = typeof val === 'string' ? parseFloat(val.replace(/,/g, '')) : val
      return isNaN(num) ? 0 : num
    })
    .pipe(z.number().min(0, 'Monthly rent must be $0 or greater'))
    .default(2400),

  // Operating Expenses
  expensesMonthly: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const num = typeof val === 'string' ? parseFloat(val.replace(/,/g, '')) : val
      return isNaN(num) ? 0 : num
    })
    .pipe(z.number().min(0, 'Monthly expenses must be $0 or greater'))
    .default(800),

  taxPct: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const str = String(val).trim()
      const num = str.endsWith('%') ? parseFloat(str.slice(0, -1)) : parseFloat(str)
      return isNaN(num) ? 0 : num / 100
    })
    .pipe(z.number().min(0, 'Property tax rate must be 0% or greater').max(0.1, 'Property tax rate cannot exceed 10%'))
    .default(0.012),

  insuranceMonthly: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const num = typeof val === 'string' ? parseFloat(val.replace(/,/g, '')) : val
      return isNaN(num) ? 0 : num
    })
    .pipe(z.number().min(0, 'Monthly insurance must be $0 or greater'))
    .default(150),

  hoaMonthly: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const num = typeof val === 'string' ? parseFloat(val.replace(/,/g, '')) : val
      return isNaN(num) ? 0 : num
    })
    .pipe(z.number().min(0, 'Monthly HOA must be $0 or greater'))
    .default(0),

  // Management & Maintenance
  mgmtPct: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const str = String(val).trim()
      const num = str.endsWith('%') ? parseFloat(str.slice(0, -1)) : parseFloat(str)
      return isNaN(num) ? 0 : num / 100
    })
    .pipe(z.number().min(0, 'Management fee must be 0% or greater').max(0.2, 'Management fee cannot exceed 20%'))
    .default(0.08),

  maintPct: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const str = String(val).trim()
      const num = str.endsWith('%') ? parseFloat(str.slice(0, -1)) : parseFloat(str)
      return isNaN(num) ? 0 : num / 100
    })
    .pipe(z.number().min(0, 'Maintenance percentage must be 0% or greater').max(0.2, 'Maintenance percentage cannot exceed 20%'))
    .default(0.05),

  vacancyPct: z
    .union([z.string(), z.number()])
    .transform((val) => {
      const str = String(val).trim()
      const num = str.endsWith('%') ? parseFloat(str.slice(0, -1)) : parseFloat(str)
      return isNaN(num) ? 0 : num / 100
    })
    .pipe(z.number().min(0, 'Vacancy rate must be 0% or greater').max(0.5, 'Vacancy rate cannot exceed 50%'))
    .default(0.05),
})

export type RoiInputs = z.input<typeof RoiSchema>
export type RoiValues = z.output<typeof RoiSchema>

/**
 * Validation result with structured error handling
 */
export interface ValidationResult {
  success: boolean
  data?: RoiValues
  errors?: Record<string, string>
  fieldErrors?: Record<keyof RoiValues, string>
}

/**
 * Validate ROI inputs with comprehensive error handling
 */
export function validateRoiInputs(inputs: Partial<RoiInputs>): ValidationResult {
  try {
    const result = RoiSchema.safeParse(inputs)
    
    if (result.success) {
      return {
        success: true,
        data: result.data,
      }
    }

    // Extract field-specific errors
    const fieldErrors: Record<string, string> = {}
    const generalErrors: Record<string, string> = {}
    
    const issues = result.error?.issues || []
    issues.forEach((issue) => {
      const field = issue.path?.[0] as string || 'general'
      const message = issue.message || 'Invalid value'
      
      if (field === 'general') {
        generalErrors[issue.code || 'unknown'] = message
      } else {
        fieldErrors[field] = message
      }
    })

    return {
      success: false,
      errors: generalErrors,
      fieldErrors,
    }
  } catch (error) {
    return {
      success: false,
      errors: {
        general: 'An unexpected validation error occurred',
      },
    }
  }
}

/**
 * Get default ROI inputs
 */
export function getDefaultRoiInputs(): RoiValues {
  return RoiSchema.parse({})
}

/**
 * Create sample property data for testing
 */
export function getSampleProperty(): RoiValues {
  return RoiSchema.parse({
    purchasePrice: 450000,
    downPct: '25%',
    interestPct: '6.8%',
    years: 30,
    rentMonthly: 3200,
    expensesMonthly: 1200,
    taxPct: '1.4%',
    insuranceMonthly: 180,
    hoaMonthly: 200,
    mgmtPct: '10%',
    maintPct: '8%',
    vacancyPct: '5%',
  })
}
