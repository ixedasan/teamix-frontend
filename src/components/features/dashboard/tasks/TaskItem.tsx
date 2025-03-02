import Link from 'next/link'
import { CalendarClock, MessageSquare, Paperclip } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Priority, TaskModel, TaskStatus } from '@/graphql/generated/output'
import { formatDate } from '@/utils/format-date'
import { getMediaSource } from '@/utils/get-media-source'
import { cn } from '@/lib/utils'

interface TaskItemProps {
	task: TaskModel
	showProject?: boolean
	isCompact?: boolean
	isOverdue?: boolean
}

export function TaskItem({
	task,
	showProject = false,
	isCompact = false,
	isOverdue = false
}: TaskItemProps) {
	const getStatusColor = (status: TaskStatus) => {
		switch (status) {
			case TaskStatus.Backlog:
				return 'bg-slate-200 text-slate-800'
			case TaskStatus.Todo:
				return 'bg-blue-100 text-blue-800'
			case TaskStatus.InProgress:
				return 'bg-purple-100 text-purple-800'
			case TaskStatus.Done:
				return 'bg-green-100 text-green-800'
			case TaskStatus.Cancelled:
				return 'bg-red-100 text-red-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	const getPriorityColor = (priority: Priority) => {
		switch (priority) {
			case Priority.None:
				return 'bg-slate-100 text-slate-800'
			case Priority.Low:
				return 'bg-green-100 text-green-800'
			case Priority.Medium:
				return 'bg-yellow-100 text-yellow-800'
			case Priority.High:
				return 'bg-orange-100 text-orange-800'
			case Priority.Urgent:
				return 'bg-red-100 text-red-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	const getStatusLabel = (status: TaskStatus) => {
		switch (status) {
			case TaskStatus.InProgress:
				return 'In Progress'
			default:
				return status.charAt(0) + status.slice(1).toLowerCase()
		}
	}

	const getPriorityLabel = (priority: Priority) => {
		return priority.charAt(0) + priority.slice(1).toLowerCase()
	}

	const hasComments = task.comments && task.comments.length > 0
	const hasAttachments = task.attachments && task.attachments.length > 0
	const isDueDate = task.dueDate !== null

	return (
		<Card
			className={cn(
				'p-4 transition-colors hover:bg-muted/50',
				isOverdue && 'border-red-300 bg-red-50 dark:bg-red-950/10'
			)}
		>
			<div className="space-y-2">
				<div className="flex items-start justify-between">
					<div className="space-y-1">
						<Link
							href={`/projects/${task.project.id}/tasks?taskId=${task.id}`}
							className="font-medium hover:underline"
						>
							{task.title}
						</Link>

						{showProject && (
							<div className="flex items-center gap-1 text-sm text-muted-foreground">
								{task.project.icon && <span>{task.project.icon}</span>}
								<Link
									href={`/projects/${task.project.id}`}
									className="hover:text-foreground hover:underline"
								>
									{task.project.name}
								</Link>
							</div>
						)}
					</div>

					<div className="flex flex-col items-end gap-1">
						<Badge variant="secondary" className={getStatusColor(task.status)}>
							{getStatusLabel(task.status)}
						</Badge>

						{task.priority !== Priority.None && (
							<Badge
								variant="outline"
								className={getPriorityColor(task.priority)}
							>
								{getPriorityLabel(task.priority)}
							</Badge>
						)}
					</div>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						{task.assignees && task.assignees.length > 0 && (
							<div className="flex -space-x-2">
								{task.assignees.slice(0, 3).map(assignee => (
									<Avatar
										key={assignee.user.id}
										className="h-6 w-6 border-2 border-background"
									>
										<AvatarImage
											src={getMediaSource(assignee.user.avatar)}
											alt={assignee.user.displayName}
										/>
										<AvatarFallback className="text-xs">
											{assignee.user.displayName.charAt(0)}
										</AvatarFallback>
									</Avatar>
								))}
								{task.assignees.length > 3 && (
									<Avatar className="h-6 w-6 border-2 border-background">
										<AvatarFallback className="bg-muted text-xs">
											+{task.assignees.length - 3}
										</AvatarFallback>
									</Avatar>
								)}
							</div>
						)}

						{task.labels && task.labels.length > 0 && !isCompact && (
							<div className="flex gap-1">
								{task.labels.slice(0, 2).map(label => (
									<div
										key={label.id}
										className="h-2 w-2 rounded-full"
										style={{ backgroundColor: label.color }}
									/>
								))}
								{task.labels.length > 2 && (
									<div className="text-xs text-muted-foreground">
										+{task.labels.length - 2}
									</div>
								)}
							</div>
						)}
					</div>

					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						{isDueDate && (
							<div className="flex items-center gap-1">
								<CalendarClock className="h-3 w-3" />
								<span className={cn(isOverdue && 'font-medium text-red-500')}>
									{formatDate(task.dueDate)}
								</span>
							</div>
						)}

						{hasComments && !isCompact && (
							<div className="flex items-center gap-1">
								<MessageSquare className="h-3 w-3" />
								<span>{task.comments.length}</span>
							</div>
						)}

						{hasAttachments && !isCompact && (
							<div className="flex items-center gap-1">
								<Paperclip className="h-3 w-3" />
								<span>{task.attachments.length}</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</Card>
	)
}
