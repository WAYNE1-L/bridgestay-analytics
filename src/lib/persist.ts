/**
 * LocalStorage persistence helpers for last-used inputs/outputs and saved scenarios
 */

type PersistName = 'roi' | 'sublease'

interface StoredData {
  inputs: any
  outputs: any
}

export interface SavedScenario {
  id: string
  name: string
  type: 'roi' | 'sublease'
  inputs: any
  outputs: any
  savedAt: string
}

/**
 * Save last used data to localStorage
 */
export function saveLast(name: PersistName, payload: { inputs: any; outputs: any }): void {
  try {
    const key = `bridge:last:${name}`
    localStorage.setItem(key, JSON.stringify(payload))
  } catch (error) {
    console.warn('Failed to save to localStorage:', error)
  }
}

/**
 * Load last used data from localStorage
 */
export function loadLast(name: PersistName): { inputs?: any; outputs?: any } | null {
  try {
    const key = `bridge:last:${name}`
    const stored = localStorage.getItem(key)
    if (!stored) return null
    
    const parsed = JSON.parse(stored)
    return parsed || null
  } catch (error) {
    console.warn('Failed to load from localStorage:', error)
    return null
  }
}

/**
 * Save a scenario to localStorage
 */
export function saveScenario(type: 'roi' | 'sublease', data: { inputs: any; outputs: any }): string {
  try {
    const key = `bridge:scenarios:${type}`
    const existing = listScenarios(type)
    
    const scenario: SavedScenario = {
      id: `scenario-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `Scenario ${existing.length + 1}`,
      type,
      inputs: data.inputs,
      outputs: data.outputs,
      savedAt: new Date().toISOString(),
    }
    
    const updated = [...existing, scenario]
    localStorage.setItem(key, JSON.stringify(updated))
    return scenario.id
  } catch (error) {
    console.warn('Failed to save scenario:', error)
    throw error
  }
}

/**
 * List all saved scenarios for a type
 */
export function listScenarios(type: 'roi' | 'sublease'): SavedScenario[] {
  try {
    const key = `bridge:scenarios:${type}`
    const stored = localStorage.getItem(key)
    if (!stored) return []
    
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.warn('Failed to load scenarios:', error)
    return []
  }
}

/**
 * Remove a scenario by ID
 */
export function removeScenario(id: string, type: 'roi' | 'sublease'): void {
  try {
    const key = `bridge:scenarios:${type}`
    const existing = listScenarios(type)
    const filtered = existing.filter(s => s.id !== id)
    localStorage.setItem(key, JSON.stringify(filtered))
  } catch (error) {
    console.warn('Failed to remove scenario:', error)
  }
}

/**
 * Get a scenario by ID
 */
export function getScenario(id: string, type: 'roi' | 'sublease'): SavedScenario | null {
  try {
    const scenarios = listScenarios(type)
    return scenarios.find(s => s.id === id) || null
  } catch (error) {
    console.warn('Failed to get scenario:', error)
    return null
  }
}

/**
 * Update scenario name
 */
export function updateScenarioName(id: string, type: 'roi' | 'sublease', newName: string): void {
  try {
    const key = `bridge:scenarios:${type}`
    const scenarios = listScenarios(type)
    const updated = scenarios.map(s => 
      s.id === id ? { ...s, name: newName } : s
    )
    localStorage.setItem(key, JSON.stringify(updated))
  } catch (error) {
    console.warn('Failed to update scenario name:', error)
  }
}

