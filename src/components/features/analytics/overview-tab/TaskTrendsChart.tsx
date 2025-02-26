'use client'

import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { TrendingUp } from 'lucide-react'
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	XAxis,
	YAxis
} from 'recharts'

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
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/Chart'
import type { FindProjectAnalyticsQuery } from '@/graphql/generated/output'

interface ITaskTrendsChart {
	data: FindProjectAnalyticsQuery['projectAnalytics']['taskTrends']
}

export function TaskTrendsChart({ data }: ITaskTrendsChart) {
	const chartData = data.map(item => ({
		date: format(new Date(item.month), 'MMM yyyy', { locale: enUS }),
		created: item.created,
		completed: item.completed,
		rate: item.completionRate
	}))

	const currentRate = chartData[chartData.length - 1]?.rate ?? 0
	const previousRate = chartData[chartData.length - 2]?.rate ?? 0
	const rateChange = currentRate - previousRate

	const hasData = chartData.some(item => item.created > 0 || item.completed > 0)

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<CardTitle className="flex items-center gap-2 text-lg font-semibold">
							<TrendingUp className="h-5 w-5 text-primary" />
							Task Completion Trends
						</CardTitle>
						<CardDescription className="text-sm text-muted-foreground">
							Monthly task creation, completion, and success rate analysis
						</CardDescription>
					</div>
					{chartData.length > 1 && (
						<Badge
							variant="secondary"
							className={
								rateChange > 0
									? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
									: rateChange < 0
										? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
										: 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400'
							}
						>
							{rateChange > 0 ? '↑' : rateChange < 0 ? '↓' : '−'}{' '}
							{Math.abs(rateChange).toFixed(1)}% vs Last Month
						</Badge>
					)}
				</div>
			</CardHeader>
			<CardContent>
				<div className="h-[350px] w-full">
					{hasData ? (
						<ChartContainer
							config={{
								created: {
									label: 'Tasks Created',
									color: 'hsl(var(--chart-1))',
									formatter: (value: number) =>
										`${value} ${value === 1 ? 'task' : 'tasks'} created`
								},
								completed: {
									label: 'Tasks Completed',
									color: 'hsl(var(--chart-2))',
									formatter: (value: number) =>
										`${value} ${value === 1 ? 'task' : 'tasks'} completed`
								},
								rate: {
									label: 'Completion Rate',
									color: 'hsl(var(--chart-4))',
									formatter: (value: number) => `${value}% completion rate`
								}
							}}
						>
							<ResponsiveContainer width="100%" height="100%">
								<LineChart
									data={chartData}
									margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
								>
									<CartesianGrid
										strokeDasharray="3 3"
										className="stroke-muted/20"
										vertical={false}
									/>
									<XAxis
										dataKey="date"
										tickLine={false}
										axisLine={false}
										dy={10}
										tick={{
											fill: 'hsl(var(--muted-foreground))',
											fontSize: 12
										}}
									/>
									<YAxis
										yAxisId="left"
										tickLine={false}
										axisLine={false}
										dx={-10}
										tick={{
											fill: 'hsl(var(--muted-foreground))',
											fontSize: 12
										}}
									/>
									<YAxis
										yAxisId="right"
										orientation="right"
										tickLine={false}
										axisLine={false}
										dx={10}
										tick={{
											fill: 'hsl(var(--muted-foreground))',
											fontSize: 12
										}}
										domain={[0, 100]}
										unit="%"
									/>
									<ChartTooltip
										content={<ChartTooltipContent />}
										cursor={{
											stroke: 'hsl(var(--muted))',
											strokeWidth: 1,
											strokeDasharray: '4 4'
										}}
									/>
									<Line
										yAxisId="left"
										type="monotone"
										dataKey="created"
										stroke="hsl(var(--chart-1))"
										strokeWidth={2}
										dot={{
											r: 4,
											fill: 'hsl(var(--chart-1))',
											strokeWidth: 2,
											stroke: 'hsl(var(--background))'
										}}
										activeDot={{
											r: 6,
											fill: 'hsl(var(--chart-1))',
											stroke: 'hsl(var(--background))',
											strokeWidth: 2
										}}
									/>
									<Line
										yAxisId="left"
										type="monotone"
										dataKey="completed"
										stroke="hsl(var(--chart-2))"
										strokeWidth={2}
										dot={{
											r: 4,
											fill: 'hsl(var(--chart-2))',
											strokeWidth: 2,
											stroke: 'hsl(var(--background))'
										}}
										activeDot={{
											r: 6,
											fill: 'hsl(var(--chart-2))',
											stroke: 'hsl(var(--background))',
											strokeWidth: 2
										}}
									/>
									<Line
										yAxisId="right"
										type="monotone"
										dataKey="rate"
										stroke="hsl(var(--chart-4))"
										strokeWidth={2}
										dot={{
											r: 4,
											fill: 'hsl(var(--chart-4))',
											strokeWidth: 2,
											stroke: 'hsl(var(--background))'
										}}
										activeDot={{
											r: 6,
											fill: 'hsl(var(--chart-4))',
											stroke: 'hsl(var(--background))',
											strokeWidth: 2
										}}
									/>
									<ChartLegend
										content={
											<ChartLegendContent className="flex justify-center gap-4 pt-6" />
										}
									/>
								</LineChart>
							</ResponsiveContainer>
						</ChartContainer>
					) : (
						<div className="flex h-full items-center justify-center">
							<p className="text-center text-muted-foreground">
								No task trends data available
							</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
