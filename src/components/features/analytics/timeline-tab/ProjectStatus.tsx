'use client'

import { useState } from 'react'
import {
	AlertTriangle,
	ArrowDown,
	ArrowUp,
	CheckCircle2,
	Clock,
	HelpCircle,
	Hourglass,
	Target
} from 'lucide-react'

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
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/Tooltip'
import type { FindProjectAnalyticsQuery } from '@/graphql/generated/output'

interface IProjectStatus {
	analytics: FindProjectAnalyticsQuery['projectAnalytics']
}

export function ProjectStatus({ analytics }: IProjectStatus) {
	const [isHovered, setIsHovered] = useState(false)

	const getStatusColor = (rate: number) => {
		if (rate >= 75) return 'emerald'
		if (rate >= 50) return 'amber'
		return 'red'
	}

	const statusColor = getStatusColor(analytics.statistics.completionRate)

	const stats = [
		{
			label: 'Completed tasks',
			value: analytics.statistics.completedTasks,
			icon: CheckCircle2,
			color: 'emerald',
			tooltip: 'Total number of successfully completed tasks'
		},
		{
			label: 'Overdue tasks',
			value: analytics.statistics.overdueTasks,
			icon: AlertTriangle,
			color: 'amber',
			tooltip: 'Number of tasks that missed their deadline'
		},
		{
			label: 'Total tasks',
			value: analytics.statistics.totalTasks,
			icon: Target,
			color: 'blue',
			tooltip: 'Total number of tasks in the project'
		},
		{
			label: 'Avg. time',
			value: `${analytics.statistics.avgCompletionTime} days`,
			icon: Hourglass,
			color: 'violet',
			tooltip: 'Average time to complete a task'
		}
	]

	return (
		<Card className="overflow-hidden">
			<CardHeader className="border-b bg-muted/5">
				<CardTitle className="flex items-center gap-2 text-lg font-semibold">
					<Clock className="h-5 w-5 text-primary" />
					Project Status Overview
				</CardTitle>
				<CardDescription className="text-sm text-muted-foreground">
					Comprehensive project metrics and progress indicators
				</CardDescription>
			</CardHeader>
			<CardContent className="p-6">
				<div className="space-y-8">
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<span className="text-sm font-medium">Completion Progress</span>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<HelpCircle className="h-4 w-4 text-muted-foreground" />
										</TooltipTrigger>
										<TooltipContent>
											Overall project completion rate based on finished tasks
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<Badge
								variant="secondary"
								className={`bg-${statusColor}-100 text-${statusColor}-700 dark:bg-${statusColor}-500/20 dark:text-${statusColor}-400`}
							>
								{analytics.statistics.completionRate}%
							</Badge>
						</div>
						<div
							className="relative"
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
						>
							<Progress
								value={analytics.statistics.completionRate}
								className="h-3"
								indicatorClassName={`bg-${statusColor}-500 transition-all duration-300 ${
									isHovered ? 'opacity-80' : ''
								}`}
							/>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
						{stats.map(stat => (
							<Card
								key={stat.label}
								className="overflow-hidden transition-all duration-200 hover:shadow-md dark:hover:shadow-primary/5"
							>
								<CardContent className="p-4">
									<div
										className={`absolute inset-0 bg-gradient-to-br from-${stat.color}-600/25 to-${stat.color}-600/5 dark:from-${stat.color}-500/25 dark:to-${stat.color}-500/5 -z-10`}
									/>
									<div className="space-y-4">
										<p className="text-sm text-muted-foreground">
											{stat.label}
										</p>
										<div className="flex items-center justify-between">
											<p className="text-xl font-bold tracking-tight">
												{stat.value}
											</p>
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														<stat.icon
															className={`h-5 w-5 text-${stat.color}-500`}
														/>
													</TooltipTrigger>
													<TooltipContent>{stat.tooltip}</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
					<Card>
						<CardContent className="p-4">
							<div className="flex items-center justify-between">
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">
										Task Growth Rate
									</p>
									<div className="flex items-center gap-2">
										<p
											className={`text-xl font-bold ${
												analytics.statistics.taskGrowthRate > 0
													? 'text-emerald-500'
													: 'text-red-500'
											}`}
										>
											{analytics.statistics.taskGrowthRate > 0 ? '+' : ''}
											{analytics.statistics.taskGrowthRate}%
										</p>
										{analytics.statistics.taskGrowthRate > 0 ? (
											<ArrowUp className="h-5 w-5 text-emerald-500" />
										) : (
											<ArrowDown className="h-5 w-5 text-red-500" />
										)}
									</div>
								</div>
								<div className="text-right">
									<p className="text-sm text-muted-foreground">
										Project Duration
									</p>
									<p className="text-xl font-bold">
										{analytics.timeline.projectDurationDays} days
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</CardContent>
		</Card>
	)
}
