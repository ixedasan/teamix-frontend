'use client'

import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import {
	Calendar,
	CheckCircle2,
	Clock,
	Flag,
	PlusCircle,
	Rocket
} from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { ScrollArea, ScrollBar } from '@/components/ui/ScrollArea'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/Tooltip'
import type { FindProjectAnalyticsQuery } from '@/graphql/generated/output'

interface ITimeline {
	timeline: FindProjectAnalyticsQuery['projectAnalytics']['timeline']
}

export function Timeline({ timeline }: ITimeline) {
	const timelineItems = [
		{
			title: 'Project Creation',
			date: timeline.projectCreatedAt,
			description: `The project has been in existence ${timeline.projectDurationDays} days`,
			icon: Rocket,
			color: 'bg-blue-500 dark:bg-blue-400',
			lightColor: 'bg-blue-50 dark:bg-blue-950',
			borderColor: 'border-blue-200 dark:border-blue-800',
			textColor: 'text-blue-500 dark:text-blue-400'
		},
		timeline.firstTaskCreatedAt && {
			title: 'First Task Created',
			date: timeline.firstTaskCreatedAt,
			description: timeline.firstTaskTitle,
			icon: PlusCircle,
			color: 'bg-green-500 dark:bg-green-400',
			lightColor: 'bg-green-50 dark:bg-green-950',
			borderColor: 'border-green-200 dark:border-green-800',
			textColor: 'text-green-500 dark:text-green-400'
		},
		timeline.latestCompletedTaskAt && {
			title: 'Latest Task Completed',
			date: timeline.latestCompletedTaskAt,
			description: timeline.latestCompletedTaskTitle,
			icon: CheckCircle2,
			color: 'bg-purple-500 dark:bg-purple-400',
			lightColor: 'bg-purple-50 dark:bg-purple-950',
			borderColor: 'border-purple-200 dark:border-purple-800',
			textColor: 'text-purple-500 dark:text-purple-400'
		},
		timeline.mostRecentTaskAt && {
			title: 'Latest Task Created',
			date: timeline.mostRecentTaskAt,
			description: timeline.mostRecentTaskTitle,
			icon: Flag,
			color: 'bg-amber-500 dark:bg-amber-400',
			lightColor: 'bg-amber-50 dark:bg-amber-950',
			borderColor: 'border-amber-200 dark:border-amber-800',
			textColor: 'text-amber-500 dark:text-amber-400'
		},
		{
			title: 'Current Time',
			date: new Date().toString(),
			description: 'Present moment',
			icon: Clock,
			color: 'bg-gray-500 dark:bg-gray-400',
			lightColor: 'bg-gray-50 dark:bg-gray-950',
			borderColor: 'border-gray-200 dark:border-gray-800',
			textColor: 'text-gray-500 dark:text-gray-400'
		}
	].filter(Boolean)

	return (
		<Card className="overflow-hidden">
			<CardHeader className="border-b bg-muted/5">
				<CardTitle className="flex items-center gap-2 text-lg font-semibold">
					<Calendar className="h-5 w-5 text-primary" />
					Project Timeline
				</CardTitle>
				<CardDescription>
					Key milestones and important dates of the project
				</CardDescription>
			</CardHeader>
			<CardContent className="p-6">
				<TooltipProvider>
					<ScrollArea>
						<div className="relative mt-2 w-full pb-4">
							<div className="flex w-full justify-between gap-4">
								{timelineItems.map((item, index) => (
									<div
										key={index}
										className="relative flex min-w-[200px] flex-1 flex-col items-center"
									>
										{/* Connecting Line */}
										{index < timelineItems.length - 1 && (
											<div className="absolute left-[50%] top-7 h-[2px] w-full bg-gradient-to-r from-primary/20 to-primary/10" />
										)}
										<Tooltip>
											<TooltipTrigger>
												<div
													className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 ${item.borderColor} ${item.lightColor} bg-background shadow-sm transition-all duration-300 hover:scale-110`}
												>
													<div
														className={`absolute inset-2 rounded-full ${item.color} opacity-0 blur transition-opacity duration-300 group-hover:opacity-20`}
													/>
													<item.icon className={`h-6 w-6 ${item.textColor}`} />
												</div>
											</TooltipTrigger>
											<TooltipContent>
												<p>
													{format(new Date(item.date), 'PPP', { locale: enUS })}
												</p>
											</TooltipContent>
										</Tooltip>
										<div className="mt-4 flex flex-col items-center gap-2 text-center">
											<div className="space-y-1">
												<h3 className="font-semibold">{item.title}</h3>
												<Badge
													variant="secondary"
													className="font-mono text-xs"
												>
													{format(new Date(item.date), 'MMM d, yyyy')}
												</Badge>
											</div>
											<p className="text-sm text-muted-foreground">
												{item.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
						<ScrollBar orientation="horizontal" className="mt-2" />
					</ScrollArea>
				</TooltipProvider>
			</CardContent>
		</Card>
	)
}
