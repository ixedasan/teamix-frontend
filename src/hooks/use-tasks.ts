import { useCallback } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

import {
	FindAllTasksDocument,
	TaskAddedDocument,
	TaskChangedDocument,
	TaskDeletedDocument,
	TaskFragment,
	TaskFragmentDoc
} from '@/graphql/generated/output'

export const useTasks = (projectId: string) => {
	const client = useApolloClient()

	const { data, loading, error } = useQuery(FindAllTasksDocument, {
		fetchPolicy: 'network-only',
		nextFetchPolicy: 'cache-first'
	})

	const updateCache = useCallback(
		(action: 'add' | 'update' | 'delete', task: TaskFragment) => {
			const cacheId = client.cache.identify(task)
			const query = {
				query: FindAllTasksDocument,
				variables: { projectId }
			}

			client.cache.modify({
				fields: {
					findAllTasks(existingTasks = [], { readField }) {
						switch (action) {
							case 'add':
								const hasTask = existingTasks.some(
									(ref: any) => readField('id', ref) === task.id
								)
								if (hasTask) return existingTasks
								return [
									...existingTasks,
									client.cache.writeFragment({
										fragment: TaskFragmentDoc,
										data: task
									})
								]

							case 'update':
								return existingTasks.map((taskRef: any) => {
									const taskId = readField('id', taskRef)
									if (taskId === task.id) {
										return client.cache.writeFragment({
											fragment: TaskFragmentDoc,
											data: task
										})
									}
									return taskRef
								})

							case 'delete':
								return existingTasks.filter(
									(taskRef: any) => readField('id', taskRef) !== task.id
								)

							default:
								return existingTasks
						}
					}
				}
			})
		},
		[client, projectId]
	)

	useSubscription(TaskAddedDocument, {
		variables: { projectId },
		onData: ({ data, client: subscriptionClient }) => {
			if (data.data?.taskAdded) {
				const task = data.data.taskAdded
				const existing = subscriptionClient
					.readQuery({
						query: FindAllTasksDocument,
						variables: { projectId }
					})
					?.findAllTasks?.find(t => t.id === task.id)

				if (!existing) {
					updateCache('add', task)
				}
			}
		},
		onError: error => {
			console.error('Task added subscription error:', error)
		}
	})

	useSubscription(TaskChangedDocument, {
		variables: { projectId },
		onData: ({ data }) => {
			if (data.data?.taskChanged) {
				updateCache('update', data.data.taskChanged)
			}
		},
		onError: error => {
			console.error('Task changed subscription error:', error)
		}
	})

	useSubscription(TaskDeletedDocument, {
		variables: { projectId },
		onData: ({ data }) => {
			if (data.data?.taskDeleted) {
				updateCache('delete', data.data.taskDeleted)
			}
		},
		onError: error => {
			console.error('Task deleted subscription error:', error)
		}
	})

	return {
		tasks: data?.findAllTasks || [],
		loading,
		error
	}
}
