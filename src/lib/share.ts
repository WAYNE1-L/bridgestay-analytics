/**
 * Sharing utilities for ROI calculator data
 */

import type { RoiValues } from './schema'

export interface ShareableData {
  version: string
  timestamp: number
  data: RoiValues
  metadata?: {
    propertyName?: string
    description?: string
    tags?: string[]
  }
}

const CURRENT_VERSION = '1.0'

/**
 * Encode data to URL-safe base64
 */
function encodeData(data: ShareableData): string {
  try {
    const json = JSON.stringify(data)
    return btoa(json)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')
  } catch {
    throw new Error('Failed to encode data for sharing')
  }
}

/**
 * Decode URL-safe base64 to data
 */
function decodeData(encoded: string): ShareableData {
  try {
    // Add padding if needed
    const padded = encoded + '='.repeat((4 - encoded.length % 4) % 4)
    const base64 = padded.replace(/-/g, '+').replace(/_/g, '/')
    const json = atob(base64)
    const data = JSON.parse(json) as ShareableData
    
    // Validate version compatibility
    if (data.version !== CURRENT_VERSION) {
      console.warn(`Data version ${data.version} may not be compatible with current version ${CURRENT_VERSION}`)
    }
    
    return data
  } catch {
    throw new Error('Failed to decode shared data')
  }
}

/**
 * Create shareable data from ROI values
 */
export function createShareableData(
  data: RoiValues,
  metadata?: ShareableData['metadata']
): ShareableData {
  return {
    version: CURRENT_VERSION,
    timestamp: Date.now(),
    data,
    metadata,
  }
}

/**
 * Generate a shareable URL
 */
export function generateShareUrl(
  data: RoiValues,
  metadata?: ShareableData['metadata'],
  baseUrl?: string
): string {
  const shareableData = createShareableData(data, metadata)
  const encoded = encodeData(shareableData)
  
  const url = new URL(baseUrl || window.location.origin)
  url.pathname = '/roi'
  url.searchParams.set('share', encoded)
  
  return url.toString()
}

/**
 * Extract shared data from URL
 */
export function extractSharedDataFromUrl(url?: string): ShareableData | null {
  try {
    const targetUrl = url || window.location.href
    const urlObj = new URL(targetUrl)
    const encoded = urlObj.searchParams.get('share')
    
    if (!encoded) {
      return null
    }
    
    return decodeData(encoded)
  } catch (error) {
    console.error('Failed to extract shared data from URL:', error)
    return null
  }
}

/**
 * Copy share URL to clipboard
 */
export async function copyShareUrl(
  data: RoiValues,
  metadata?: ShareableData['metadata']
): Promise<void> {
  try {
    const url = generateShareUrl(data, metadata)
    await navigator.clipboard.writeText(url)
  } catch {
    throw new Error('Failed to copy URL to clipboard')
  }
}

/**
 * Share via Web Share API (mobile)
 */
export async function shareViaWebAPI(
  data: RoiValues,
  metadata?: ShareableData['metadata']
): Promise<void> {
  if (!navigator.share) {
    throw new Error('Web Share API not supported')
  }
  
  try {
    const url = generateShareUrl(data, metadata)
    await navigator.share({
      title: metadata?.propertyName || 'ROI Calculator Results',
      text: metadata?.description || 'Check out this property investment analysis',
      url,
    })
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      // User cancelled sharing
      return
    }
    throw new Error('Failed to share via Web Share API')
  }
}

/**
 * Export data as JSON file
 */
export function exportAsJson(
  data: RoiValues,
  metadata?: ShareableData['metadata'],
  filename?: string
): void {
  const shareableData = createShareableData(data, metadata)
  const json = JSON.stringify(shareableData, null, 2)
  
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename || `roi-calculator-${Date.now()}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}

/**
 * Import data from JSON file
 */
export function importFromJson(file: File): Promise<ShareableData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (event) => {
      try {
        const json = event.target?.result as string
        const data = JSON.parse(json) as ShareableData
        
        // Validate structure
        if (!data.version || !data.data || !data.timestamp) {
          throw new Error('Invalid file format')
        }
        
        resolve(data)
      } catch {
        reject(new Error('Failed to parse JSON file'))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'))
    }
    
    reader.readAsText(file)
  })
}

/**
 * Get share statistics (for analytics)
 */
export function trackShareEvent(
  method: 'url' | 'webapi' | 'json' | 'pdf',
  metadata?: ShareableData['metadata']
): void {
  // This would integrate with your analytics system
  if (process.env.NODE_ENV === 'development') {
    console.log('Share event:', { method, metadata })
  }
  
  // Example: Google Analytics
  // gtag('event', 'share', {
  //   method,
  //   content_type: 'roi_calculator',
  //   item_id: metadata?.propertyName || 'unknown',
  // })
}
