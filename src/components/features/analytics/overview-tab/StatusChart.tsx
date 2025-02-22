'use client'

import { BarChart2 } from 'lucide-react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
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
import { statusColors } from '@/constants/analitics.constants'

interface IStatusChart {
	data: FindProjectAnalyticsQuery['projectAnalytics']['statusDistribution']
}

export function StatusChart({ data }: IStatusChart) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<BarChart2 className="mr-2 h-5 w-5 text-gray-500" />
					Task status
				</CardTitle>
				<CardDescription>Allocation of tasks by status</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							data={[
								{
									name: 'Backlog',
									value: data.backlog,
									color: statusColors.backlog
								},
								{
									name: 'To Do',
									value: data.todo,
									color: statusColors.todo
								},
								{
									name: 'In Progress',
									value: data.inProgress,
									color: statusColors.inProgress
								},
								{
									name: 'Done',
									value: data.done,
									color: statusColors.done
								},
								{
									name: 'Cancelled',
									value: data.cancelled,
									color: statusColors.cancelled
								}
							]}
							layout="vertical"
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis type="number" />
							<YAxis type="category" dataKey="name" />
							<Tooltip
								formatter={value => [`${value} tasks`, 'Quantity']}
								contentStyle={{
									borderRadius: '6px',
									border: '1px solid #e2e8f0',
									boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
								}}
							/>
							<Legend />
							<Bar dataKey="value" radius={[0, 4, 4, 0]}>
								{[
									{
										name: 'Backlog',
										value: data.backlog,
										color: statusColors.backlog
									},
									{
										name: 'To Do',
										value: data.todo,
										color: statusColors.todo
									},
									{
										name: 'In Progress',
										value: data.inProgress,
										color: statusColors.inProgress
									},
									{
										name: 'Done',
										value: data.done,
										color: statusColors.done
									},
									{
										name: 'Cancelled',
										value: data.cancelled,
										color: statusColors.cancelled
									}
								].map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}
