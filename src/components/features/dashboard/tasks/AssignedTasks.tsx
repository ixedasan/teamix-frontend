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
import { type FindUserDashboardQuery } from '@/graphql/generated/output'
import { TaskItem } from './TaskItem'

interface AssignedTasksProps {
	tasks: FindUserDashboardQuery['FindUserAssigedTasks']
}

export function AssignedTasks({ tasks }: AssignedTasksProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle>Assigned to Me</CardTitle>
					<CardDescription>Tasks that require your attention</CardDescription>
				</div>
				<Link href="/projects">
					<Button variant="ghost" size="sm" className="gap-1">
						View All <ArrowRight className="h-4 w-4" />
					</Button>
				</Link>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{tasks.length > 0 ? (
						tasks.map(task => (
							<TaskItem key={task.id} task={task} showProject />
						))
					) : (
						<p className="py-4 text-center text-muted-foreground">
							No tasks assigned to you
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
