'use client'

import { useMemo, useState } from 'react'
import { format, parseISO } from 'date-fns'
import {
	Activity,
	ArrowDownRight,
	ArrowUpRight,
	TrendingUp,
	Users
} from 'lucide-react'
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/Select'
import { FindProjectAnalyticsQuery } from '@/graphql/generated/output'

interface IActivityChart {
	activity: FindProjectAnalyticsQuery['projectAnalytics']['activity']
}

export function ActivityChart({ activity }: IActivityChart) {
	const [timeRange, setTimeRange] = useState('week')

	const formattedData = useMemo(
		() =>
			activity.activeUsers.map(item => ({
				...item,
				date: format(parseISO(item.date), 'MMM d')
			})),
		[activity.activeUsers]
	)

	// Calculate statistics
	const currentCount =
		activity.activeUsers[activity.activeUsers.length - 1]?.count || 0
	const previousCount =
		activity.activeUsers[activity.activeUsers.length - 2]?.count || 0
	const percentageChange = previousCount
		? ((currentCount - previousCount) / previousCount) * 100
		: 0
	const isPositiveChange = percentageChange >= 0

	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<CardTitle className="flex items-center text-xl">
							<Activity className="mr-2 h-5 w-5 text-primary" />
							Participant Activity
						</CardTitle>
						<CardDescription>
							Track daily active user engagement
						</CardDescription>
					</div>
					<Select value={timeRange} onValueChange={setTimeRange}>
						<SelectTrigger className="w-32">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="day">24 hours</SelectItem>
							<SelectItem value="week">7 days</SelectItem>
							<SelectItem value="month">30 days</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div className="grid grid-cols-2 gap-4">
						<Card className="p-4">
							<div className="flex items-center gap-2">
								<Users className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm font-medium">
									Current Active Users
								</span>
							</div>
							<div className="mt-2 flex items-center gap-2">
								<span className="text-2xl font-bold">{currentCount}</span>
								<div
									className={`flex items-center text-sm ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}
								>
									{isPositiveChange ? (
										<ArrowUpRight className="h-4 w-4" />
									) : (
										<ArrowDownRight className="h-4 w-4" />
									)}
									{Math.abs(percentageChange).toFixed(1)}%
								</div>
							</div>
						</Card>
						<Card className="p-4">
							<div className="flex items-center gap-2">
								<TrendingUp className="h-4 w-4 text-muted-foreground" />
								<span className="text-sm font-medium">Average Users</span>
							</div>
							<div className="mt-2">
								<span className="text-2xl font-bold">
									{Math.round(
										activity.activeUsers.reduce(
											(acc, curr) => acc + curr.count,
											0
										) / activity.activeUsers.length
									)}
								</span>
							</div>
						</Card>
					</div>

					<div className="h-80">
						<ResponsiveContainer width="100%" height="100%">
							<AreaChart
								data={formattedData}
								margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
							>
								<defs>
									<linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
										<stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
										<stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
									</linearGradient>
								</defs>
								<XAxis
									dataKey="date"
									tick={{ fontSize: 12 }}
									tickLine={false}
									axisLine={false}
								/>
								<YAxis
									tick={{ fontSize: 12 }}
									tickLine={false}
									axisLine={false}
									width={40}
								/>
								<Tooltip
									content={({ active, payload }) => {
										if (active && payload && payload.length) {
											return (
												<div className="rounded-lg border bg-background p-2 shadow-sm">
													<div className="grid grid-cols-2 gap-2">
														<div className="flex flex-col">
															<span className="text-sm font-medium text-muted-foreground">
																Date
															</span>
															<span className="font-medium">
																{payload[0].payload.date}
															</span>
														</div>
														<div className="flex flex-col">
															<span className="text-sm font-medium text-muted-foreground">
																Users
															</span>
															<span className="font-medium">
																{payload[0].value}
															</span>
														</div>
													</div>
												</div>
											)
										}
										return null
									}}
								/>
								<Area
									type="monotone"
									dataKey="count"
									stroke="#3B82F6"
									strokeWidth={2}
									fill="url(#colorCount)"
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
