'use client'

import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { ArrowDown, ArrowUp, Minus, TrendingUp } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/Table'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/Tooltip'
import type { FindProjectAnalyticsQuery } from '@/graphql/generated/output'

interface IMonthTrends {
	taskTrends: FindProjectAnalyticsQuery['projectAnalytics']['taskTrends']
}

export function MonthTrends({ taskTrends }: IMonthTrends) {
	const getProgressColor = (rate: number) => {
		if (rate >= 75) return 'bg-emerald-500'
		if (rate >= 50) return 'bg-amber-500'
		return 'bg-red-500'
	}

	const getTrendIndicator = (current: number, previous: number) => {
		const diff = ((current - previous) / previous) * 100
		if (Math.abs(diff) < 1) return { icon: Minus, color: 'text-gray-500' }
		return diff > 0
			? { icon: ArrowUp, color: 'text-emerald-500' }
			: { icon: ArrowDown, color: 'text-red-500' }
	}

	const formatMonth = (dateString: string) => {
		return format(new Date(dateString), 'MMMM yyyy', { locale: enUS })
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-lg font-semibold">
					<TrendingUp className="h-5 w-5 text-primary" />
					Monthly Performance Trends
				</CardTitle>
				<CardDescription className="text-sm text-muted-foreground">
					Detailed monthly statistics of project task completion rates
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="overflow-x-auto">
					<Table>
						<TableHeader>
							<TableRow className="hover:bg-transparent">
								<TableHead className="w-[200px]">Month</TableHead>
								<TableHead className="text-right">Created</TableHead>
								<TableHead className="text-right">Completed</TableHead>
								<TableHead className="text-center">Completion Rate</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{taskTrends.map((trend, index) => {
								const prevTrend = taskTrends[index + 1]
								const createdTrend = prevTrend
									? getTrendIndicator(trend.created, prevTrend.created)
									: null
								const completedTrend = prevTrend
									? getTrendIndicator(trend.completed, prevTrend.completed)
									: null

								return (
									<TableRow key={trend.month}>
										<TableCell className="font-medium">
											{formatMonth(trend.month)}
										</TableCell>
										<TableCell className="text-right">
											<div className="flex items-center justify-end gap-2">
												{trend.created}
												{createdTrend && (
													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger>
																<createdTrend.icon
																	className={`h-4 w-4 ${createdTrend.color}`}
																/>
															</TooltipTrigger>
															<TooltipContent>vs previous month</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												)}
											</div>
										</TableCell>
										<TableCell className="text-right">
											<div className="flex items-center justify-end gap-2">
												{trend.completed}
												{completedTrend && (
													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger>
																<completedTrend.icon
																	className={`h-4 w-4 ${completedTrend.color}`}
																/>
															</TooltipTrigger>
															<TooltipContent>vs previous month</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												)}
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center justify-center gap-4">
												<Progress
													value={trend.completionRate}
													className="h-2.5 w-32"
													indicatorClassName={getProgressColor(
														trend.completionRate
													)}
												/>
												<Badge
													variant="secondary"
													className={`w-16 justify-center ${
														trend.completionRate >= 75
															? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400'
															: trend.completionRate >= 50
																? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
																: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
													}`}
												>
													{trend.completionRate}%
												</Badge>
											</div>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	)
}
