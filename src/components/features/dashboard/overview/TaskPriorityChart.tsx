'use client'

import { Cell, Pie, PieChart } from 'recharts'

import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig
} from '@/components/ui/Chart'
import type { TasksCountByPriorityModel } from '@/graphql/generated/output'

interface TaskPriorityChartProps {
	data: TasksCountByPriorityModel[]
}

export function TaskPriorityChart({ data }: TaskPriorityChartProps) {
	const priorityChartConfig: ChartConfig = {
		high: {
			label: 'High',
			color: 'hsl(var(--chart-1))'
		},
		medium: {
			label: 'Medium',
			color: 'hsl(var(--chart-2))'
		},
		low: {
			label: 'Low',
			color: 'hsl(var(--chart-3))'
		},
		none: {
			label: 'None',
			color: 'hsl(var(--chart-5))'
		}
	}

	const chartData = data
		.filter(item => item.priority)
		.map(item => {
			const priorityKey = item.priority?.toLowerCase() || 'none'
			return {
				name: priorityKey,
				value: item.count,
				fill: `var(--color-${priorityKey})`
			}
		})

	return (
		<ChartContainer config={priorityChartConfig} className="h-full w-full">
			<PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
				<Pie
					data={chartData}
					cx="50%"
					cy="50%"
					innerRadius={60}
					outerRadius={90}
					paddingAngle={2}
					dataKey="value"
					nameKey="name"
					strokeWidth={1}
					stroke="var(--background)"
				>
					{chartData.map(entry => (
						<Cell key={`cell-${entry.name}`} fill={entry.fill} />
					))}
				</Pie>
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent nameKey="name" />} />
			</PieChart>
		</ChartContainer>
	)
}
