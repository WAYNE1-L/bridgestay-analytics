import { z } from 'zod'
import { toNum, toPct } from './number'

export const RoiSchema = z.object({
  purchasePrice: z.any().transform(toNum).pipe(z.number().min(0)),
  downPct: z.any().transform(toPct).pipe(z.number().min(0).max(1)),
  rentMonthly: z.any().transform(toNum).pipe(z.number().min(0)),
  expensesMonthly: z.any().transform(toNum).pipe(z.number().min(0)),
  interestPct: z.any().transform(toPct).pipe(z.number().min(0).max(1)),
  years: z.any().transform(toNum).pipe(z.number().min(0)),
  taxPct: z.any().transform(toPct).pipe(z.number().min(0).max(1)),
  insuranceMonthly: z.any().transform(toNum).pipe(z.number().min(0)),
  hoaMonthly: z.any().transform(toNum).pipe(z.number().min(0)),
  mgmtPct: z.any().transform(toPct).pipe(z.number().min(0).max(1)),
  maintPct: z.any().transform(toPct).pipe(z.number().min(0).max(1)),
  vacancyPct: z.any().transform(toPct).pipe(z.number().min(0).max(1)),
})

export type RoiValues = z.output<typeof RoiSchema>

export const validate = (i: unknown) => {
  const r = RoiSchema.safeParse(i ?? {})
  if (!r.success) {
    const e: Record<string, string> = {}
    // Null-safe forEach with guard - prevent "Cannot read properties of undefined"
    const issues = r.error?.issues || []
    if (Array.isArray(issues)) {
      issues.forEach(x => {
        const key = x.path?.join('.') || 'unknown'
        e[key] = x.message || 'Invalid value'
      })
    }
    return { ok: false, errors: e as Record<string, string> }
  }
  return { ok: true, values: r.data as RoiValues, errors: {} as Record<string, string> }
}

// Legacy aliases for backward compatibility
export const validateRoiInputs = validate
export type RoiInputs = RoiValues
