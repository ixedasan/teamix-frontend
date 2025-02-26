'use client'

import { type FindProjectAnalyticsQuery } from '@/graphql/generated/output'
import { ActivitySummary } from './ActivitySummary'
import { CommentsChart } from './CommentsChart'
import { TaskChart } from './TaskChart'

interface IActivityTab {
	data: FindProjectAnalyticsQuery['projectAnalytics']
}

export function ActivityTab({ data }: IActivityTab) {
	return (
		<div className="space-y-6">
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<TaskChart activity={data.activity} />
				<CommentsChart activity={data.activity} />
			</div>
			<ActivitySummary activity={data.activity} />
		</div>
	)
}
