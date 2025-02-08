'use client'

import { Droppable } from '@hello-pangea/dnd'
import { Plus } from 'lucide-react'

import { CreateTaskDialog } from '@/components/common/task/CreateTaskDialog'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
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
		<div className="w-96 shrink-0">
			<div className="mb-2 flex flex-col rounded-lg border border-border">
				<div className="border-b border-border p-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<h3 className="text-lg font-semibold">{statusTitles[status]}</h3>
							<Badge variant="secondary">{tasks.length}</Badge>
						</div>
						<CreateTaskDialog
							initialStatus={status}
							trigger={
								<Button
									variant="ghost"
									size="sm"
									className="size-8 rounded-full p-0 hover:bg-muted"
								>
									<Plus className="size-8" />
								</Button>
							}
						/>
					</div>
				</div>
			</div>

			<Droppable droppableId={status}>
				{(provided, snapshot) => (
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className={cn(
							'rounded-lg border-2 border-dashed transition-colors',
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
