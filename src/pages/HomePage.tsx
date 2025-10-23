import { useEffect } from 'react'
import { Calculator, BarChart3, FileText } from 'lucide-react'
import { FeatureCard } from '../components/ui/FeatureCard'

export default function HomePage() {
  useEffect(() => {
    document.title = 'BridgeStay Analytics - Real Estate Investment Analysis'
  }, [])

  const features = [
    {
      title: 'ROI Calculator',
      description: 'Calculate cash flow, cap rates, and return on investment for any rental property.',
      icon: Calculator,
      href: '/roi',
      iconColor: 'text-blue-600',
      iconBgColor: 'bg-blue-50',
    },
    {
      title: 'Dashboard',
      description: 'Track and compare multiple properties with ranking tables and performance metrics.',
      icon: BarChart3,
      href: '/dashboard',
      iconColor: 'text-green-600',
      iconBgColor: 'bg-green-50',
    },
    {
      title: 'Reports',
      description: 'Generate comprehensive investment reports with charts and financial analysis.',
      icon: FileText,
      href: '/report',
      iconColor: 'text-purple-600',
      iconBgColor: 'bg-purple-50',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
          BridgeStay Analytics
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Professional real estate investment analysis and property evaluation tools
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-6">
          <a
            href="/roi"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-black/10 px-4 py-2 
                       text-sm font-medium text-blue-700 hover:bg-blue-50 transition"
          >
            Start Analyzing
            <span aria-hidden>→</span>
          </a>

          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 
                       text-sm font-medium text-gray-800 hover:underline underline-offset-4 transition"
          >
            View Dashboard
          </a>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            href={feature.href}
            iconColor={feature.iconColor}
            iconBgColor={feature.iconBgColor}
          />
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
          Why Choose BridgeStay Analytics?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Our platform provides comprehensive tools for real estate investors to analyze properties, 
          track performance, and make informed investment decisions with confidence.
        </p>
        </div>
    </>
  )
}
