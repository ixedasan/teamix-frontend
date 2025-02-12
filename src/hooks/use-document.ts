import { useState } from 'react'

import {
	ChangeDocumentInput,
	FindDocumentByIdQuery,
	useChangeDocumentMutation,
	useDocumentChangedSubscription,
	useFindDocumentByIdQuery
} from '@/graphql/generated/output'

type Document = FindDocumentByIdQuery['findDocumentById']

export const useDocument = (documentId: string) => {
	const [document, setDocument] = useState<Document | null>(null)

	const { loading: queryLoading, error: queryError } = useFindDocumentByIdQuery(
		{
			variables: { id: documentId },
			onCompleted: data => {
				setDocument(data.findDocumentById)
			},
			skip: !documentId
		}
	)

	const [updateDocument, { loading: mutationLoading, error: mutationError }] =
		useChangeDocumentMutation()

	const { error: subscriptionError } = useDocumentChangedSubscription({
		variables: { id: documentId },
		onData: ({ data }) => {
			if (data?.data?.documentChanged) {
				setDocument(data.data.documentChanged)
			}
		}
	})

	const handleUpdateDocument = async (input: ChangeDocumentInput) => {
		try {
			const { data } = await updateDocument({
				variables: {
					id: documentId,
					data: input
				}
			})
			return data?.changeDocument
		} catch (error) {
			console.error('Error updating document:', error)
			throw error
		}
	}

	const error = queryError || mutationError || subscriptionError

	const loading = queryLoading || mutationLoading

	return {
		document,
		loading,
		error,
		updateDocument: handleUpdateDocument
	}
}
