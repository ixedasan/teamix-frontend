import { CalendarClock, CheckCircle, Clock, ListTodo } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import type {
	TasksCountByPriorityModel,
	TasksCountByStatusModel,
	TasksDueDateModel
} from '@/graphql/generated/output'
import { TaskDueDateChart } from './TaskDueDateChart'
import { TaskPriorityChart } from './TaskPriorityChart'
import { TaskStatusChart } from './TaskStatusChart'

interface DashboardOverviewProps {
	tasksByStatus: TasksCountByStatusModel[]
	tasksByPriority: TasksCountByPriorityModel[]
	tasksByDueDate: TasksDueDateModel
	totalAssignedTasks: number
}

export function DashboardOverview({
	tasksByStatus,
	tasksByPriority,
	tasksByDueDate,
	totalAssignedTasks
}: DashboardOverviewProps) {
	const totalTasks = tasksByStatus.reduce((sum, item) => sum + item.count, 0)

	const completedTasks =
		tasksByStatus.find(item => item.status === 'DONE')?.count || 0

	const completionRate =
		totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
					<ListTodo className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{totalTasks}</div>
					<p className="text-xs text-muted-foreground">
						Across all your projects
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Assigned to Me</CardTitle>
					<CheckCircle className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{totalAssignedTasks}</div>
					<p className="text-xs text-muted-foreground">
						Tasks requiring your attention
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
					<Clock className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{completionRate}%</div>
					<p className="text-xs text-muted-foreground">
						{completedTasks} of {totalTasks} tasks completed
					</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
					<CalendarClock className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{tasksByDueDate.overdue}</div>
					<p className="text-xs text-muted-foreground">
						Tasks past their due date
					</p>
				</CardContent>
			</Card>

			<Card className="col-span-full md:col-span-2">
				<CardHeader>
					<CardTitle>Tasks by Status</CardTitle>
				</CardHeader>
				<CardContent className="h-[300px]">
					<TaskStatusChart data={tasksByStatus} />
				</CardContent>
			</Card>

			<Card className="md:col-span-1">
				<CardHeader>
					<CardTitle>Tasks by Priority</CardTitle>
				</CardHeader>
				<CardContent className="h-[300px]">
					<TaskPriorityChart data={tasksByPriority} />
				</CardContent>
			</Card>

			<Card className="md:col-span-1">
				<CardHeader>
					<CardTitle>Tasks by Due Date</CardTitle>
				</CardHeader>
				<CardContent className="h-[300px]">
					<TaskDueDateChart data={tasksByDueDate} />
				</CardContent>
			</Card>
		</div>
	)
}
