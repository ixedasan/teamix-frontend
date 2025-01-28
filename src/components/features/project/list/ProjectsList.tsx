'use client'

import { useTranslations } from 'next-intl'

import { Heading } from '@/components/common/Heading'
import { Button } from '@/components/ui/Button'
import { useFindUserProjectsListQuery } from '@/graphql/generated/output'
import { useCurrentUser } from '@/hooks/use-current-user'
import { useProjectList } from '@/hooks/use-project-list'
import { CreateProjectDialog } from './CreateProjectDialog'
import { ListView } from './ListView'
import { ProjectCard } from './ProjectCard'
import { ProjectViewToggler } from './ProjectViewToggler'

export function ProjectsList() {
	const t = useTranslations('projects')

	const { profile } = useCurrentUser()
	const { data } = useFindUserProjectsListQuery()
	const projects = data?.getAllUserProjects || []

	const { viewType } = useProjectList()

	return (
		<div className="container mx-auto w-full px-4">
			<div className="flex w-full items-center justify-between gap-4">
				<h2 className="text-2xl font-bold">
					{t('hello')} {profile?.displayName}!
				</h2>
				<CreateProjectDialog />
			</div>
			<div className="mt-6 flex items-center justify-between">
				<Heading title={t('heading')} />
				<ProjectViewToggler />
			</div>
			{!projects.length && (
				<div className="flex h-full flex-col items-center justify-center gap-4">
					<h3 className="text-xl font-semibold">{t('noData')}</h3>
					<p className="text-muted-foreground">{t('noDataSpan')}</p>
					<CreateProjectDialog triger={<Button>{t('createButton')}</Button>} />
				</div>
			)}
			<div className="mt-6">
				{viewType === 'grid' ? (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
						{projects.map((project, index) => (
							<ProjectCard key={index} project={project} />
						))}
					</div>
				) : (
					<ListView projects={projects} />
				)}
			</div>
		</div>
	)
}
