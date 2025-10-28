import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { FileText, Trash2, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { safeUSD, safePct } from '../lib/format'
import { listScenarios, removeScenario, type SavedScenario } from '../lib/persist'

export default function ReportsPage() {
  const [roiScenarios, setRoiScenarios] = useState<SavedScenario[]>([])
  const [subleaseScenarios, setSubleaseScenarios] = useState<SavedScenario[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [compareMode, setCompareMode] = useState(false)

  useEffect(() => {
    setRoiScenarios(listScenarios('roi'))
    setSubleaseScenarios(listScenarios('sublease'))
  }, [])

  const handleDelete = (id: string, type: 'roi' | 'sublease') => {
    if (confirm('Are you sure you want to delete this scenario?')) {
      removeScenario(id, type)
      if (type === 'roi') {
        setRoiScenarios(listScenarios('roi'))
      } else {
        setSubleaseScenarios(listScenarios('sublease'))
      }
      setSelectedIds(prev => {
        const updated = new Set(prev)
        updated.delete(id)
        return updated
      })
    }
  }

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const updated = new Set(prev)
      if (updated.has(id)) {
        updated.delete(id)
      } else {
        updated.add(id)
      }
      return updated
    })
  }

  const allScenarios = [...roiScenarios, ...subleaseScenarios]
  const selectedScenarios = allScenarios.filter(s => selectedIds.has(s.id))

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Reports - BridgeStay Analytics</title>
        <meta name="description" content="View and compare saved ROI and Sublease scenarios" />
      </Helmet>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Saved Scenarios
          </h1>
          <p className="text-muted-foreground">
            View and compare your saved ROI and Sublease scenarios
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={compareMode}
              onChange={(e) => setCompareMode(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Compare Mode</span>
          </label>
        </div>
      </div>

      {allScenarios.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Scenarios Saved</h3>
            <p className="text-muted-foreground mb-4">
              Save scenarios from the ROI Calculator or Sublease Calculator to view them here.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/roi" className="text-blue-600 hover:underline">ROI Calculator</a>
              <a href="/sublease" className="text-orange-600 hover:underline">Sublease Calculator</a>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Scenario Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Scenarios</CardTitle>
              <CardDescription>
                {selectedIds.size > 0 && `${selectedIds.size} selected`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      {compareMode && <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Select</th>}
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Monthly NOI</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Annual NOI</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Occupancy</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Profit Margin</th>
                      <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roiScenarios.map((scenario) => {
                      const outputs = scenario.outputs as any
                      const monthlyNOI = outputs?.monthlyCashFlow || 0
                      const annualNOI = outputs?.annualCashFlow || 0
                      const profitMargin = annualNOI && outputs?.grossRent ? (annualNOI / outputs.grossRent) * 100 : 0
                      
                      return (
                        <tr key={scenario.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/50">
                          {compareMode && (
                            <td className="py-3 px-4">
                              <input
                                type="checkbox"
                                checked={selectedIds.has(scenario.id)}
                                onChange={() => handleToggleSelect(scenario.id)}
                                className="rounded border-gray-300"
                              />
                            </td>
                          )}
                          <td className="py-3 px-4 font-medium">{scenario.name}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              ROI
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">{safeUSD(monthlyNOI)}</td>
                          <td className="py-3 px-4 text-right">{safeUSD(annualNOI)}</td>
                          <td className="py-3 px-4 text-right text-muted-foreground">—</td>
                          <td className="py-3 px-4 text-right">{safePct(profitMargin)}</td>
                          <td className="py-3 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(scenario.id, 'roi')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                    {subleaseScenarios.map((scenario) => {
                      const outputs = scenario.outputs as any
                      const monthlyNOI = outputs?.monthlyProfit || 0
                      const annualNOI = outputs?.netOperatingIncome || 0
                      const occupancy = scenario.inputs?.occupancyRate || 0
                      const profitMargin = outputs?.profitMarginPercent || 0
                      
                      return (
                        <tr key={scenario.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900/50">
                          {compareMode && (
                            <td className="py-3 px-4">
                              <input
                                type="checkbox"
                                checked={selectedIds.has(scenario.id)}
                                onChange={() => handleToggleSelect(scenario.id)}
                                className="rounded border-gray-300"
                              />
                            </td>
                          )}
                          <td className="py-3 px-4 font-medium">{scenario.name}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                              Sublease
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">{safeUSD(monthlyNOI)}</td>
                          <td className="py-3 px-4 text-right">{safeUSD(annualNOI)}</td>
                          <td className="py-3 px-4 text-right">{safePct(occupancy)}</td>
                          <td className="py-3 px-4 text-right">{safePct(profitMargin)}</td>
                          <td className="py-3 px-4 text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(scenario.id, 'sublease')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Comparison View */}
          {compareMode && selectedScenarios.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedScenarios.map((scenario) => (
                <Card key={scenario.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{scenario.name}</CardTitle>
                    <CardDescription>
                      {scenario.type === 'roi' ? 'ROI Analysis' : 'Sublease Analysis'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {scenario.type === 'roi' ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">ROI</span>
                          <span className="font-semibold">{safePct((scenario.outputs as any).coc)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Cap Rate</span>
                          <span className="font-semibold">{safePct((scenario.outputs as any).capRate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Monthly NOI</span>
                          <span className="font-semibold">{safeUSD((scenario.outputs as any).monthlyCashFlow)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Annual NOI</span>
                          <span className="font-semibold">{safeUSD((scenario.outputs as any).annualCashFlow)}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Occupancy</span>
                          <span className="font-semibold">{safePct((scenario.inputs as any).occupancyRate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Monthly NOI</span>
                          <span className="font-semibold">{safeUSD((scenario.outputs as any).monthlyProfit)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Annual NOI</span>
                          <span className="font-semibold">{safeUSD((scenario.outputs as any).netOperatingIncome)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Profit Margin</span>
                          <span className="font-semibold">{safePct((scenario.outputs as any).profitMarginPercent)}</span>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
