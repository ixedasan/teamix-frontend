import Image from 'next/image'
import Link from 'next/link'
import { Users } from 'lucide-react'

import { UserAvatar } from '@/components/common/UserAvatar'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card'
import { FindUserProjectsListQuery } from '@/graphql/generated/output'

interface IProjectCard {
	project: FindUserProjectsListQuery['getAllUserProjects'][0]
}

export function ProjectCard({ project }: IProjectCard) {
	const MAX_VISIBLE_MEMBERS = 3
	const additionalMembers = project.members.length - MAX_VISIBLE_MEMBERS

	return (
		<Link href={`/projects/${project.id}/tasks`}>
			<Card className="group h-[250px] min-w-96 max-w-96 overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-lg">
				<div className="relative h-24 overflow-hidden bg-gradient-to-r from-primary/70 to-chart-4/80">
					{project.cover && (
						<Image
							src={project.cover}
							alt={project.name}
							className="h-full w-full object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
						/>
					)}
				</div>

				<CardHeader className="relative -mt-8 space-y-2 px-4 pb-0">
					<div className="flex items-center gap-3">
						<div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-background shadow-md">
							<span className="text-2xl">{project.icon}</span>
						</div>
						<div className="flex-1">
							<h3 className="font-semibold tracking-tight">{project.name}</h3>
							<Badge variant="secondary" className="mt-1">
								<Users className="mr-1 h-3 w-3" />
								{project.members.length} members
							</Badge>
						</div>
					</div>
				</CardHeader>

				<CardContent className="px-4 py-3">
					<p className="line-clamp-3 text-sm text-muted-foreground">
						{project.description}
					</p>
				</CardContent>

				<CardFooter className="px-4">
					<div className="flex items-center gap-2">
						<div className="flex -space-x-2">
							{project.members
								.slice(0, MAX_VISIBLE_MEMBERS)
								.map((member, index) => (
									<UserAvatar key={index} user={member.user} />
								))}
							{additionalMembers > 0 && (
								<div className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-background bg-muted text-xs font-medium">
									+{additionalMembers}
								</div>
							)}
						</div>
					</div>
				</CardFooter>
			</Card>
		</Link>
	)
}
