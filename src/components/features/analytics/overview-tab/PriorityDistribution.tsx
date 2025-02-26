'use client'

import { AlertTriangle, ArrowDown, Flag, Gauge, Loader2 } from 'lucide-react'

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
import { FindProjectAnalyticsQuery } from '@/graphql/generated/output'

interface IPriorityDistribution {
	data: FindProjectAnalyticsQuery['projectAnalytics']['priorityDistribution']
}

export function PriorityDistribution({ data }: IPriorityDistribution) {
	const priorities = [
		{
			label: 'None',
			value: data.none,
			icon: Loader2,
			color: 'bg-slate-500 dark:bg-slate-400',
			textColor: 'text-slate-500 dark:text-slate-400',
			description: 'Tasks without priority level'
		},
		{
			label: 'Low',
			value: data.low,
			icon: ArrowDown,
			color: 'bg-emerald-500 dark:bg-emerald-400',
			textColor: 'text-emerald-500 dark:text-emerald-400',
			description: 'Can be completed when convenient'
		},
		{
			label: 'Medium',
			value: data.medium,
			icon: Gauge,
			color: 'bg-amber-500 dark:bg-amber-400',
			textColor: 'text-amber-500 dark:text-amber-400',
			description: 'Should be completed soon'
		},
		{
			label: 'High',
			value: data.high,
			icon: Flag,
			color: 'bg-orange-500 dark:bg-orange-400',
			textColor: 'text-orange-500 dark:text-orange-400',
			description: 'Important tasks requiring attention'
		},
		{
			label: 'Urgent',
			value: data.urgent,
			icon: AlertTriangle,
			color: 'bg-red-500 dark:bg-red-400',
			textColor: 'text-red-500 dark:text-red-400',
			description: 'Critical tasks needing immediate action'
		}
	]

	const mostCommonPriority = priorities.reduce((a, b) =>
		a.value > b.value ? a : b
	)

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<CardTitle className="flex items-center gap-2 text-lg font-semibold">
							<Flag className="h-5 w-5 text-primary" />
							Task Prioritization
						</CardTitle>
						<CardDescription className="text-sm text-muted-foreground">
							Distribution of tasks by priority level
						</CardDescription>
					</div>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Badge
									variant="secondary"
									className="border border-muted px-2 font-medium"
								>
									{data.totalTasks.toLocaleString()} Total Tasks
								</Badge>
							</TooltipTrigger>
							<TooltipContent>
								Most common: {mostCommonPriority.label} Priority (
								{Math.round((mostCommonPriority.value / data.totalTasks) * 100)}
								%)
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-5">
					{priorities.map(priority => (
						<div key={priority.label} className="space-y-2">
							<div className="flex items-center justify-between">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger>
											<div className="flex items-center gap-2">
												<priority.icon
													className={`h-4 w-4 ${priority.textColor}`}
												/>
												<span className="font-medium">{priority.label}</span>
											</div>
										</TooltipTrigger>
										<TooltipContent>{priority.description}</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<div className="flex items-center gap-2">
									<span className="tabular-nums">
										{priority.value.toLocaleString()}
									</span>
									<span className="text-sm text-muted-foreground">
										({Math.round((priority.value / data.totalTasks) * 100) || 0}
										%)
									</span>
								</div>
							</div>
							<div className="relative">
								<Progress
									value={(priority.value / data.totalTasks) * 100}
									className="h-2 bg-muted/30 transition-all"
									indicatorClassName={`${priority.color} transition-all duration-500`}
								/>
								{priority === mostCommonPriority && (
									<div className="absolute -right-2 -top-2">
										<span className="relative flex h-2 w-2">
											<span
												className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${priority.color}`}
											></span>
											<span
												className={`relative inline-flex h-2 w-2 rounded-full ${priority.color}`}
											></span>
										</span>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}
