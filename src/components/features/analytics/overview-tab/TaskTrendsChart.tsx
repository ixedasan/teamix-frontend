'use client'

import { TrendingUp } from 'lucide-react'
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { type FindProjectAnalyticsQuery } from '@/graphql/generated/output'

interface ITaskTrendsChart {
	data: FindProjectAnalyticsQuery['projectAnalytics']['taskTrends']
}

export function TaskTrendsChart({ data }: ITaskTrendsChart) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<TrendingUp className="mr-2 h-5 w-5 text-gray-500" />
					Task Trends
				</CardTitle>
				<CardDescription>
					Dynamics of task creation and fulfillment by months
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							data={data}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="month" />
							<YAxis yAxisId="left" />
							<YAxis yAxisId="right" orientation="right" />
							<Tooltip
								formatter={(value, name) => {
									if (name === 'created') return [`${value} tasks`, 'Created']
									if (name === 'completed')
										return [`${value} tasks`, 'Completed']
									if (name === 'completionRate')
										return [`${value}%`, 'Completion rate']
									return [value, name]
								}}
								contentStyle={{
									borderRadius: '6px',
									border: '1px solid #e2e8f0',
									boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
								}}
							/>
							<Legend />
							<Line
								yAxisId="left"
								type="monotone"
								dataKey="created"
								stroke="#3B82F6"
								activeDot={{ r: 8 }}
								name="created"
							/>
							<Line
								yAxisId="left"
								type="monotone"
								dataKey="completed"
								stroke="#10B981"
								name="completed"
							/>
							<Line
								yAxisId="right"
								type="monotone"
								dataKey="completionRate"
								stroke="#8B5CF6"
								name="completionRate"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}
