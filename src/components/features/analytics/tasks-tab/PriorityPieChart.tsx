'use client'

import { useState } from 'react'
import { Flag } from 'lucide-react'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/Chart'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { type FindProjectAnalyticsQuery } from '@/graphql/generated/output'

interface IPriorityPieChart {
	priorityDistribution: FindProjectAnalyticsQuery['projectAnalytics']['priorityDistribution']
}

export function PriorityPieChart({ priorityDistribution }: IPriorityPieChart) {
	const [viewType, setViewType] = useState('percentage')

	const data = [
		{
			name: 'None',
			value: priorityDistribution.none,
			color: 'hsl(var(--chart-1))'
		},
		{
			name: 'Low',
			value: priorityDistribution.low,
			color: 'hsl(var(--chart-2))'
		},
		{
			name: 'Medium',
			value: priorityDistribution.medium,
			color: 'hsl(var(--chart-3))'
		},
		{
			name: 'High',
			value: priorityDistribution.high,
			color: 'hsl(var(--chart-4))'
		},
		{
			name: 'Urgent',
			value: priorityDistribution.urgent,
			color: 'hsl(var(--chart-5))'
		}
	]

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg font-semibold">
					<Flag className="h-5 w-5 text-primary" />
					Distribution by priority
				</CardTitle>
				<CardDescription className="text-sm text-muted-foreground">
					Visualization of task distribution by priority
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
				<div className="h-[350px] w-full">
					<ChartContainer
						config={Object.fromEntries(
							data.map(item => [
								item.name.toLowerCase(),
								{ label: item.name, color: item.color }
							])
						)}
					>
						<ResponsiveContainer width="100%" height="100%">
							<PieChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
								<Pie
									data={data}
									cx="50%"
									cy="50%"
									labelLine={false}
									outerRadius={120}
									innerRadius={70}
									fill="currentColor"
									dataKey="value"
									nameKey="name"
									strokeWidth={1}
									stroke="hsl(var(--background))"
									label={({ value, percent, x, y }) => (
										<text
											x={x}
											y={y}
											fill="hsl(var(--foreground))"
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
											className="transition-opacity duration-200 hover:opacity-80"
										/>
									))}
								</Pie>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Legend
									verticalAlign="bottom"
									height={36}
									layout="horizontal"
									align="center"
									formatter={value => (
										<span className="text-xs text-muted-foreground">
											{value}
										</span>
									)}
									iconSize={10}
									iconType="circle"
								/>
							</PieChart>
						</ResponsiveContainer>
					</ChartContainer>
				</div>
			</CardContent>
		</Card>
	)
}
