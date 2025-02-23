'use client'

import { useState } from 'react'
import { PieChartIcon } from 'lucide-react'
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip
} from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { type FindProjectAnalyticsQuery } from '@/graphql/generated/output'

interface IStatusPieChart {
	statusDistribution: FindProjectAnalyticsQuery['projectAnalytics']['statusDistribution']
}

export function StatusPieChart({ statusDistribution }: IStatusPieChart) {
	const [viewType, setViewType] = useState('percentage')

	const data = [
		{
			name: 'Backlog',
			value: statusDistribution.backlog,
			color: '#6B7280'
		},
		{
			name: 'To Do',
			value: statusDistribution.todo,
			color: '#3B82F6'
		},
		{
			name: 'In Progress',
			value: statusDistribution.inProgress,
			color: '#F59E0B'
		},
		{
			name: 'Done',
			value: statusDistribution.done,
			color: '#10B981'
		},
		{
			name: 'Cancelled',
			value: statusDistribution.cancelled,
			color: '#EF4444'
		}
	]

	const total = data.reduce((sum, item) => sum + item.value, 0)

	return (
		<Card className="relative overflow-hidden">
			<CardHeader className="space-y-4">
				<CardTitle className="flex items-center">
					<PieChartIcon className="mr-2 h-5 w-5 text-muted-foreground" />
					Distribution by status
				</CardTitle>
				<CardDescription>
					Visualization of task distribution by status
				</CardDescription>
				<Tabs
					defaultValue="percentage"
					className="w-full"
					onValueChange={setViewType}
				>
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="percentage">Percentages</TabsTrigger>
						<TabsTrigger value="absolute">Quantity</TabsTrigger>
					</TabsList>
				</Tabs>
			</CardHeader>
			<CardContent>
				<div className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								labelLine={false}
								outerRadius={100}
								innerRadius={60}
								fill="currentColor"
								dataKey="value"
								nameKey="name"
								strokeWidth={0}
								label={({ value, percent, x, y }) => (
									<text
										x={x}
										y={y}
										fill="currentColor"
										textAnchor="middle"
										dominantBaseline="middle"
										className="text-xs font-medium"
									>
										{viewType === 'percentage'
											? `${(percent * 100).toFixed(1)}%`
											: value}
									</text>
								)}
							>
								{data.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={entry.color}
										className="transition-opacity duration-300 hover:opacity-80"
									/>
								))}
							</Pie>
							<Tooltip
								content={({ active, payload }) => {
									if (active && payload && payload.length) {
										const data = payload[0].payload
										return (
											<div className="rounded-lg bg-card p-3 shadow-md ring-1 ring-border">
												<p className="font-medium">{data.name}</p>
												<p className="text-sm text-muted-foreground">
													{data.value} tasks (
													{((data.value / total) * 100).toFixed(1)}%)
												</p>
											</div>
										)
									}
									return null
								}}
							/>
							<Legend
								verticalAlign="bottom"
								height={36}
								formatter={value => (
									<span className="text-sm text-muted-foreground">{value}</span>
								)}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>
			</CardContent>
		</Card>
	)
}
