import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import { ProjectsList } from '@/components/features/project/list/ProjectsList'
import {
	FindUserProjectsListDocument,
	type FindUserProjectsListQuery
} from '@/graphql/generated/output'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { SERVER_URL } from '@/constants/url.constants'

export const metadata: Metadata = {
	title: 'Projects',
	...NO_INDEX_PAGE
}

async function findUserProjectsList() {
	const sessionStore = await cookies()
	const session = sessionStore.get('session')?.value

	try {
		const query = FindUserProjectsListDocument.loc?.source.body

		const response = await fetch(SERVER_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Cookie: `session=${session}`
			},
			body: JSON.stringify({ query }),
			credentials: 'include'
		})

		const data = await response.json()

		return {
			projects: data.data
				.getAllUserProjects as FindUserProjectsListQuery['getAllUserProjects']
		}
	} catch (error) {
		console.error(error)
		throw new Error('Failed to fetch projects')
	}
}

export default async function ProjectsListPage() {
	// const t = await getTranslations()

	const { projects } = await findUserProjectsList()

	return <ProjectsList heading="Projects" projects={projects} />
}
