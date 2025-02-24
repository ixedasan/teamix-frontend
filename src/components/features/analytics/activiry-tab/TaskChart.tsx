'use client'

import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { CheckCircle2 } from 'lucide-react'
import {
	CartesianGrid,
	Line,
	LineChart,
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

interface ITaskChart {
	activity: FindProjectAnalyticsQuery['projectAnalytics']['activity']
}

export function TaskChart({ activity }: ITaskChart) {
	const chartData = activity.tasksCreated.map((item, index) => ({
		date: format(new Date(item.date), 'MMM d', { locale: enUS }),
		created: item.count,
		completed: activity.tasksCompleted[index]?.count || 0
	}))

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg font-semibold">
					<CheckCircle2 className="h-5 w-5 text-muted-foreground" />
					Task Analytics
				</CardTitle>
				<CardDescription className="text-sm text-muted-foreground">
					Daily task creation and completion metrics
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-[350px] w-full">
					<ChartContainer
						config={{
							created: {
								label: 'Tasks Created',
								color: 'hsl(var(--chart-1))'
							},
							completed: {
								label: 'Tasks Completed',
								color: 'hsl(var(--chart-2))'
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
								/>
								<XAxis
									dataKey="date"
									tickLine={false}
									axisLine={false}
									dy={10}
									tick={{ fill: 'hsl(var(--muted-foreground))' }}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									dx={-10}
									tick={{ fill: 'hsl(var(--muted-foreground))' }}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Line
									type="monotone"
									dataKey="created"
									strokeWidth={2}
									dot={false}
									stroke="hsl(var(--chart-1))"
									activeDot={{
										r: 6,
										className:
											'fill-[hsl(var(--chart-1))] stroke-background stroke-2'
									}}
								/>
								<Line
									type="monotone"
									dataKey="completed"
									strokeWidth={2}
									dot={false}
									stroke="hsl(var(--chart-2))"
									activeDot={{
										r: 6,
										className:
											'fill-[hsl(var(--chart-2))] stroke-background stroke-2'
									}}
								/>
								<ChartLegend
									content={
										<ChartLegendContent className="flex justify-center gap-4" />
									}
								/>
							</LineChart>
						</ResponsiveContainer>
					</ChartContainer>
				</div>
			</CardContent>
		</Card>
	)
}
