'use client'

import { Flag } from 'lucide-react'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import { FindProjectAnalyticsQuery } from '@/graphql/generated/output'

interface IPriorityDistribution {
	data: FindProjectAnalyticsQuery['projectAnalytics']['priorityDistribution']
}

export function PriorityDistribution({ data }: IPriorityDistribution) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<Flag className="mr-2 h-5 w-5 text-gray-500" />
					Prioritization
				</CardTitle>
				<CardDescription>Number of tasks by priority level</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<div className="mr-2 h-3 w-3 rounded-full bg-slate-400"></div>
							<span>None</span>
						</div>
						<span className="font-medium">{data.none}</span>
					</div>
					<div>
						<div className="mb-1 flex justify-between text-sm">
							<span>Low</span>
							<span>
								{data.low} tasks (
								{Math.round((data.low / data.totalTasks) * 100)}
								%)
							</span>
						</div>
						<Progress
							value={(data.low / data.totalTasks) * 100}
							className="h-2 bg-gray-100"
							indicatorClassName="bg-green-500"
						/>
					</div>
					<div>
						<div className="mb-1 flex justify-between text-sm">
							<span>Medium</span>
							<span>
								{data.medium} tasks (
								{Math.round((data.medium / data.totalTasks) * 100)}
								%)
							</span>
						</div>
						<Progress
							value={(data.medium / data.totalTasks) * 100}
							className="h-2 bg-gray-100"
							indicatorClassName="bg-amber-500"
						/>
					</div>
					<div>
						<div className="mb-1 flex justify-between text-sm">
							<span>High</span>
							<span>
								{data.high} tasks (
								{Math.round((data.high / data.totalTasks) * 100)}
								%)
							</span>
						</div>
						<Progress
							value={(data.high / data.totalTasks) * 100}
							className="h-2 bg-gray-100"
							indicatorClassName="bg-orange-500"
						/>
					</div>
					<div>
						<div className="mb-1 flex justify-between text-sm">
							<span>Uegent</span>
							<span>
								{data.urgent} tasks (
								{Math.round((data.urgent / data.totalTasks) * 100)}
								%)
							</span>
						</div>
						<Progress
							value={(data.urgent / data.totalTasks) * 100}
							className="h-2 bg-gray-100"
							indicatorClassName="bg-red-500"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
