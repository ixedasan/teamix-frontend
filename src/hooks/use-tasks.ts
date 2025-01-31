import { useCallback } from 'react'
import {
	Reference,
	useApolloClient,
	useQuery,
	useSubscription
} from '@apollo/client'

import {
	FindAllTasksDocument,
	FindAllTasksQuery,
	TaskAddedDocument,
	TaskChangedDocument,
	TaskDeletedDocument,
	TaskFragment,
	TaskFragmentDoc
} from '@/graphql/generated/output'

export const useTasks = (projectId: string) => {
	const client = useApolloClient()

	const { data, loading, error } = useQuery(FindAllTasksDocument, {
		variables: { projectId },
		fetchPolicy: 'network-only',
		nextFetchPolicy: 'cache-first'
	})

	const updateCache = useCallback(
		(action: 'add' | 'update' | 'delete', task: TaskFragment) => {
			client.cache.modify({
				fields: {
					findAllTasks(
						existingTasks: Reference[] = [],
						{ readField, toReference }
					) {
						switch (action) {
							case 'add': {
								const taskRef = toReference({
									__typename: 'TaskModel',
									id: task.id
								})

								if (!taskRef) return existingTasks

								const hasTask = existingTasks.some(
									ref => readField('id', ref) === task.id
								)

								if (hasTask) return existingTasks

								client.writeFragment({
									fragment: TaskFragmentDoc,
									data: task
								})

								return [taskRef, ...existingTasks]
							}

							case 'update': {
								const currentIndex = existingTasks.findIndex(
									ref => readField('id', ref) === task.id
								)

								if (currentIndex === -1) return existingTasks

								const taskRef = toReference({
									__typename: 'TaskModel',
									id: task.id
								})

								if (!taskRef) return existingTasks

								client.writeFragment({
									fragment: TaskFragmentDoc,
									data: task
								})

								const filteredTasks = existingTasks.filter(
									ref => readField('id', ref) !== task.id
								)

								return [
									...filteredTasks.slice(0, task.position),
									taskRef,
									...filteredTasks.slice(task.position)
								]
							}

							case 'delete': {
								return existingTasks.filter(
									ref => readField('id', ref) !== task.id
								)
							}

							default:
								return existingTasks
						}
					}
				}
			})
		},
		[client]
	)

	const handleSubscriptionError = useCallback((error: Error, type: string) => {
		console.error(`Task ${type} subscription error:`, error)
	}, [])

	useSubscription(TaskAddedDocument, {
		variables: { projectId },
		onData: ({ data: subscriptionData }) => {
			const task = subscriptionData.data?.taskAdded
			if (!task) return

			const queryData = client.readQuery<FindAllTasksQuery>({
				query: FindAllTasksDocument,
				variables: { projectId }
			})

			const existing = queryData?.findAllTasks?.some(t => t.id === task.id)
			if (!existing) {
				updateCache('add', task)
			}
		},
		onError: error => handleSubscriptionError(error, 'added')
	})

	useSubscription(TaskChangedDocument, {
		variables: { projectId },
		onData: ({ data: subscriptionData }) => {
			const task = subscriptionData.data?.taskChanged
			if (task) {
				updateCache('update', task)
			}
		},
		onError: error => handleSubscriptionError(error, 'changed')
	})

	useSubscription(TaskDeletedDocument, {
		variables: { projectId },
		onData: ({ data: subscriptionData }) => {
			const task = subscriptionData.data?.taskDeleted
			if (task) {
				updateCache('delete', task)
			}
		},
		onError: error => handleSubscriptionError(error, 'deleted')
	})

	return {
		tasks: data?.findAllTasks ?? [],
		loading,
		error
	}
}
