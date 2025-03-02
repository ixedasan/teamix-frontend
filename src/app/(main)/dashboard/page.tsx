import type { Metadata } from 'next'

import DashboardRoot from '@/components/features/dashboard/DashboardRoot'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return <DashboardRoot />
}
