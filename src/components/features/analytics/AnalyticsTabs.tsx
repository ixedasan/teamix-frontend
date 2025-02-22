import {
	Activity,
	BarChart2,
	Calendar,
	PieChartIcon,
	UserSquare
} from 'lucide-react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { FindProjectAnalyticsQuery } from '@/graphql/generated/output'
import { OverviewTab } from './overview-tab/OverviewTab'

interface IAnalyticsTabs {
	activeTab: string
	onTabChange: (tab: string) => void
	data: FindProjectAnalyticsQuery['projectAnalytics']
}

export function AnalyticsTabs({
	activeTab,
	onTabChange,
	data
}: IAnalyticsTabs) {
	return (
		<Tabs value={activeTab} onValueChange={onTabChange} className="space-y-8">
			<TabsList className="w-full justify-start">
				<TabsTrigger value="overview" className="flex items-center">
					<BarChart2 className="mr-2 h-4 w-4" />
					<span>Overview</span>
				</TabsTrigger>
				<TabsTrigger value="team" className="flex items-center">
					<UserSquare className="mr-2 h-4 w-4" />
					<span>Team</span>
				</TabsTrigger>
				<TabsTrigger value="tasks" className="flex items-center">
					<PieChartIcon className="mr-2 h-4 w-4" />
					<span>Tasks</span>
				</TabsTrigger>
				<TabsTrigger value="activity" className="flex items-center">
					<Activity className="mr-2 h-4 w-4" />
					<span>Activity</span>
				</TabsTrigger>
				<TabsTrigger value="timeline" className="flex items-center">
					<Calendar className="mr-2 h-4 w-4" />
					<span>Timeline</span>
				</TabsTrigger>
			</TabsList>

			<TabsContent value="overview">
				<OverviewTab data={data} />
			</TabsContent>
			<TabsContent value="team">{/* <TeamTab data={data} /> */}</TabsContent>
			<TabsContent value="tasks">{/* <TasksTab data={data} /> */}</TabsContent>
			<TabsContent value="activity">
				{/* <ActivityTab data={data} /> */}
			</TabsContent>
			<TabsContent value="timeline">
				{/* <TimelineTab data={data} /> */}
			</TabsContent>
		</Tabs>
	)
}
