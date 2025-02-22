'use client'

import { Tag } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { type FindProjectAnalyticsQuery } from '@/graphql/generated/output'

interface ILabelDistribution {
	data: FindProjectAnalyticsQuery['projectAnalytics']['labelDistribution']
}

export function LabelDistribution({ data }: ILabelDistribution) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<Tag className="mr-2 h-5 w-5 text-gray-500" />
					Labels
				</CardTitle>
				<CardDescription>Top project labels</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-64">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={data.distribution.slice(0, 5)}
								cx="50%"
								cy="50%"
								labelLine={false}
								outerRadius={80}
								fill="#8884d8"
								dataKey="count"
								nameKey="labelName"
								label={({ name, percent }) =>
									`${name}: ${(percent * 100).toFixed(0)}%`
								}
							>
								{data.distribution.slice(0, 5).map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<Tooltip
								formatter={(value, name, props) => [
									`${value} задач (${props.payload.percentage}%)`,
									name
								]}
								contentStyle={{
									borderRadius: '6px',
									border: '1px solid #e2e8f0',
									boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
								}}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className="mt-2 text-center text-sm text-gray-500">
					Total utilization {data.totalLabelsUsed} labels
				</div>
			</CardContent>
		</Card>
	)
}
