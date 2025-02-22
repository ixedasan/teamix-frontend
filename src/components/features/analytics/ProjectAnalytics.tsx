'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'

import { Heading } from '@/components/common/Heading'
import { useFindProjectAnalyticsQuery } from '@/graphql/generated/output'
import { AnalyticsTabs } from './AnalyticsTabs'
import { AnalyticsSkeletonLoader } from './common/AnalyticsSkeletonLoader'

export function ProjectAnalytics() {
	const { loading, error, data } = useFindProjectAnalyticsQuery({
		fetchPolicy: 'network-only',
		nextFetchPolicy: 'cache-first'
	})
	const [activeTab, setActiveTab] = useState('overview')

	if (error) {
		return (
			<div className="flex h-96 w-full items-center justify-center">
				<div className="text-center">
					<AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
					<h3 className="text-lg font-medium">Data loading error</h3>
					<p className="mt-2 text-sm text-gray-500">
						Failed to load project analytics: {error?.message}
					</p>
				</div>
			</div>
		)
	}

	if (loading) return <AnalyticsSkeletonLoader />

	if (!data) return null

	return (
		<div className="container mx-auto space-y-6 px-4 py-6">
			<Heading
				title="Project analytics"
				description="Track your project's performance and get insights on how to improve it."
			/>
			<AnalyticsTabs
				activeTab={activeTab}
				onTabChange={setActiveTab}
				data={data.projectAnalytics}
			/>
		</div>
	)
}
