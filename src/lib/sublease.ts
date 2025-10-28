/**
 * Sublease to Airbnb calculation functions
 * These functions calculate profitability metrics for subleasing properties on Airbnb
 */

// Input types for sublease calculations
export interface SubleaseInput {
  nightlyRate: number
  occupancyRate: number // percentage (0-100)
  averageStayLength: number // nights
  rentPaidToLandlord: number // monthly
  utilitiesMonthly: number
  internetMonthly: number
  cleaningFeePerStay: number
  managementFeePercent: number // percentage (0-100)
  otherExpenses: number // monthly
  // === APPEND ONLY ===
  selfManaged?: boolean // default false
  airbnbFeePct?: number // default 3
  withholdingPct?: number // default 0
  cleaningCostPerStay?: number // default 0
}

// Result types for sublease calculations
export interface SubleaseResult {
  // Revenue
  monthlyBookings: number
  monthlyRevenue: number
  annualRevenue: number
  
  // Costs
  totalMonthlyCosts: number
  costPerStay: number
  totalAnnualCosts: number
  
  // Profit metrics
  netOperatingIncome: number // annual
  monthlyProfit: number
  annualProfit: number
  profitMarginPercent: number
  
  // Break-even analysis
  breakEvenNightlyRate: number
  breakEvenOccupancy: number
  
  // Efficiency metrics
  revenuePerNight: number
  costPerNight: number
  
  // === APPEND ONLY ===
  // Airbnb-specific metrics
  airbnbPlatformFee?: number // monthly platform fee
  takeHomeAfterPlatformFee?: number // monthly, before withholding
  takeHomeAfterWithholding?: number // monthly, after withholding
  withholdingAmount?: number // monthly tax withholding
}

/**
 * Calculate sublease profitability metrics
 */
