'use client'

import { memo } from 'react'
import { Draggable } from '@hello-pangea/dnd'

import { PrioritySelector } from '@/components/common/task/PriorytySelector'
import { StatusSelector } from '@/components/common/task/StatusSelector'
import { Card } from '@/components/ui/Card'
import { TaskFragment } from '@/graphql/generated/output'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

interface ITaskCard {
	task: TaskFragment
	index: number
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
							'relative border-l-4 border-primary/40 p-4 transition-all hover:shadow-md',
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
						{/* Header section */}
						<div className="mb-3 flex items-start justify-between gap-2">
							<div className="flex-1">
								<div className="mb-1 flex items-center gap-2">
									<p className="line-clamp-2 font-medium">{task.title}</p>
								</div>
							</div>
						</div>

						{/* Main sections */}
						<div className="flex flex-wrap items-center gap-2 pt-1.5 text-xs text-muted-foreground">
							<StatusSelector task={task} className="w-14" />
							<PrioritySelector task={task} />
						</div>
					</Card>
				)}
			</Draggable>
		)
	},
	(prev, next) => prev.task === next.task && prev.index === next.index
)
