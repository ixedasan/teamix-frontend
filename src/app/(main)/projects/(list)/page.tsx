import type { Metadata } from 'next'

import { ProjectsList } from '@/components/features/project/list/ProjectsList'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Projects',
	...NO_INDEX_PAGE
}

export default async function ProjectsListPage() {
	return <ProjectsList />
}
