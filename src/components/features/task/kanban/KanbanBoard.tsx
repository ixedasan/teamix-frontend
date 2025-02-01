'use client'

import { useCallback } from 'react'
import { Reference } from '@apollo/client'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

import {
	TaskFragmentDoc,
	TaskStatus,
	useChangeTaskStatusMutation,
	type TaskModel
} from '@/graphql/generated/output'
import { KanbanColumn } from './KanbanColumn'
import { client } from '@/lib/apollo-client'

interface IKanbanBoard {
	tasks: TaskModel[]
}

const statusOrder: Record<TaskStatus, number> = {
	[TaskStatus.Backlog]: 0,
	[TaskStatus.Todo]: 1,
	[TaskStatus.InProgress]: 2,
	[TaskStatus.Done]: 3,
	[TaskStatus.Cancelled]: 4
}

export function KanbanBoard({ tasks }: IKanbanBoard) {
	const [changeStatus] = useChangeTaskStatusMutation({
		onError() {
			toast.error('Failed to update task status')
		}
	})

	const statuses = Object.values(TaskStatus).sort(
		(a, b) => statusOrder[a] - statusOrder[b]
	)

	const onDragEnd = useCallback(
		async (result: DropResult) => {
			if (!result.destination) return

			const task = tasks.find(t => t.id === result.draggableId)
			if (!task) return

			const newStatus = result.destination.droppableId as TaskStatus
			const newPosition = result.destination.index
			const oldPosition = result.source.index

			const optimisticTask = {
				...task,
				status: newStatus,
				position: newPosition
			}

			const reorderTasks = (existingTasks: Reference[]) => {
				const filtered = existingTasks.filter(
					t => t.__ref !== `TaskModel:${task.id}`
				)

				const newRef = client.cache.writeFragment({
					fragment: TaskFragmentDoc,
					data: optimisticTask
				})

				return [
					...filtered.slice(0, newPosition),
					newRef,
					...filtered.slice(newPosition)
				]
			}

			client.cache.modify({
				fields: {
					findAllTasks(existingTasks: Reference[] = []) {
						return reorderTasks(existingTasks)
					}
				}
			})

			try {
				await changeStatus({
					variables: {
						data: {
							taskId: task.id,
							status: newStatus,
							position: newPosition
						}
					}
				})
			} catch {
				client.cache.modify({
					fields: {
						findAllTasks(existingTasks: Reference[] = []) {
							const filtered = existingTasks.filter(
								t => t.__ref !== `TaskModel:${task.id}`
							)
							const originalRef = client.cache.writeFragment({
								fragment: TaskFragmentDoc,
								data: task
							})
							return [
								...filtered.slice(0, oldPosition),
								originalRef,
								...filtered.slice(oldPosition)
							]
						}
					}
				})
			}
		},
		[tasks, changeStatus]
	)

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="container p-4">
				<div className="flex h-screen w-full flex-1 gap-6 overflow-auto">
					{statuses.map((status, index) => (
						<motion.div
							key={status}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
							className="flex-shrink-0"
						>
							<KanbanColumn
								status={status}
								tasks={tasks.filter(t => t.status === status)}
							/>
						</motion.div>
					))}
				</div>
			</div>
		</DragDropContext>
	)
}
