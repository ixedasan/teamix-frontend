import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { FindUserDashboardQuery } from '@/graphql/generated/output'
import { TaskItem } from './TaskItem'

interface RecentTasksProps {
	tasks: FindUserDashboardQuery['FindUserDashboard']['recentTasks']
}

export function RecentTasks({ tasks }: RecentTasksProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle>Recent Tasks</CardTitle>
					<CardDescription>
						Recently updated tasks across all projects
					</CardDescription>
				</div>
				<Link href="/projects">
					<Button variant="ghost" size="sm" className="gap-1">
						View All <ArrowRight className="h-4 w-4" />
					</Button>
				</Link>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					{tasks.length > 0 ? (
						tasks.map(task => (
							// @ts-ignore
							<TaskItem key={task.id} task={task} showProject />
						))
					) : (
						<p className="py-4 text-center text-muted-foreground">
							No recent tasks found
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
