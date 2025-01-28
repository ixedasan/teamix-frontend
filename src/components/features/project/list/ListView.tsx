import Link from 'next/link'
import { Settings, Users } from 'lucide-react'

import { UserAvatar } from '@/components/common/UserAvatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/Table'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/Tooltip'
import { FindUserProjectsListQuery, Role } from '@/graphql/generated/output'
import { useCurrentUser } from '@/hooks/use-current-user'

interface IListView {
	projects: FindUserProjectsListQuery['getAllUserProjects']
}

export function ListView({ projects }: IListView) {
	const { profile } = useCurrentUser()

	return (
		<div className="rounded-lg border bg-card">
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-transparent">
						<TableHead className="w-[350px]">Project</TableHead>
						<TableHead>Description</TableHead>
						<TableHead>Team</TableHead>
						<TableHead className="w-[50px]"></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{projects.map(project => (
						<TableRow
							key={project.id}
							className="group transition-colors hover:bg-muted/50"
						>
							<TableCell>
								<Link
									href={`/projects/${project.id}/tasks`}
									className="flex items-center gap-3 hover:text-primary"
								>
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
										<span className="text-xl">{project.icon}</span>
									</div>
									<div className="flex flex-col">
										<span className="font-medium text-foreground">
											{project.name}
										</span>
									</div>
								</Link>
							</TableCell>

							<TableCell>
								<p className="line-clamp-2 text-sm text-muted-foreground">
									{project.description}
								</p>
							</TableCell>

							<TableCell>
								<TooltipProvider>
									<div className="flex items-center gap-2">
										<div className="flex -space-x-2">
											{project.members.slice(0, 3).map((member, index) => (
												<Tooltip key={index}>
													<TooltipTrigger>
														<div className="transition-transform hover:translate-y-[-2px]">
															<UserAvatar user={member.user} />
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>{member.user.displayName}</p>
													</TooltipContent>
												</Tooltip>
											))}
											{project.members.length > 3 && (
												<Tooltip>
													<TooltipTrigger>
														<div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted ring-2 ring-background transition-transform hover:translate-y-[-2px]">
															<span className="text-xs font-medium">
																+{project.members.length - 3}
															</span>
														</div>
													</TooltipTrigger>
													<TooltipContent>
														<p>{project.members.length - 3} more members</p>
													</TooltipContent>
												</Tooltip>
											)}
										</div>
										<Badge variant="secondary" className="ml-2 gap-1">
											<Users className="h-3 w-3" />
											{project.members.length}
										</Badge>
									</div>
								</TooltipProvider>
							</TableCell>

							<TableCell>
								{project.members.some(
									member =>
										member.role === Role.Admin && member.user.id === profile?.id
								) && (
									<Link href={`/projects/${project.id}/settings`}>
										<Button size="icon" variant="ghost">
											<Settings />
										</Button>
									</Link>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
