/**
 * Custom hook for managing tasks with real-time updates using Apollo Client
 * Handles task queries and subscriptions while maintaining cache consistency
 *
 * @param projectId - The ID of the project whose tasks should be managed
 * @returns Object containing tasks array, loading state, and any potential errors
 */
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

	// Initial query to fetch all tasks for the project
	// Uses network-only for initial fetch to ensure fresh data
	// Subsequent fetches use cache-first for better performance
	const { data, loading, error } = useQuery(FindAllTasksDocument, {
		variables: { projectId },
		fetchPolicy: 'network-only',
		nextFetchPolicy: 'cache-first'
	})

	/**
	 * Updates the Apollo cache based on task modifications
	 * Handles adding, updating, and deleting tasks while preserving task order
	 *
	 * @param action - The type of update to perform ('add' | 'update' | 'delete')
	 * @param task - The task data to use for the update
	 */
	const updateCache = useCallback(
		(action: 'add' | 'update' | 'delete', task: TaskFragment) => {
			client.cache.modify({
				fields: {
					// @ts-ignore
					findAllTasks(
						existingTasks: Reference[] = [],
						{ readField, toReference }
					) {
						switch (action) {
							case 'add': {
								// Create a reference for the new task
								const taskRef = toReference({
									__typename: 'TaskModel',
									id: task.id
								})

								if (!taskRef) return existingTasks

								// Check if task already exists to prevent duplicates
								const hasTask = existingTasks.some(
									ref => readField('id', ref) === task.id
								)

								if (hasTask) return existingTasks

								// Write the new task data to the cache
								client.writeFragment({
									fragment: TaskFragmentDoc,
									data: task
								})

								// Add the new task to the beginning of the list
								return [taskRef, ...existingTasks]
							}

							case 'update': {
								// Create a reference for the task to update
								const taskRef = toReference({
									__typename: 'TaskModel',
									id: task.id
								})

								if (!taskRef) return existingTasks

								// Find the current position of the task
								const currentIndex = existingTasks.findIndex(
									ref => readField('id', ref) === task.id
								)

								if (currentIndex === -1) return existingTasks

								// Get the current task data from cache
								const currentTask = client.readFragment({
									id: taskRef.__ref,
									fragment: TaskFragmentDoc
								})

								// Merge new data while preserving the current position
								const updatedTask = {
									...currentTask,
									...task,
									position: currentTask?.position
								}

								// Write updated task to cache
								client.writeFragment({
									fragment: TaskFragmentDoc,
									data: updatedTask
								})

								// Update the task while maintaining array order
								const updatedTasks = [...existingTasks]
								updatedTasks[currentIndex] = taskRef
								return updatedTasks
							}

							case 'delete': {
								// Remove the task from the cache
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

	/**
	 * Handles subscription errors in a consistent way
	 *
	 * @param error - The error that occurred
	 * @param type - The type of subscription that failed
	 */
	const handleSubscriptionError = useCallback((error: Error, type: string) => {
		console.error(`Task ${type} subscription error:`, error)
	}, [])

	// Subscribe to task additions
	useSubscription(TaskAddedDocument, {
		variables: { projectId },
		onData: ({ data: subscriptionData }) => {
			const task = subscriptionData.data?.taskAdded
			if (!task) return

			// Check if task already exists in cache
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

	// Subscribe to task changes
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

	// Subscribe to task deletions
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
