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
import type { TasksDueDateModel } from '@/graphql/generated/output'

interface TaskDueDateChartProps {
	data: TasksDueDateModel
}

export function TaskDueDateChart({ data }: TaskDueDateChartProps) {
	const dueDateChartConfig: ChartConfig = {
		overdue: {
			label: 'Overdue',
			color: 'hsl(var(--chart-1))'
		},
		dueToday: {
			label: 'Due Today',
			color: 'hsl(var(--chart-2))'
		},
		dueThisWeek: {
			label: 'This Week',
			color: 'hsl(var(--chart-3))'
		},
		upcoming: {
			label: 'Upcoming',
			color: 'hsl(var(--chart-4))'
		},
		noDueDate: {
			label: 'No Due Date',
			color: 'hsl(var(--chart-5))'
		}
	}

	const chartData = [
		{ name: 'overdue', value: data.overdue },
		{ name: 'dueToday', value: data.dueToday },
		{ name: 'dueThisWeek', value: data.dueThisWeek },
		{ name: 'upcoming', value: data.upcoming },
		{ name: 'noDueDate', value: data.noDueDate }
	].filter(item => item.value > 0) // Only show non-zero values

	return (
		<ChartContainer config={dueDateChartConfig} className="h-full w-full">
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
						<Cell
							key={`cell-${entry.name}`}
							fill={`var(--color-${entry.name})`}
						/>
					))}
				</Pie>
				<ChartTooltip content={<ChartTooltipContent />} />
				<ChartLegend content={<ChartLegendContent nameKey="name" />} />
			</PieChart>
		</ChartContainer>
	)
}
