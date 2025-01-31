'use client'

import { memo } from 'react'
import { Draggable } from '@hello-pangea/dnd'

import { UserAvatar } from '@/components/common/UserAvatar'
import { Card } from '@/components/ui/Card'
import { Priority, type TaskFragment } from '@/graphql/generated/output'
import { useMediaQuery } from '@/hooks/use-media-query'
import { PriorityBadge } from './PriorityBadge'
import { cn } from '@/lib/utils'

interface ITaskCard {
	task: TaskFragment
	index: number
}

const priorityColors: Record<Priority, string> = {
	[Priority.None]: 'border-border',
	[Priority.Low]: 'border-green-500',
	[Priority.Medium]: 'border-yellow-500',
	[Priority.High]: 'border-orange-500',
	[Priority.Urgent]: 'border-red-500'
}

export const TaskCard = memo(
	function TaskCard({ task, index }: ITaskCard) {
		const isMobile = useMediaQuery('(max-width: 640px)')

		return (
			<Draggable draggableId={task.id} index={index} isDragDisabled={isMobile}>
				{(provided, snapshot) => (
					<Card
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={cn(
							'relative border-l-4 p-4 transition-shadow',
							priorityColors[task.priority],
							snapshot.isDragging && 'shadow-lg ring-1 ring-border'
						)}
						style={{
							...provided.draggableProps.style,
							transform:
								snapshot.isDragging && isMobile
									? 'none'
									: provided.draggableProps.style?.transform
						}}
					>
						<div className="mb-2 flex items-start justify-between">
							<p className="font-medium">{task.title}</p>
							<PriorityBadge priority={task.priority} />
						</div>

						{task.dueDate && (
							<div className="mb-2 text-sm text-muted-foreground">
								{new Date(task.dueDate).toLocaleDateString()}
							</div>
						)}

						<div className="flex gap-2">
							{task.assignees.map(assignee => (
								<UserAvatar key={assignee.user.id} user={assignee.user} />
							))}
						</div>
					</Card>
				)}
			</Draggable>
		)
	},
	(prev, next) => prev.task === next.task && prev.index === next.index
)
