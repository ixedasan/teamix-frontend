import { useCallback } from 'react'
import { toast } from 'sonner'

import {
	useCreateTaskLinkMutation,
	useDeleteTaskLinkMutation,
	useFindTaskLinksQuery,
	useUpdateTaskLinkMutation
} from '@/graphql/generated/output'

export function useTaskLinks(taskId: string) {
	const {
		data,
		loading: isLoading,
		error
	} = useFindTaskLinksQuery({
		variables: { taskId },
		skip: !taskId
	})

	const [createMutation, { loading: isCreating }] = useCreateTaskLinkMutation({
		onCompleted: () => toast.success('Link added'),
		onError: () => toast.error('Failed to add link'),
		refetchQueries: ['FindTaskLinks']
	})

	const [updateMutation, { loading: isUpdating }] = useUpdateTaskLinkMutation({
		onCompleted: () => toast.success('Link updated'),
		onError: () => toast.error('Failed to update link'),
		refetchQueries: ['FindTaskLinks']
	})

	const [deleteMutation, { loading: isDeleting }] = useDeleteTaskLinkMutation({
		onCompleted: () => toast.success('Link deleted'),
		onError: () => toast.error('Failed to delete link'),
		refetchQueries: ['FindTaskLinks']
	})

	const createLink = useCallback(
		(data: { title: string; url: string }) => {
			return createMutation({ variables: { taskId, data } })
		},
		[createMutation, taskId]
	)

	const updateLink = useCallback(
		(linkId: string, data: { title: string; url: string }) => {
			return updateMutation({ variables: { linkId, data } })
		},
		[updateMutation]
	)

	const deleteLink = useCallback(
		(linkId: string) => {
			return deleteMutation({ variables: { linkId } })
		},
		[deleteMutation]
	)

	return {
		links: data?.findTaskLinks,
		isLoading: isLoading || isCreating || isUpdating || isDeleting,
		error,
		createLink,
		updateLink,
		deleteLink
	}
}
