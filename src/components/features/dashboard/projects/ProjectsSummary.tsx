import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import type { FindUserDashboardQuery } from '@/graphql/generated/output'

interface ProjectsSummaryProps {
	projects: FindUserDashboardQuery['FindUserDashboard']['projectsSummary']
}

export function ProjectsSummary({ projects }: ProjectsSummaryProps) {
	return (
		<Card className="col-span-1">
			<CardHeader className="flex flex-row items-center justify-between">
				<div className="space-y-1">
					<CardTitle>Projects Summary</CardTitle>
					<CardDescription>
						Task completion across your projects
					</CardDescription>
				</div>
				<Link href="/projects">
					<Button variant="ghost" size="sm" className="gap-1">
						View All <ArrowRight className="size-4" />
					</Button>
				</Link>
			</CardHeader>
			<CardContent>
				<div className="space-y-6">
					{projects.map(projectSummary => {
						const completionPercentage =
							projectSummary.totalTasks > 0
								? Math.round(
										(projectSummary.completedTasks /
											projectSummary.totalTasks) *
											100
									)
								: 0

						return (
							<div key={projectSummary.project.id} className="space-y-2">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										{projectSummary.project.icon && (
											<span className="text-lg">
												{projectSummary.project.icon}
											</span>
										)}
										<Link
											href={`/projects/${projectSummary.project.id}/tasks`}
											className="font-medium hover:underline"
										>
											{projectSummary.project.name}
										</Link>
									</div>
									<Link
										href={`/projects/${projectSummary.project.id}/tasks`}
										className="text-sm text-muted-foreground hover:text-foreground"
									>
										<ArrowUpRight className="h-4 w-4" />
									</Link>
								</div>
								<div className="flex items-center justify-between text-sm">
									<div>
										<span className="font-medium">
											{projectSummary.completedTasks}
										</span>
										<span className="text-muted-foreground"> of </span>
										<span className="font-medium">
											{projectSummary.totalTasks}
										</span>
										<span className="text-muted-foreground">
											{' '}
											tasks completed
										</span>
									</div>
									<span className="font-medium">{completionPercentage}%</span>
								</div>
								<Progress value={completionPercentage} className="h-2" />
							</div>
						)
					})}
				</div>
			</CardContent>
		</Card>
	)
}
