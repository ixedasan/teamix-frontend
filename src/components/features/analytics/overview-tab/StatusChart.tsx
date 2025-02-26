'use client'

import { BarChart2 } from 'lucide-react'
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
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
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/Chart'
import type { FindProjectAnalyticsQuery } from '@/graphql/generated/output'

interface IStatusChart {
	data: FindProjectAnalyticsQuery['projectAnalytics']['statusDistribution']
}

export function StatusChart({ data }: IStatusChart) {
	const statuses = [
		{
			id: 'backlog',
			name: 'Backlog',
			value: data.backlog,
			color: 'hsl(var(--chart-1))'
		},
		{
			id: 'todo',
			name: 'To Do',
			value: data.todo,
			color: 'hsl(var(--chart-2))'
		},
		{
			id: 'in_progress',
			name: 'In Progress',
			value: data.inProgress,
			color: 'hsl(var(--chart-3))'
		},
		{
			id: 'done',
			name: 'Done',
			value: data.done,
			color: 'hsl(var(--chart-4))'
		},
		{
			id: 'cancelled',
			name: 'Cancelled',
			value: data.cancelled,
			color: 'hsl(var(--chart-5))'
		}
	]

	const valueFormatter = (value: number) =>
		`${value} ${value === 1 ? 'task' : 'tasks'}`

	const chartData = statuses.map(status => ({
		name: status.name,
		[status.id]: status.value
	}))

	const config = statuses.reduce(
		(acc, status) => {
			acc[status.id] = {
				label: status.name,
				color: status.color,
				formatter: valueFormatter
			}
			return acc
		},
		{} as Record<
			string,
			{ label: string; color: string; formatter: (value: number) => string }
		>
	)

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg font-semibold">
					<BarChart2 className="h-5 w-5 text-primary" />
					Task Distribution
				</CardTitle>
				<CardDescription className="text-sm text-muted-foreground">
					Current allocation of tasks by status
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-[350px] w-full">
					<ChartContainer config={config}>
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={chartData}
								layout="vertical"
								margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
								barGap={2}
								barSize={32}
							>
								<CartesianGrid
									strokeDasharray="3 3"
									className="stroke-muted/20"
									strokeWidth={2}
								/>
								<XAxis
									type="number"
									tickLine={false}
									axisLine={false}
									tick={{
										fill: 'hsl(var(--muted-foreground))',
										fontSize: 12
									}}
									tickMargin={8}
								/>
								<YAxis
									type="category"
									dataKey="name"
									tickLine={false}
									axisLine={false}
									tick={{
										fill: 'hsl(var(--muted-foreground))',
										fontSize: 12
									}}
									tickMargin={8}
									interval={0}
								/>
								<ChartTooltip
									content={<ChartTooltipContent />}
									cursor={{
										fill: 'hsl(var(--muted)/0.1)',
										radius: 4
									}}
								/>
								{statuses.map(status => (
									<Bar
										key={status.id}
										dataKey={status.id}
										fill={status.color}
										radius={[0, 4, 4, 0]}
										strokeWidth={0}
									/>
								))}
								<ChartLegend
									content={
										<ChartLegendContent className="flex justify-center gap-4 pt-6" />
									}
								/>
							</BarChart>
						</ResponsiveContainer>
					</ChartContainer>
				</div>
			</CardContent>
		</Card>
	)
}
