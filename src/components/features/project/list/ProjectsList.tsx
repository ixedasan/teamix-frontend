import { type FindUserProjectsListQuery } from '@/graphql/generated/output'
import { ListHeader } from './ListHeader'
import { ProjectCard } from './ProjectCard'

interface IProjectsList {
	heading?: string
	projects: FindUserProjectsListQuery['getAllUserProjects']
}

export function ProjectsList({ projects, heading }: IProjectsList) {
	return (
		<div className="container mx-auto w-full">
			<ListHeader />
			<div className="mt-4 flex flex-wrap gap-4">
				{projects.map((project, index) => (
					<ProjectCard key={index} project={project} />
				))}
			</div>
		</div>
	)
}
