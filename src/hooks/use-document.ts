import { useCallback, useEffect, useRef, useState } from 'react'
import debounce from 'debounce'

import {
	DocumentModel,
	useChangeDocumentMutation,
	useDocumentChangedSubscription,
	useFindDocumentByIdQuery
} from '@/graphql/generated/output'

export function useDocument(documentId: string) {
	const { data, loading, error } = useFindDocumentByIdQuery({
		variables: { id: documentId }
	})

	const [updateDocument] = useChangeDocumentMutation()
	const [localDocument, setLocalDocument] = useState<DocumentModel>()
	const lastUpdateRef = useRef<{ title: string; content: any } | null>(null)
	const updatingRef = useRef(false)

	const { data: subscriptionData } = useDocumentChangedSubscription({
		variables: { id: documentId }
	})

	useEffect(() => {
		if (subscriptionData && !updatingRef.current) {
			setLocalDocument(subscriptionData.documentChanged)
		}
	}, [subscriptionData])

	useEffect(() => {
		if (data?.findDocumentById) {
			setLocalDocument(data.findDocumentById)
		}
	}, [data])

	const handleUpdateDocument = useCallback(
		debounce(async (title: string, content: any) => {
			if (!title && !content) return

			const contentStr = JSON.stringify(content)
			const lastUpdateStr = lastUpdateRef.current
				? JSON.stringify(lastUpdateRef.current.content)
				: null

			if (
				lastUpdateRef.current &&
				title === lastUpdateRef.current.title &&
				contentStr === lastUpdateStr
			) {
				return
			}

			try {
				updatingRef.current = true
				lastUpdateRef.current = { title, content }

				const result = await updateDocument({
					variables: {
						id: documentId,
						data: { title, content }
					}
				})

				if (result.data) {
					setLocalDocument(result.data.changeDocument)
				}
			} catch (err) {
				console.error('Error updating document:', err)
			} finally {
				setTimeout(() => {
					updatingRef.current = false
				}, 300)
			}
		}, 1000),
		[documentId, updateDocument]
	)

	return {
		document: localDocument,
		loading,
		error,
		updateDocument: handleUpdateDocument
	}
}
