'use client'

import { useCallback } from 'react'
import { Reference } from '@apollo/client'
import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

import { ScrollArea, ScrollBar } from '@/components/ui/ScrollArea'
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
					// @ts-ignore
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
						// @ts-ignore
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
		<ScrollArea className="h-[calc(100svh-70px)] w-full overflow-x-auto overflow-y-hidden">
			<DragDropContext onDragEnd={onDragEnd}>
				<div className="flex min-w-max gap-6 p-4">
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
			</DragDropContext>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	)
}
