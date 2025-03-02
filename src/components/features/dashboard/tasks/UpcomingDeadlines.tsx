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

interface UpcomingDeadlinesProps {
	tasks: FindUserDashboardQuery['FindUserUpcomingTasks']
}

export function UpcomingDeadlines({ tasks }: UpcomingDeadlinesProps) {
	return (
		<Card className="col-span-1">
			<CardHeader className="flex flex-row items-center justify-between">
				<div>
					<CardTitle>Upcoming Deadlines</CardTitle>
					<CardDescription>Tasks with approaching due dates</CardDescription>
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
							<TaskItem key={task.id} task={task} showProject isCompact />
						))
					) : (
						<p className="py-4 text-center text-muted-foreground">
							No upcoming deadlines
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
