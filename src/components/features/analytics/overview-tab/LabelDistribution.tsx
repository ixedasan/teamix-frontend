'use client'

import { useState } from 'react'
import { Info, Tag } from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer, Sector } from 'recharts'

import { Badge } from '@/components/ui/Badge'
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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/Tooltip'
import type { FindProjectAnalyticsQuery } from '@/graphql/generated/output'

interface ILabelDistribution {
	data: FindProjectAnalyticsQuery['projectAnalytics']['labelDistribution']
}

export function LabelDistribution({ data }: ILabelDistribution) {
	const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)

	// Prepare chart data (top 5 labels)
	const chartData = data.distribution
		.slice(0, 5)
		.map(item => ({
			name: item.labelName,
			value: item.count,
			color: item.color,
			percentage: item.percentage
		}))
		.sort((a, b) => b.value - a.value)

	// Create a "Others" category if there are more than 5 labels
	const otherLabels = data.distribution.slice(5)
	if (otherLabels.length > 0) {
		const otherCount = otherLabels.reduce((sum, item) => sum + item.count, 0)
		const otherPercentage = otherLabels.reduce(
			(sum, item) => sum + item.percentage,
			0
		)

		chartData.push({
			name: 'Others',
			value: otherCount,
			color: '#94a3b8', // slate-400
			percentage: otherPercentage
		})
	}

	const config = chartData.reduce(
		(acc, item) => {
			acc[item.name.toLowerCase()] = {
				label: item.name,
				color: item.color,
				formatter: (value: number) =>
					`${value} ${value === 1 ? 'task' : 'tasks'} (${item.percentage.toFixed(1)}%)`
			}
			return acc
		},
		{} as Record<
			string,
			{ label: string; color: string; formatter: (value: number) => string }
		>
	)

	// Active sector renderer for hover effect
	const renderActiveShape = (props: any) => {
		const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
			props

		return (
			<g>
				<Sector
					cx={cx}
					cy={cy}
					innerRadius={innerRadius}
					outerRadius={outerRadius + 6}
					startAngle={startAngle}
					endAngle={endAngle}
					fill={fill}
					strokeWidth={0}
				/>
			</g>
		)
	}

	const onPieEnter = (_: any, index: number) => {
		setActiveIndex(index)
	}

	const onPieLeave = () => {
		setActiveIndex(undefined)
	}

	return (
		<Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg font-semibold">
					<Tag className="h-5 w-5 text-primary" />
					Label Distribution
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Info className="ml-1 h-4 w-4 cursor-help text-muted-foreground opacity-70 transition-opacity hover:opacity-100" />
							</TooltipTrigger>
							<TooltipContent>
								<p className="max-w-xs text-xs">
									Shows how your tasks are distributed across different labels
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</CardTitle>
				<CardDescription className="text-sm text-muted-foreground">
					{chartData.length > 5
						? 'Top 5 most used labels and others'
						: 'Top most used project labels'}
				</CardDescription>
			</CardHeader>
			<CardContent className="px-4 pb-6 pt-2">
				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					<ChartContainer config={config}>
						<ResponsiveContainer width="100%" height="100%">
							<PieChart>
								<Pie
									activeIndex={activeIndex}
									activeShape={renderActiveShape}
									data={chartData}
									cx="50%"
									cy="50%"
									innerRadius={50}
									outerRadius={80}
									paddingAngle={2}
									dataKey="value"
									onMouseEnter={onPieEnter}
									onMouseLeave={onPieLeave}
								>
									{chartData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={entry.color}
											className="stroke-background stroke-2 transition-all duration-300 hover:opacity-90"
										/>
									))}
								</Pie>
								<ChartTooltip
									content={<ChartTooltipContent />}
									cursor={false}
								/>
							</PieChart>
						</ResponsiveContainer>
					</ChartContainer>

					<div className="flex flex-col justify-center gap-3">
						{chartData.map((item, index) => (
							<div
								key={item.name}
								className={`flex items-center justify-between gap-2 rounded-md p-2 transition-colors duration-200 ${
									activeIndex === index ? 'bg-muted/50' : ''
								}`}
								onMouseEnter={() => setActiveIndex(index)}
								onMouseLeave={() => setActiveIndex(undefined)}
							>
								<div className="flex items-center gap-2">
									<div
										className="h-4 w-4 rounded-full"
										style={{ backgroundColor: item.color }}
									/>
									<span className="text-sm font-medium">{item.name}</span>
								</div>
								<Badge
									variant="secondary"
									className="font-mono text-xs font-medium"
								>
									{item.value} {item.value === 1 ? 'task' : 'tasks'} (
									{item.percentage.toFixed(1)}%)
								</Badge>
							</div>
						))}
						<div className="mt-4 rounded-md bg-muted/30 p-3 text-center text-sm">
							<span className="font-medium">Total:</span>{' '}
							<span className="text-muted-foreground">
								{data.totalLabelsUsed} labels across all tasks
							</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
