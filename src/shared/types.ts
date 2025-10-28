/**
 * Shared types across the application
 */

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  uploadedAt: Date
}

export interface ValidationError {
  field: string
  message: string
}

export interface ChartDataPoint {
  x: string | number
  y: number
  label?: string
}

export interface Theme {
  mode: 'light' | 'dark' | 'auto'
}

export interface FeatureFlag {
  name: string
  enabled: boolean
  description?: string
}

// === APPEND ONLY ===
export interface AirbnbCalcSettings {
  selfManaged?: boolean;        // default false
  airbnbFeePct?: number;        // default 3
  withholdingPct?: number;      // default 0
  cleaningCostPerStay?: number; // default 0
}
