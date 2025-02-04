'use client'

import { useCallback } from 'react'
import { Draggable } from '@hello-pangea/dnd'

import { AssigneeSelector } from '@/components/common/task/AssignmentSelector'
import { DateSelector } from '@/components/common/task/DateSelector'
import { LabelSelector } from '@/components/common/task/LabelSelector'
import { PrioritySelector } from '@/components/common/task/PriorytySelector'
import { StatusSelector } from '@/components/common/task/StatusSelector'
// import { TaskDetailsSheet } from '@/components/common/task/TaskDetailSheed'
import { Card } from '@/components/ui/Card'
import {
	Priority,
	TaskFragment,
	TaskModel,
	TaskStatus,
	useChangeTaskStatusMutation,
	useUpdateTaskMutation
} from '@/graphql/generated/output'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useTaskSheet } from '@/store/task/task-sheet'
import { cn } from '@/lib/utils'

interface ITaskCard {
	task: TaskFragment
	index: number
}

interface UpdateFieldType {
	priority?: Priority
	startDate?: TaskModel['startDate']
	dueDate?: TaskModel['dueDate']
}
export function TaskCard({ task, index }: ITaskCard) {
	const isMobile = useMediaQuery('(max-width: 640px)')

	const [changeStatus, { loading: isLoadingStatus }] =
		useChangeTaskStatusMutation()
	const [updateTask, { loading: isUpdating }] = useUpdateTaskMutation()

	const handleUpdateChange = useCallback(
		async <K extends keyof UpdateFieldType>(
			field: K,
			value: UpdateFieldType[K]
		) => {
			try {
				await updateTask({
					variables: {
						id: task.id,
						data: { [field]: value }
					},
					optimisticResponse: {
						__typename: 'Mutation',
						updateTask: {
							__typename: 'TaskModel',
							...task,
							[field]: value
						}
					}
				})
			} catch (error) {
				console.error(`Error updating ${field}:`, error)
			}
		},
		[task, updateTask]
	)

	const handleStatusChange = useCallback(
		async (newStatus: TaskStatus) => {
			try {
				await changeStatus({
					variables: {
						data: {
							taskId: task.id,
							status: newStatus,
							position: task.position
						}
					},
					optimisticResponse: {
						__typename: 'Mutation',
						changeTaskStatus: {
							__typename: 'TaskModel',
							id: task.id,
							status: newStatus,
							position: task.position
						}
					}
				})
			} catch (error) {
				console.error('Error changing status:', error)
			}
		},
		[changeStatus, task]
	)

	return (
		<>
			<Draggable draggableId={task.id} index={index} isDragDisabled={isMobile}>
				{(provided, snapshot) => (
					<Card
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={cn(
							'relative border-l-4 border-primary/50 p-4 transition-all hover:shadow-md',
							snapshot.isDragging && 'shadow-lg ring-1 ring-border'
						)}
						style={{
							...provided.draggableProps.style,
							transform:
								snapshot.isDragging && isMobile
									? 'none'
									: provided.draggableProps.style?.transform
						}}
						onClick={() => useTaskSheet.getState().open(task.id)}
					>
						<div className="mb-3 flex items-start justify-between gap-2">
							<div className="flex-1">
								<div className="mb-1 flex items-center gap-2">
									<p className="line-clamp-2 font-medium">{task.title}</p>
								</div>
							</div>
						</div>

						<div
							className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
							onClick={e => e.stopPropagation()}
						>
							<StatusSelector
								value={task.status}
								onChange={handleStatusChange}
								disabled={isLoadingStatus}
								triggerVariant="compact"
							/>
							<PrioritySelector
								value={task.priority}
								onChange={newPriority =>
									handleUpdateChange('priority', newPriority)
								}
								disabled={isUpdating}
								triggerVariant="compact"
							/>
							<DateSelector
								value={task.startDate}
								onChange={date => handleUpdateChange('startDate', date)}
								disabled={isUpdating}
								triggerVariant="compact"
								tooltipContent="Start date"
							/>
							<DateSelector
								value={task.dueDate}
								onChange={date => handleUpdateChange('dueDate', date)}
								disabled={isUpdating}
								triggerVariant="compact"
								tooltipContent="Due date"
							/>
							<AssigneeSelector
								taskId={task.id}
								currentAssignees={task.assignees}
								disabled={isUpdating}
								triggerVariant="compact"
							/>
							<LabelSelector
								taskId={task.id}
								currentLabels={task.labels}
								disabled={isUpdating}
								triggerVariant="compact"
							/>
						</div>
					</Card>
				)}
			</Draggable>
		</>
	)
}
