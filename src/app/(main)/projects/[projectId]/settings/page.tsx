import type { Metadata } from 'next'

import { ProjectSettings } from '@/components/features/project/settings/ProjectSettings'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Project Settings',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <ProjectSettings />
}
