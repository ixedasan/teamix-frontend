import { useCallback } from 'react'
import { Reference, useApolloClient } from '@apollo/client'

import {
	CommentFragment,
	CommentFragmentDoc,
	FindCommentsByTaskDocument,
	FindCommentsByTaskQuery,
	useCommentChangedSubscription,
	useFindCommentsByTaskQuery
} from '@/graphql/generated/output'

/**
 * Custom hook for managing comments with real-time updates using Apollo Client
 * Handles comment queries and subscriptions while maintaining cache consistency
 *
 * @param taskId - The ID of the task whose comments should be managed
 * @returns Object containing comments array, loading state, and any potential errors
 */
export const useComments = (taskId: string) => {
	const client = useApolloClient()

	// Initial query to fetch all comments for the task
	const { data, loading, error, refetch } = useFindCommentsByTaskQuery({
		variables: { taskId },
		fetchPolicy: 'network-only',
		nextFetchPolicy: 'cache-first'
	})

	/**
	 * Updates the Apollo cache based on comment modifications
	 * Handles adding, updating, and deleting comments while preserving comment order
	 *
	 * @param mutation - The type of update to perform ('CREATED' | 'UPDATED' | 'DELETED')
	 * @param comment - The comment data to use for the update
	 */
	const updateCache = useCallback(
		(mutation: 'CREATED' | 'UPDATED' | 'DELETED', comment: CommentFragment) => {
			client.cache.modify({
				fields: {
					findCommentsByTask(
						existingRefs: Reference[] = [],
						{ readField, toReference }
					) {
						switch (mutation) {
							case 'CREATED': {
								// Create a reference for the new comment
								const commentRef = toReference({
									__typename: 'CommentModel',
									id: comment.id
								})

								if (!commentRef) return existingRefs

								// Check if comment already exists to prevent duplicates
								const hasComment = existingRefs.some(
									ref => readField('id', ref) === comment.id
								)

								if (hasComment) return existingRefs

								// Write the new comment data to the cache
								client.writeFragment({
									fragment: CommentFragmentDoc,
									data: comment
								})

								// Add the new comment to the end of the list
								return [...existingRefs, commentRef]
							}

							case 'UPDATED': {
								return existingRefs.map(ref => {
									const id = readField<string>('id', ref)
									if (id === comment.id) {
										// Write updated comment to cache and return new reference
										return client.writeFragment({
											fragment: CommentFragmentDoc,
											data: comment
										})
									}
									return ref
								})
							}

							case 'DELETED': {
								// Remove the comment from the cache
								return existingRefs.filter(
									ref => readField('id', ref) !== comment.id
								)
							}

							default:
								return existingRefs
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
	 */
	const handleSubscriptionError = useCallback((error: Error) => {
		console.error('Comment subscription error:', error)
	}, [])

	// Subscribe to comment changes
	useCommentChangedSubscription({
		variables: { taskId },
		onData: ({ data: subscriptionData }) => {
			const change = subscriptionData.data?.commentChanged
			if (!change) return
			const { mutation, comment } = change

			// Verify the comment exists in the payload
			if (!comment) return

			// Check if we need to handle the creation case specially
			if (mutation === 'CREATED') {
				// Check if comment already exists in cache
				const queryData = client.readQuery<FindCommentsByTaskQuery>({
					query: FindCommentsByTaskDocument,
					variables: { taskId }
				})

				const existing = queryData?.findCommentsByTask?.some(
					c => c.id === comment.id
				)
				if (existing) return
			}

			updateCache(mutation, comment)
		},
		onError: handleSubscriptionError
	})

	return {
		comments: data?.findCommentsByTask ?? [],
		loading,
		error,
		refetch
	}
}
