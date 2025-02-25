'use client'

import { CheckCircle2, MessageSquare, Users } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/Card'
import type { FindProjectAnalyticsQuery } from '@/graphql/generated/output'
import { cn } from '@/lib/utils'

interface IActivityData {
	activity: FindProjectAnalyticsQuery['projectAnalytics']['activity']
}

const statCards = [
	{
		title: 'Created tasks',
		icon: CheckCircle2,
		color: 'text-blue-500',
		bgColor: 'bg-blue-500/10',
		getValue: (activity: IActivityData['activity']) =>
			activity.tasksCreated.reduce((sum, item) => sum + item.count, 0)
	},
	{
		title: 'Completed tasks',
		icon: CheckCircle2,
		color: 'text-green-500',
		bgColor: 'bg-green-500/10',
		getValue: (activity: IActivityData['activity']) =>
			activity.tasksCompleted.reduce((sum, item) => sum + item.count, 0)
	},
	{
		title: 'Comments',
		icon: MessageSquare,
		color: 'text-purple-500',
		bgColor: 'bg-purple-500/10',
		getValue: (activity: IActivityData['activity']) =>
			activity.comments.reduce((sum, item) => sum + item.count, 0)
	},
	{
		title: 'Active participants',
		icon: Users,
		color: 'text-orange-500',
		bgColor: 'bg-orange-500/10',
		getValue: (activity: IActivityData['activity']) =>
			Math.max(...activity.activeUsers.map(item => item.count))
	}
]

export const StatCards = ({ activity }: IActivityData) => {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			{statCards.map((stat, index) => (
				<Card key={index}>
					<CardContent className="p-6">
						<div className="flex items-center justify-between">
							<div className="space-y-2">
								<p className="text-sm text-muted-foreground">{stat.title}</p>
								<p className="text-3xl font-bold tabular-nums">
									{stat.getValue(activity)}
								</p>
							</div>
							<div className={cn('rounded-full p-2', stat.bgColor, stat.color)}>
								<stat.icon className="h-5 w-5" />
							</div>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}
