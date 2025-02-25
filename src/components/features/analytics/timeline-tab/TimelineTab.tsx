'use client'

import { type FindProjectAnalyticsQuery } from '@/graphql/generated/output'
import { MonthTrends } from './MonthTrends'
import { ProjectStatus } from './ProjectStatus'
import { Timeline } from './Timeline'

interface ITimelineTab {
	data: FindProjectAnalyticsQuery['projectAnalytics']
}

export function TimelineTab({ data }: ITimelineTab) {
	return (
		<div className="space-y-6">
			<Timeline timeline={data.timeline} />
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<ProjectStatus analytics={data} />
				<MonthTrends taskTrends={data.taskTrends} />
			</div>
		</div>
	)
}
