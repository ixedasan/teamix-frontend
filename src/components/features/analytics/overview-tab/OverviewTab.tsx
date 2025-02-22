'use client'

import { CheckCircle2, Clock, MessageSquare, Users } from 'lucide-react'

import { type FindProjectAnalyticsQuery } from '@/graphql/generated/output'
import { LabelDistribution } from './LabelDistribution'
import { PriorityDistribution } from './PriorityDistribution'
import { StatCard } from './StatCard'
import { StatusChart } from './StatusChart'
import { TaskTrendsChart } from './TaskTrendsChart'

interface IOverviewTab {
	data: FindProjectAnalyticsQuery['projectAnalytics']
}

export function OverviewTab({ data }: IOverviewTab) {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="Total tasks"
					value={data.statistics.totalTasks}
					description={`${data.statistics.completedTasks} accomplished`}
					icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
					trend={data.statistics.taskGrowthRate}
					trendLabel="increment"
				/>
				<StatCard
					title="Task fulfillment"
					value={`${data.statistics.completionRate}%`}
					description={`${data.statistics.overdueTasks} overdue`}
					icon={<Clock className="h-4 w-4 text-amber-500" />}
					trend={data.statistics.avgCompletionTime > 0 ? -5 : 5}
					trendLabel="from last month"
				/>
				<StatCard
					title="Participants"
					value={data.statistics.totalMembers}
					description={`${data.memberProductivity.filter(m => m.lastActive).length} active`}
					icon={<Users className="h-4 w-4 text-blue-500" />}
				/>
				<StatCard
					title="Comments"
					value={data.statistics.totalComments}
					description={`${data.statistics.totalDocuments} documents`}
					icon={<MessageSquare className="h-4 w-4 text-purple-500" />}
				/>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<StatusChart data={data.statusDistribution} />
				<TaskTrendsChart data={data.taskTrends} />
				<PriorityDistribution data={data.priorityDistribution} />
				<LabelDistribution data={data.labelDistribution} />
			</div>
		</div>
	)
}
