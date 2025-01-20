import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Settings, Users } from 'lucide-react'

import { UserAvatar } from '@/components/common/UserAvatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card'
import { FindUserProjectsListQuery, Role } from '@/graphql/generated/output'
import { useCurrentUser } from '@/hooks/use-current-user'

interface IProjectCard {
	project: FindUserProjectsListQuery['getAllUserProjects'][0]
}

export function ProjectCard({ project }: IProjectCard) {
	const router = useRouter()
	const { profile } = useCurrentUser()

	const MAX_VISIBLE_MEMBERS = 3
	const additionalMembers = project.members.length - MAX_VISIBLE_MEMBERS

	return (
		<Link href={`/projects/${project.id}/tasks`}>
			<Card className="group h-full transition-all duration-300 hover:border-primary hover:shadow-lg">
				<div className="relative h-24 overflow-hidden rounded-md bg-gradient-to-r from-primary/70 to-chart-4/80">
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
						<div className="min-w-0 flex-1">
							<h3 className="truncate font-semibold tracking-tight">
								{project.name}
							</h3>
							<Badge variant="secondary" className="mt-1 inline-flex">
								<Users className="mr-1 h-3 w-3" />
								<span className="truncate">
									{project.members.length} members
								</span>
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
					<div className="flex w-full items-center justify-between gap-2">
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
						{project.members.some(
							member =>
								member.role === Role.Admin && member.user.id === profile?.id
						) && (
							<Button
								size="icon"
								variant="ghost"
								onClick={e => {
									e.preventDefault()
									router.push(`/projects/${project.id}/settings`)
								}}
							>
								<Settings />
							</Button>
						)}
					</div>
				</CardFooter>
			</Card>
		</Link>
	)
}
