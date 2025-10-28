import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { TrendingUp, Home, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { safeUSD, safePct } from '../lib/format'
import { loadLast } from '../lib/persist'
import { calc } from '../lib/calc'
import { calcSublease } from '../lib/sublease'
import type { RoiInput } from '../lib/calc'
import type { SubleaseInput, SubleaseResult } from '../lib/sublease'
import type { CalcResult } from '../lib/calc'

export default function DashboardPage() {
  const [roiData, setRoiData] = useState<{ inputs?: RoiInput; outputs?: CalcResult } | null>(null)
  const [subleaseData, setSubleaseData] = useState<{ inputs?: SubleaseInput; outputs?: SubleaseResult } | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Load data from localStorage
    const roiStored = loadLast('roi')
    const subleaseStored = loadLast('sublease')

    // Recompute if only inputs exist
    if (roiStored) {
      if (roiStored.outputs) {
        setRoiData(roiStored)
      } else if (roiStored.inputs) {
        const recomputed = calc(roiStored.inputs as RoiInput)
        setRoiData({ inputs: roiStored.inputs, outputs: recomputed })
      }
    }

    if (subleaseStored) {
      if (subleaseStored.outputs) {
        setSubleaseData(subleaseStored)
      } else if (subleaseStored.inputs) {
        const recomputed = calcSublease(subleaseStored.inputs as SubleaseInput)
        setSubleaseData({ inputs: subleaseStored.inputs, outputs: recomputed })
      }
    }

    setLoaded(true)
  }, [])

  const roiOutputs = roiData?.outputs
  const subleaseOutputs = subleaseData?.outputs

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Dashboard - BridgeStay Analytics</title>
        <meta name="description" content="Real estate investment dashboard with ROI and Sublease KPIs" />
        <meta property="og:title" content="BridgeStay Dashboard" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin + '/dashboard'} />
        <meta property="og:description" content="Real estate investment dashboard with ROI and Sublease KPIs" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BarChart3 className="h-8 w-8" />
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Key performance indicators from your last sessions
          </p>
        </div>
      </div>

      {!loaded && (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            Loading dashboard...
          </CardContent>
        </Card>
      )}

      {loaded && !roiOutputs && !subleaseOutputs && (
        <Card>
          <CardContent className="p-8 text-center space-y-4">
            <p className="text-muted-foreground">
              No data available. Use the calculators to generate KPIs.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/roi" className="text-blue-600 hover:underline">ROI Calculator</a>
              <a href="/sublease" className="text-orange-600 hover:underline">Sublease Calculator</a>
            </div>
          </CardContent>
        </Card>
      )}

      {loaded && (roiOutputs || subleaseOutputs) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ROI Section */}
          {roiOutputs && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  ROI Metrics
                </CardTitle>
                <CardDescription>
                  Real estate investment returns
                  {roiData?.outputs && <span className="ml-2 text-xs text-muted-foreground">• Data from last session</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">ROI %</p>
                    <p className="text-2xl font-bold">{safePct(roiOutputs.coc)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Cap Rate</p>
                    <p className="text-2xl font-bold">{safePct(roiOutputs.capRate)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">NOI (月)</p>
                    <p className="text-xl font-semibold">{safeUSD(roiOutputs.monthlyCashFlow)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">NOI (年)</p>
                    <p className="text-xl font-semibold">{safeUSD(roiOutputs.annualCashFlow)}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground mb-1">Profit Margin</p>
                  <p className="text-lg font-semibold">
                    {safePct((roiOutputs.annualCashFlow / (roiOutputs.grossRent || 1)) * 100)}
                  </p>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          )}

          {/* Sublease Section */}
          {subleaseOutputs && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
            >
              <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-orange-600" />
                  Sublease Metrics
                </CardTitle>
                <CardDescription>
                  Sublease to Airbnb profitability
                  {subleaseData?.outputs && <span className="ml-2 text-xs text-muted-foreground">• Data from last session</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                    <p className="text-2xl font-bold">{safePct(subleaseData.inputs?.occupancyRate || 0)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Profit Margin</p>
                    <p className="text-2xl font-bold">{safePct(subleaseOutputs.profitMarginPercent)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">NOI (月)</p>
                    <p className="text-xl font-semibold">{safeUSD(subleaseOutputs.monthlyProfit)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">NOI (年)</p>
                    <p className="text-xl font-semibold">{safeUSD(subleaseOutputs.netOperatingIncome)}</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Bookings</p>
                  <p className="text-lg font-semibold">{subleaseOutputs.monthlyBookings.toFixed(1)}</p>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          )}
        </div>
      )}
    </div>
  )
}
