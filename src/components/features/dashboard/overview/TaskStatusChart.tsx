'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig
} from '@/components/ui/Chart'
import type { TasksCountByStatusModel } from '@/graphql/generated/output'

interface TaskStatusChartProps {
	data: TasksCountByStatusModel[]
}

export function TaskStatusChart({ data }: TaskStatusChartProps) {
	const statusChartConfig: ChartConfig = {
		todo: {
			label: 'Todo',
			color: 'hsl(var(--chart-2))'
		},
		in_progress: {
			label: 'In Progress',
			color: 'hsl(var(--chart-3))'
		},
		done: {
			label: 'Done',
			color: 'hsl(var(--chart-4))'
		},
		backlog: {
			label: 'Backlog',
			color: 'hsl(var(--chart-1))'
		}
	}

	const chartData = data.map(item => {
		const statusKey = item.status.toLowerCase()
		const statusLabel =
			item.status === 'IN_PROGRESS'
				? 'In Progress'
				: item.status.charAt(0) + item.status.slice(1).toLowerCase()

		return {
			name: statusLabel,
			[statusKey]: item.count
		}
	})

	return (
		<ChartContainer config={statusChartConfig} className="h-full w-full">
			<BarChart
				data={chartData}
				layout="vertical"
				margin={{ left: 70, right: 30, top: 10, bottom: 10 }}
				barGap={2}
			>
				<CartesianGrid horizontal strokeDasharray="3 3" opacity={0.3} />
				<XAxis
					type="number"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					fontSize={11}
					tickFormatter={value => value.toString()}
				/>
				<YAxis
					type="category"
					dataKey="name"
					tickLine={false}
					axisLine={false}
					fontSize={11}
					width={65}
				/>
				<ChartTooltip
					content={<ChartTooltipContent />}
					cursor={{ fill: 'var(--tooltip-bg)', opacity: 0.1 }}
				/>
				{data.map(item => {
					const key = item.status.toLowerCase()
					return (
						<Bar
							key={key}
							dataKey={key}
							radius={[4, 4, 4, 4]}
							barSize={24}
							fill={`var(--color-${key})`}
						></Bar>
					)
				})}
			</BarChart>
		</ChartContainer>
	)
}
