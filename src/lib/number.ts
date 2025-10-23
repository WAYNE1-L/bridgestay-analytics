/**
 * Robust number parsing and formatting utilities
 */

/**
 * Parse a string to a number, handling common formats
 * @param str - Input string (e.g., "1,234.56", "1234.56", "1,234")
 * @returns Parsed number or null if invalid
 */
export function parseNumber(str: string): number | null {
  if (typeof str !== 'string') return null
  
  // Trim whitespace
  const trimmed = str.trim()
  if (trimmed === '') return null
  
  // Remove commas and parse
  const cleaned = trimmed.replace(/,/g, '')
  const parsed = Number(cleaned)
  
  // Check if valid number
  if (isNaN(parsed) || !isFinite(parsed)) return null
  
  return parsed
}

/**
 * Clamp a number between min and max values
 * @param n - Number to clamp
 * @param min - Minimum value
 * @param max - Maximum value
 * @returns Clamped number
 */
export function clamp(n: number, min: number, max: number): number {
  if (n < min) return min
  if (n > max) return max
  return n
}

/**
 * Format a number as a percentage with 2 decimal places
 * @param n - Number to format (e.g., 0.065 -> "6.50%")
 * @returns Formatted percentage string
 */
export function formatPercent(n: number): string {
  if (typeof n !== 'number' || isNaN(n) || !isFinite(n)) return '0.00%'
  return `${(n * 100).toFixed(2)}%`
}

/**
 * Format a number with thousand separators
 * @param n - Number to format
 * @param decimals - Number of decimal places (default 0)
 * @returns Formatted number string
 */
export function formatNumber(n: number, decimals: number = 0): string {
  if (typeof n !== 'number' || isNaN(n) || !isFinite(n)) return '0'
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n)
}

/**
 * Check if a string contains only valid numeric characters
 * @param str - String to validate
 * @returns True if string contains only digits, dots, commas, and minus sign
 */
export function isValidNumericString(str: string): boolean {
  return /^[0-9,.-]*$/.test(str)
}

/**
 * Remove all non-numeric characters except dots and commas
 * @param str - Input string
 * @returns Cleaned string with only numeric characters
 */
export function cleanNumericString(str: string): string {
  return str.replace(/[^0-9,.-]/g, '')
}

/**
 * Convert any value to a number, returning 0 for invalid values
 * @param value - Value to convert
 * @returns Number or 0 if invalid
 */
export function toNum(value: unknown): number {
  if (value == null) return 0
  const parsed = parseNumber(String(value))
  return parsed ?? 0
}

/**
 * Convert any value to a percentage (0-1 range), handling both decimal and percentage formats
 * @param value - Value to convert
 * @returns Number between 0 and 1
 */
export function toPct(value: unknown): number {
  if (value == null) return 0
  const str = String(value).trim()
  
  // Handle percentage format (e.g., "20%" -> 0.2)
  if (str.endsWith('%')) {
    const num = parseNumber(str.slice(0, -1))
    return num ? num / 100 : 0
  }
  
  // Handle decimal format
  const parsed = parseNumber(str)
  if (parsed === null) return 0
  
  // If the number is > 1, assume it's a percentage (e.g., 20 -> 0.2)
  return parsed > 1 ? parsed / 100 : parsed
}