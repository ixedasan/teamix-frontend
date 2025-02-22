import type { Metadata } from 'next'

import { ProjectAnalytics } from '@/components/features/analytics/ProjectAnalytics'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Analytics',
	...NO_INDEX_PAGE
}

export default async function AnalyticsPage() {
	return <ProjectAnalytics />
}
