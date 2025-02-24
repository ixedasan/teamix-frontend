'use client'

import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { MessageSquare } from 'lucide-react'
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
	ChartTooltip,
	ChartTooltipContent
} from '@/components/ui/Chart'
import type { FindProjectAnalyticsQuery } from '@/graphql/generated/output'

interface ICommentsChart {
	activity: FindProjectAnalyticsQuery['projectAnalytics']['activity']
}

export function CommentsChart({ activity }: ICommentsChart) {
	const chartData = activity.comments.map(item => ({
		date: format(new Date(item.date), 'MMM d', { locale: enUS }),
		count: item.count
	}))

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg font-semibold">
					<MessageSquare className="h-5 w-5 text-primary" />
					Comment Activity
				</CardTitle>
				<CardDescription className="text-sm text-muted-foreground">
					Daily comment engagement metrics
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-[350px] w-full">
					<ChartContainer
						config={{
							count: {
								label: 'Comments',
								color: 'hsl(var(--chart-4))'
							}
						}}
					>
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
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
								<ChartTooltip
									cursor={{ fill: 'hsl(var(--muted)/0.1)' }}
									content={<ChartTooltipContent />}
								/>
								<Bar
									dataKey="count"
									fill="hsl(var(--chart-4))"
									radius={[4, 4, 0, 0]}
									maxBarSize={50}
								/>
							</BarChart>
						</ResponsiveContainer>
					</ChartContainer>
				</div>
			</CardContent>
		</Card>
	)
}