export function calcSublease(input: SubleaseInput): SubleaseResult {
  const {
    nightlyRate,
    occupancyRate,
    averageStayLength,
    rentPaidToLandlord,
    utilitiesMonthly,
    internetMonthly,
    cleaningFeePerStay,
    managementFeePercent,
    otherExpenses,
  } = input

  // Number of bookings per month (assuming ~30 nights per month)
  const availableNightsPerMonth = 30
  const nightsBookedPerMonth = (availableNightsPerMonth * occupancyRate) / 100
  const bookingsPerMonth = nightsBookedPerMonth / averageStayLength
  
  // Revenue calculations
  const monthlyRevenue = bookingsPerMonth * (nightlyRate * averageStayLength + cleaningFeePerStay)
  const annualRevenue = monthlyRevenue * 12
  
  // Cost calculations
  const managementCostMonthly = monthlyRevenue * (managementFeePercent / 100)
  const totalMonthlyCosts = 
    rentPaidToLandlord + 
    utilitiesMonthly + 
    internetMonthly + 
    managementCostMonthly + 
    otherExpenses
  
  const costPerStay = totalMonthlyCosts / bookingsPerMonth + cleaningFeePerStay
  const totalAnnualCosts = totalMonthlyCosts * 12
  
  // Profit calculations
  const netOperatingIncome = annualRevenue - totalAnnualCosts
  const monthlyProfit = monthlyRevenue - totalMonthlyCosts
  const annualProfit = annualRevenue - totalAnnualCosts
  const profitMarginPercent = annualRevenue > 0 ? (annualProfit / annualRevenue) * 100 : 0
  
  // Break-even analysis
  // Break-even nightly rate: the minimum nightly rate needed to cover costs
  const breakEvenNightlyRate = nightsBookedPerMonth > 0
    ? (totalMonthlyCosts - cleaningFeePerStay * bookingsPerMonth) / nightsBookedPerMonth
    : totalMonthlyCosts
    
  // Break-even occupancy: the minimum occupancy % needed to cover costs at current rate
  // revenuePerBooking = nightlyRate * averageStayLength + cleaningFeePerStay
  // We need: revenuePerBooking * bookings >= totalMonthlyCosts
  // Where bookings = (30 * occupancy / 100) / averageStayLength
  const revenuePerBooking = nightlyRate * averageStayLength + cleaningFeePerStay
  const breakEvenOccupancy = revenuePerBooking > 0
    ? (totalMonthlyCosts * averageStayLength) / (revenuePerBooking * 30) * 100
    : 0
  
  // Efficiency metrics
  const revenuePerNight = nightsBookedPerMonth > 0 ? monthlyRevenue / nightsBookedPerMonth : 0
  const costPerNight = nightsBookedPerMonth > 0 ? totalMonthlyCosts / nightsBookedPerMonth : 0

  // === APPEND ONLY ===
  // Handle Airbnb-specific settings with defaults
  const selfManaged = input.selfManaged ?? false
  const airbnbFeePct = input.airbnbFeePct ?? 3
  const withholdingPct = input.withholdingPct ?? 0
  const cleaningCostPerStay = input.cleaningCostPerStay ?? 0
  
  // Calculate actual management cost (0 if self-managed)
  const actualManagementCost = selfManaged ? 0 : managementCostMonthly
  
  // Calculate cleaning cost paid by owner per stay (0 if self-managed)
  const actualCleaningCost = selfManaged ? 0 : cleaningCostPerStay
  
  // Total cleaning costs paid by owner per month
  const totalCleaningCostsMonthly = actualCleaningCost * bookingsPerMonth
  
  // Recalculate total monthly costs with actual management cost
  const totalMonthlyCostsWithActual = 
    rentPaidToLandlord + 
    utilitiesMonthly + 
    internetMonthly + 
    actualManagementCost + 
    otherExpenses
  
  // Calculate Airbnb platform fee (3% of gross revenue)
  const airbnbPlatformFee = monthlyRevenue * (airbnbFeePct / 100)
  
  // Calculate take-home after platform fee but before withholding
  const takeHomeAfterPlatformFee = monthlyRevenue - airbnbPlatformFee - totalMonthlyCostsWithActual - totalCleaningCostsMonthly
  
  // Calculate withholding amount (from take-home after platform fee and costs)
  const withholdingAmount = takeHomeAfterPlatformFee * (withholdingPct / 100)
  
  // Calculate take-home after withholding
  const takeHomeAfterWithholding = takeHomeAfterPlatformFee - withholdingAmount
  
  // Update costs based on self-managed toggle and cleaning costs
  const actualTotalMonthlyCosts = totalMonthlyCostsWithActual + totalCleaningCostsMonthly
  const actualCostPerStay = bookingsPerMonth > 0 ? actualTotalMonthlyCosts / bookingsPerMonth : 0
  
  // Calculate actual profit (after platform fee, with updated costs)
  const actualMonthlyProfit = monthlyRevenue - airbnbPlatformFee - actualTotalMonthlyCosts
  
  return {
    // Revenue
    monthlyBookings: bookingsPerMonth,
    monthlyRevenue,
    annualRevenue,
    
    // Costs - use updated costs when self-managed or cleaning costs are specified
    totalMonthlyCosts: actualTotalMonthlyCosts,
    costPerStay: actualCostPerStay,
    totalAnnualCosts: actualTotalMonthlyCosts * 12,
    
    // Profit metrics - use updated profit calculation
    netOperatingIncome: actualMonthlyProfit * 12,
    monthlyProfit: actualMonthlyProfit,
    annualProfit: actualMonthlyProfit * 12,
    profitMarginPercent: monthlyRevenue > 0 ? (actualMonthlyProfit / monthlyRevenue) * 100 : 0,
    
    // Break-even analysis
    breakEvenNightlyRate,
    breakEvenOccupancy,
    
    // Efficiency metrics
    revenuePerNight,
    costPerNight,
    
    // === APPEND ONLY ===
    // Airbnb-specific metrics
    airbnbPlatformFee,
    takeHomeAfterPlatformFee,
    takeHomeAfterWithholding,
    withholdingAmount,
  }
}

/**
 * Validate input parameters
 */
export function validateSubleaseInput(input: SubleaseInput): { valid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (input.nightlyRate < 0) errors.push('Nightly rate must be non-negative')
  if (input.occupancyRate < 0 || input.occupancyRate > 100) errors.push('Occupancy rate must be between 0 and 100%')
  if (input.averageStayLength <= 0) errors.push('Average stay length must be greater than 0')
  if (input.rentPaidToLandlord < 0) errors.push('Rent paid to landlord must be non-negative')
  if (input.utilitiesMonthly < 0) errors.push('Monthly utilities must be non-negative')
  if (input.internetMonthly < 0) errors.push('Monthly internet must be non-negative')
  if (input.cleaningFeePerStay < 0) errors.push('Cleaning fee must be non-negative')
  if (input.managementFeePercent < 0 || input.managementFeePercent > 100) errors.push('Management fee must be between 0 and 100%')
  if (input.otherExpenses < 0) errors.push('Other expenses must be non-negative')
  
  return {
    valid: errors.length === 0,
    errors
  }
}

