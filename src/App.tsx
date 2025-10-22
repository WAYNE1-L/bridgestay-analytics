import { useMemo, useState } from 'react'
import { calculateAll, type CalculatorInputs } from './utils/calculations'
import { formatCurrency, formatPercent } from './lib/format'
import type { CalculatorResults } from './types/results'
import { AmortizationChart } from './components/AmortizationChart'
import { PdfExportButton } from './components/PdfExportButton'

const defaultInputs: CalculatorInputs = {
  purchasePrice: 300000,
  downPaymentPercent: 20,
  interestRateAnnualPercent: 6.5,
  loanTermYears: 30,
  monthlyRent: 2400,
  vacancyPercent: 5,
  maintenancePercent: 5,
  managementPercent: 8,
  taxesMonthly: 300,
  insuranceMonthly: 120,
  otherFixedMonthly: 0,
  closingCosts: 6000,
  rehabBudget: 0,
}

function Input({ label, name, value, onChange, step = 1 }: { label: string; name: keyof CalculatorInputs; value: number; onChange: (name: keyof CalculatorInputs, value: number) => void; step?: number }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="font-medium text-gray-700">{label}</span>
      <input
        type="number"
        step={step}
        className="rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(name, parseFloat(e.target.value))}
      />
    </label>
  )
}


export default function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs)
  const rawResults = useMemo(() => calculateAll(inputs), [inputs])
  
  // Transform to typed results structure
  const results: CalculatorResults = useMemo(() => ({
    summary: {
      loanAmount: rawResults.loanAmount,
      monthlyMortgage: rawResults.monthlyMortgage,
      noiMonthly: rawResults.noiMonthly,
      noiAnnual: rawResults.noiAnnual,
      cashFlowMonthly: rawResults.cashFlowMonthly,
      cashOnCashReturnPercent: rawResults.cashOnCashReturnPercent,
      capRatePercent: rawResults.capRatePercent,
      annualizedFiveYearReturnPercent: rawResults.annualizedFiveYearReturnPercent,
    },
    expenseBreakdown: rawResults.expenseBreakdownMonthly,
    amortization: rawResults.amortization,
  }), [rawResults])

  function handleChange(name: keyof CalculatorInputs, value: number) {
    setInputs((prev) => ({ ...prev, [name]: Number.isFinite(value) ? value : 0 }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center gap-3">
            <img src="/bridge-stay-logo.svg" alt="BridgeStay" className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">BridgeStay ROI Calculator</h1>
              <p className="text-sm text-gray-600">Quickly evaluate a rental deal's cash flow, cap rate, and returns.</p>
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-2">
        <section className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-base font-semibold text-gray-900">Inputs</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input label="Purchase price" name="purchasePrice" value={inputs.purchasePrice} onChange={handleChange} step={1000} />
            <Input label="Down payment %" name="downPaymentPercent" value={inputs.downPaymentPercent} onChange={handleChange} step={0.1} />
            <Input label="Interest rate %" name="interestRateAnnualPercent" value={inputs.interestRateAnnualPercent} onChange={handleChange} step={0.1} />
            <Input label="Loan term (years)" name="loanTermYears" value={inputs.loanTermYears} onChange={handleChange} />
            <Input label="Monthly rent" name="monthlyRent" value={inputs.monthlyRent} onChange={handleChange} step={50} />
            <Input label="Vacancy %" name="vacancyPercent" value={inputs.vacancyPercent} onChange={handleChange} step={0.5} />
            <Input label="Maintenance %" name="maintenancePercent" value={inputs.maintenancePercent} onChange={handleChange} step={0.5} />
            <Input label="Management %" name="managementPercent" value={inputs.managementPercent} onChange={handleChange} step={0.5} />
            <Input label="Taxes (monthly)" name="taxesMonthly" value={inputs.taxesMonthly} onChange={handleChange} step={10} />
            <Input label="Insurance (monthly)" name="insuranceMonthly" value={inputs.insuranceMonthly} onChange={handleChange} step={10} />
            <Input label="Other fixed (monthly)" name="otherFixedMonthly" value={inputs.otherFixedMonthly} onChange={handleChange} step={10} />
            <Input label="Closing costs" name="closingCosts" value={inputs.closingCosts} onChange={handleChange} step={500} />
            <Input label="Rehab budget" name="rehabBudget" value={inputs.rehabBudget} onChange={handleChange} step={500} />
          </div>
        </section>

        <section id="report-root" className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-900">Results</h2>
            <PdfExportButton />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Stat label="Monthly cash flow" value={formatCurrency(results.summary.cashFlowMonthly)} positive={results.summary.cashFlowMonthly >= 0} />
            <Stat label="Mortgage payment" value={formatCurrency(results.summary.monthlyMortgage)} />
            <Stat label="NOI (monthly)" value={formatCurrency(results.summary.noiMonthly)} />
            <Stat label="NOI (annual)" value={formatCurrency(results.summary.noiAnnual)} />
            <Stat label="Cash on cash" value={formatPercent(results.summary.cashOnCashReturnPercent)} />
            <Stat label="Cap rate" value={formatPercent(results.summary.capRatePercent)} />
            <Stat label="5yr annualized" value={formatPercent(results.summary.annualizedFiveYearReturnPercent)} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-900">Monthly expenses</h3>
          <ul className="mt-2 divide-y rounded-md border">
            <Row label="Fixed" value={formatCurrency(results.expenseBreakdown.fixed)} />
            <Row label="Variable" value={formatCurrency(results.expenseBreakdown.variable)} />
            <Row label="Total" value={formatCurrency(results.expenseBreakdown.total)} />
          </ul>

          <h3 className="mt-4 text-sm font-semibold text-gray-900">Amortization (first 12 months)</h3>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="text-gray-700">
                  <th className="px-2 py-1 font-medium">Month</th>
                  <th className="px-2 py-1 font-medium">Principal</th>
                  <th className="px-2 py-1 font-medium">Interest</th>
                  <th className="px-2 py-1 font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                {results.amortization.slice(0, 12).map((p) => (
                  <tr key={p.month} className="odd:bg-gray-50">
                    <td className="px-2 py-1">{p.month}</td>
                    <td className="px-2 py-1">{formatCurrency(p.principal)}</td>
                    <td className="px-2 py-1">{formatCurrency(p.interest)}</td>
                    <td className="px-2 py-1">{formatCurrency(p.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <AmortizationChart items={results.amortization} monthlyRent={inputs.monthlyRent} />
        </section>
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-8 text-xs text-gray-500">
        Built with React, Vite, and Tailwind.
      </footer>
    </div>
  )
}

function Stat({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="rounded-md border p-3">
      <div className="text-xs text-gray-600">{label}</div>
      <div className={`mt-1 text-lg font-semibold ${positive === true ? 'text-emerald-600' : positive === false ? 'text-rose-600' : 'text-gray-900'}`}>{value}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between px-3 py-2 text-sm">
      <span className="text-gray-700">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </li>
  )
}
