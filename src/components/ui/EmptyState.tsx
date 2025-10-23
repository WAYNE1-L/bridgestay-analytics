import { ReactNode } from 'react'
import { Card, CardContent } from './card'
import { Button } from './button'
import { FileX, Search, AlertCircle, RefreshCw } from 'lucide-react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ 
  icon, 
  title, 
  description, 
  action, 
  className = '' 
}: EmptyStateProps) {
  return (
    <Card className={`border-dashed ${className}`}>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 text-gray-400 dark:text-gray-500">
          {icon || <FileX className="h-12 w-12" />}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
          {description}
        </p>
        {action && (
          <Button onClick={action.onClick} variant="outline">
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export function NoDataEmptyState({ onRefresh }: { onRefresh?: () => void }) {
  return (
    <EmptyState
      icon={<Search className="h-12 w-12" />}
      title="No data available"
      description="There's no data to display at the moment. Try refreshing or check back later."
      action={onRefresh ? { label: 'Refresh', onClick: onRefresh } : undefined}
    />
  )
}

export function ErrorEmptyState({ 
  error, 
  onRetry 
}: { 
  error?: string
  onRetry?: () => void 
}) {
  return (
    <EmptyState
      icon={<AlertCircle className="h-12 w-12 text-red-500" />}
      title="Something went wrong"
      description={error || "We encountered an error while loading the data. Please try again."}
      action={onRetry ? { label: 'Try Again', onClick: onRetry } : undefined}
    />
  )
}

export function LoadingEmptyState() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <RefreshCw className="h-12 w-12 text-gray-400 dark:text-gray-500 animate-spin mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Loading...
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we fetch the data.
        </p>
      </CardContent>
    </Card>
  )
}
