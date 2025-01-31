'use client'

import { Droppable } from '@hello-pangea/dnd'

import { Badge } from '@/components/ui/Badge'
import { TaskStatus, type TaskFragment } from '@/graphql/generated/output'
import { TaskCard } from './TaskCard'
import { cn } from '@/lib/utils'

interface IKanbanColumn {
	status: TaskStatus
	tasks: TaskFragment[]
}

const statusTitles: Record<TaskStatus, string> = {
	[TaskStatus.Backlog]: 'Backlog',
	[TaskStatus.Todo]: 'To Do',
	[TaskStatus.InProgress]: 'In Progress',
	[TaskStatus.Done]: 'Done',
	[TaskStatus.Cancelled]: 'Cancelled'
}

export function KanbanColumn({ tasks, status }: IKanbanColumn) {
	return (
		<div className="w-72 shrink-0">
			<div className="mb-4 flex items-center gap-2">
				<h3 className="text-lg font-semibold">{statusTitles[status]}</h3>
				<Badge variant="secondary">{tasks.length}</Badge>
			</div>

			<Droppable droppableId={status}>
				{(provided, snapshot) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className={cn(
							'rounded-lg border-2 border-dashed p-2 transition-colors',
							snapshot.isDraggingOver
								? 'border-primary/50 bg-muted'
								: 'border-transparent'
						)}
					>
						<div className="space-y-2">
							{tasks.map((task, index) => (
								<TaskCard key={task.id} task={task} index={index} />
							))}
							{provided.placeholder}
						</div>
					</div>
				)}
			</Droppable>
		</div>
	)
}
