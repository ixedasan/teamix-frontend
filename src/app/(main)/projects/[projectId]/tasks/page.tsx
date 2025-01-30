import type { Metadata } from 'next'

import { TaskPageContent } from '@/components/features/task/TaskPageContent'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE
}

export default async function TasksPage() {
	return <TaskPageContent />
}
