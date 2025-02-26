'use client'

import { Clock8 } from 'lucide-react'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { type FindProjectAnalyticsQuery } from '@/graphql/generated/output'
import { LabelsTable } from './LabelsTable'
import { PriorityPieChart } from './PriorityPieChart'
import { StatusPieChart } from './StatusPieChart'

interface ITasksTab {
	data: FindProjectAnalyticsQuery['projectAnalytics']
}

export function TasksTab({ data }: ITasksTab) {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<StatusPieChart statusDistribution={data.statusDistribution} />
				<PriorityPieChart priorityDistribution={data.priorityDistribution} />
			</div>
			<LabelsTable labelDistribution={data.labelDistribution} />
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg font-semibold">
						<Clock8 className="h-5 w-5 text-primary" />
						Average time to complete tasks
					</CardTitle>
					<CardDescription>
						Statistics on task completion time (in days)
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center p-6">
						<div className="space-y-2 text-center">
							<div className="text-4xl font-bold text-primary">
								{data.statistics.avgCompletionTime}
							</div>
							<div className="text-sm text-muted-foreground">
								days on average to complete a task
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
