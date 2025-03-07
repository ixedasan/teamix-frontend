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
			<CardHeader>
				<CardTitle>Upcoming Deadlines</CardTitle>
				<CardDescription>Tasks with approaching due dates</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{tasks.length > 0 ? (
						tasks.map(task => (
							// @ts-ignore
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
