/**
 * PDF export utility using jsPDF and html2canvas
 */

import jsPDF from 'jspdf'
import html2canvas from 'html2canvas-pro'

interface PDFExportOptions {
  title: string
  type: 'roi' | 'sublease'
  inputs: any
  outputs: any
  coverImage?: string
}

export async function exportToPDF(options: PDFExportOptions): Promise<void> {
  const { title, inputs, outputs, coverImage } = options
  const doc = new jsPDF('portrait', 'mm', 'a4')
  
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 12
  const contentWidth = pageWidth - (margin * 2)
  
  let currentY = margin

  // Helper to add new page
  const addPage = () => {
    doc.addPage()
    currentY = margin
  }

  // Helper to check if need new page
  const checkPageBreak = (requiredHeight: number) => {
    if (currentY + requiredHeight > pageHeight - margin) {
      addPage()
    }
  }

  // Page 1: Cover
  doc.setFillColor(59, 130, 246) // Blue
  doc.rect(0, 0, pageWidth, 60, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(24)
  doc.text(title, margin, 30)
  
  doc.setFontSize(12)
  doc.text('BridgeStay Analytics', margin, 40)
  
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(10)
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  doc.text(`Report Generated: ${date}`, margin, 50)
  
  currentY = 70

  // Inputs Section
  checkPageBreak(30)
  doc.setFontSize(14)
  doc.setTextColor(59, 130, 246)
  doc.text('Input Parameters', margin, currentY)
  currentY += 8
  
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  
  const inputFields = Object.entries(inputs || {})
  inputFields.slice(0, 15).forEach(([key, value]) => {
    checkPageBreak(7)
    const label = formatFieldName(key)
    const val = formatValue(value)
    doc.text(`${label}: ${val}`, margin + 5, currentY)
    currentY += 6
  })

  // Key Metrics Section
  checkPageBreak(40)
  currentY += 5
  doc.setFontSize(14)
  doc.setTextColor(59, 130, 246)
  doc.text('Key Metrics', margin, currentY)
  currentY += 8

  // Extract key metrics based on type
  const metrics = extractMetrics(outputs, options.type)
  metrics.forEach(metric => {
    checkPageBreak(7)
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text(`${metric.label}: ${metric.value}`, margin + 5, currentY)
    currentY += 6
  })

  // Summary Section
  checkPageBreak(30)
  currentY += 5
  doc.setFontSize(14)
  doc.setTextColor(59, 130, 246)
  doc.text('Summary', margin, currentY)
  currentY += 8
  
  checkPageBreak(20)
  doc.setFontSize(10)
  doc.setTextColor(0, 0, 0)
  const summary = generateSummary(outputs, options.type)
  doc.text(summary, margin + 5, currentY, { maxWidth: contentWidth - 10 })

  // Add page numbers
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(128, 128, 128)
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 20, pageHeight - margin)
  }

  // Save PDF
  doc.save(`${title.replace(/\s+/g, '_')}_${Date.now()}.pdf`)
}

function formatFieldName(key: string): string {
  // Convert camelCase to Title Case
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

function formatValue(value: any): string {
  if (typeof value === 'number') {
    if (value >= 1000) {
      return `$${value.toLocaleString()}`
    } else if (value > 0 && value < 1) {
      return `${(value * 100).toFixed(1)}%`
    }
    return value.toString()
  }
  return String(value)
}

function extractMetrics(outputs: any, type: 'roi' | 'sublease'): Array<{ label: string; value: string }> {
  const metrics: Array<{ label: string; value: string }> = []
  
  if (type === 'roi') {
    if (outputs.coc !== undefined) metrics.push({ label: 'ROI', value: `${(outputs.coc * 100).toFixed(2)}%` })
    if (outputs.capRate !== undefined) metrics.push({ label: 'Cap Rate', value: `${(outputs.capRate * 100).toFixed(2)}%` })
    if (outputs.monthlyCashFlow !== undefined) metrics.push({ label: 'Monthly Cash Flow', value: `$${outputs.monthlyCashFlow.toLocaleString()}` })
    if (outputs.annualCashFlow !== undefined) metrics.push({ label: 'Annual Cash Flow', value: `$${outputs.annualCashFlow.toLocaleString()}` })
    if (outputs.dscr !== undefined) metrics.push({ label: 'DSCR', value: outputs.dscr.toFixed(2) })
  } else {
    if (outputs.profitMarginPercent !== undefined) metrics.push({ label: 'Profit Margin', value: `${outputs.profitMarginPercent.toFixed(1)}%` })
    if (outputs.monthlyProfit !== undefined) metrics.push({ label: 'Monthly NOI', value: `$${outputs.monthlyProfit.toLocaleString()}` })
    if (outputs.netOperatingIncome !== undefined) metrics.push({ label: 'Annual NOI', value: `$${outputs.netOperatingIncome.toLocaleString()}` })
    if (outputs.monthlyBookings !== undefined) metrics.push({ label: 'Monthly Bookings', value: outputs.monthlyBookings.toFixed(1) })
    if (outputs.breakEvenOccupancy !== undefined) metrics.push({ label: 'Break-Even Occupancy', value: `${outputs.breakEvenOccupancy.toFixed(1)}%` })
  }
  
  return metrics
}

function generateSummary(outputs: any, type: 'roi' | 'sublease'): string {
  if (type === 'roi') {
    const roi = outputs.coc ? (outputs.coc * 100).toFixed(1) : '0'
    const cashFlow = outputs.monthlyCashFlow || 0
    return `This property analysis shows a ${roi}% return on investment with monthly cash flow of ${cashFlow >= 0 ? '$' : '-'}$${Math.abs(cashFlow).toLocaleString()}. The investment ${cashFlow >= 0 ? 'generates' : 'results in a monthly loss of'} positive cash flow, making it ${cashFlow >= 0 ? 'viable' : 'unviable'} for further consideration.`
  } else {
    const profitMargin = outputs.profitMarginPercent || 0
    const monthlyProfit = outputs.monthlyProfit || 0
    return `This sublease analysis shows a ${profitMargin.toFixed(1)}% profit margin with monthly profit of $${monthlyProfit.toLocaleString()}. The operation ${monthlyProfit >= 0 ? 'is' : 'is not'} profitable and ${monthlyProfit >= 0 ? 'generates' : 'requires'} ${Math.abs(monthlyProfit).toLocaleString()} per month in ${monthlyProfit >= 0 ? 'profit' : 'subsidies'}.`
  }
}

/**
 * Export chart element to PDF
 */
export async function exportChartToPDF(chartElement: HTMLElement, pdf: jsPDF, x: number, y: number, width: number, height: number): Promise<void> {
  try {
    const canvas = await html2canvas(chartElement, {
      backgroundColor: '#ffffff',
      scale: 2,
    })
    
    const imgData = canvas.toDataURL('image/png')
    pdf.addImage(imgData, 'PNG', x, y, width, height)
  } catch (error) {
    console.warn('Failed to export chart:', error)
  }
}

