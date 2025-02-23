'use client'

import { type FindProjectAnalyticsQuery } from '@/graphql/generated/output'
import { ActivityChart } from './ActivityChart'
import { TeamTable } from './TeamTable'
import { TopMembers } from './TopMembers'

interface ITeamTab {
	data: FindProjectAnalyticsQuery['projectAnalytics']
}

export function TeamTab({ data }: ITeamTab) {
	return (
		<div className="space-y-6">
			<TeamTable memberProductivity={data.memberProductivity} />
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<ActivityChart activity={data.activity} />
				<TopMembers memberProductivity={data.memberProductivity} />
			</div>
		</div>
	)
}
