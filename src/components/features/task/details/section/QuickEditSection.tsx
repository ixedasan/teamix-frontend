'use client'

import { Link } from 'lucide-react'

import { AssigneeSelector } from '@/components/common/task/AssignmentSelector'
import { DateSelector } from '@/components/common/task/DateSelector'
import { LabelSelector } from '@/components/common/task/LabelSelector'
import { PrioritySelector } from '@/components/common/task/PriorytySelector'
import { StatusSelector } from '@/components/common/task/StatusSelector'
import { Button } from '@/components/ui/Button'
import {
	useChangeTaskStatusMutation,
	useUpdateTaskMutation,
	type FindTaskByIdQuery,
	type Priority,
	type TaskModel,
	type TaskStatus
} from '@/graphql/generated/output'
import { useTaskLinks } from '@/hooks/use-task-links'
import { CreateAttachmentsForm } from './attachments/CreateAttachmentsForm'
import { TaskLinkForm } from './links/TaskLinkForm'

interface IQuickEditSection {
	task: FindTaskByIdQuery['findTask']
	isLoading: boolean
}

interface UpdateFieldType {
	priority?: Priority
	startDate?: TaskModel['startDate']
	dueDate?: TaskModel['dueDate']
}

export function QuickEditSection({ task, isLoading }: IQuickEditSection) {
	const [changeStatus, { loading: isLoadingStatus }] =
		useChangeTaskStatusMutation()
	const [updateTask, { loading: isUpdating }] = useUpdateTaskMutation()

	const { createLink } = useTaskLinks(task?.id)

	const handleUpdateChange = async <K extends keyof UpdateFieldType>(
		field: K,
		value: UpdateFieldType[K]
	) => {
		try {
			await updateTask({
				variables: {
					id: task.id,
					data: { [field]: value }
				}
			})
		} catch (error) {
			console.error(`Error updating ${field}:`, error)
		}
	}

	const handleStatusChange = async (newStatus: TaskStatus) => {
		try {
			await changeStatus({
				variables: {
					data: {
						taskId: task.id,
						status: newStatus,
						position: task.position
					}
				}
			})
		} catch (error) {
			console.error('Error changing status:', error)
		}
	}

	return (
		<div className="flex flex-col space-y-3">
			<div className="flex w-full items-center gap-4 md:gap-8">
				<span className="min-w-24 text-muted-foreground">Status</span>
				<StatusSelector
					value={task?.status}
					onChange={handleStatusChange}
					disabled={isLoadingStatus || isLoading}
				/>
			</div>
			<div className="flex w-full items-center gap-4 md:gap-8">
				<span className="min-w-24 text-muted-foreground">Priority</span>
				<PrioritySelector
					value={task?.priority}
					onChange={newPriority => handleUpdateChange('priority', newPriority)}
					disabled={isUpdating || isLoading}
				/>
			</div>
			<div className="flex w-full items-center gap-4 md:gap-8">
				<span className="min-w-24 text-muted-foreground">Start Date</span>
				<DateSelector
					value={task?.startDate}
					onChange={date => handleUpdateChange('startDate', date)}
					disabled={isUpdating || isLoading}
					contentAlignment="start"
				/>
			</div>
			<div className="flex w-full items-center gap-4 md:gap-8">
				<span className="min-w-24 text-muted-foreground">Due Date</span>
				<DateSelector
					value={task?.dueDate}
					onChange={date => handleUpdateChange('dueDate', date)}
					disabled={isUpdating || isLoading}
					contentAlignment="start"
				/>
			</div>
			<div className="flex w-full items-center gap-4 md:gap-8">
				<span className="min-w-24 text-muted-foreground">Assignees</span>
				<AssigneeSelector
					taskId={task?.id}
					currentAssignees={task?.assignees}
					disabled={isUpdating || isLoading}
				/>
			</div>
			<div className="flex w-full items-center gap-4 md:gap-8">
				<span className="min-w-24 text-muted-foreground">Labels</span>
				<LabelSelector
					taskId={task?.id}
					currentLabels={task?.labels}
					disabled={isUpdating || isLoading}
				/>
			</div>
			<div className="flex w-full items-center justify-end gap-4">
				<TaskLinkForm
					onSubmit={data => createLink(data)}
					trigger={
						<Button variant="outline" size="sm" className="flex items-center">
							<Link className="mr-1 size-4" />
							<span>Add Link</span>
						</Button>
					}
				/>
				<CreateAttachmentsForm
					taskId={task?.id}
					trigger={
						<Button variant="outline" size="sm" className="flex items-center">
							<Link className="mr-1 size-4" />
							<span>Add Attachment</span>
						</Button>
					}
				/>
			</div>
		</div>
	)
}
