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

interface OverdueTasksProps {
	tasks: FindUserDashboardQuery['FindUserOverdueTasks']
}

export function OverdueTasks({ tasks }: OverdueTasksProps) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle>Overdue Tasks</CardTitle>
					<CardDescription>Tasks that are past their due date</CardDescription>
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
							<TaskItem key={task.id} task={task} showProject isOverdue />
						))
					) : (
						<p className="py-4 text-center text-muted-foreground">
							No overdue tasks
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
