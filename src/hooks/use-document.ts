import { useCallback } from 'react'
import { useApolloClient } from '@apollo/client'

import {
	DocumentModel,
	FindDocumentByIdDocument,
	FindDocumentByIdQuery,
	useDocumentChangedSubscription,
	useFindDocumentByIdQuery
} from '@/graphql/generated/output'

/**
 * Custom hook for managing a single document with real-time updates
 * Handles the initial document query and subscription, maintaining cache consistency
 *
 * @param documentId - The ID of the document to manage
 * @returns Object containing the document data, loading state, error, and refetch function
 */
export const useDocument = (documentId: string) => {
	const client = useApolloClient()

	// Initial query to fetch the document
	const { data, loading, error, refetch } = useFindDocumentByIdQuery({
		variables: { id: documentId },
		fetchPolicy: 'network-only',
		nextFetchPolicy: 'cache-first'
	})

	/**
	 * Updates the document in the Apollo cache based on new data from subscription
	 *
	 * @param updatedDocument - The updated document data
	 */
	const updateCache = useCallback(
		(updatedDocument: DocumentModel) => {
			client.cache.updateQuery<FindDocumentByIdQuery>(
				{
					query: FindDocumentByIdDocument,
					variables: { documentId }
				},
				existingData => {
					if (!existingData?.findDocumentById) return existingData
					return {
						findDocumentById: {
							...existingData.findDocumentById,
							...updatedDocument
						}
					}
				}
			)
		},
		[client, documentId]
	)

	/**
	 * Handles subscription errors in a consistent way
	 *
	 * @param subscriptionError - The error that occurred
	 */
	const handleSubscriptionError = useCallback((subscriptionError: Error) => {
		console.error('Document subscription error:', subscriptionError)
	}, [])

	// Subscribe to changes for this document
	useDocumentChangedSubscription({
		variables: { id: documentId },
		onData: ({ data: subscriptionData }) => {
			const updatedDoc = subscriptionData.data?.documentChanged
			if (!updatedDoc) return
			updateCache(updatedDoc)
		},
		onError: handleSubscriptionError
	})

	return {
		document: data?.findDocumentById,
		loading,
		error,
		refetch
	}
}
