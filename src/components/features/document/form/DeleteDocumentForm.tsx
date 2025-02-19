'use client'

import { MoreHorizontal, X } from 'lucide-react'
import { toast } from 'sonner'

import { ConfirmModal } from '@/components/common/ConfirmModal'
import { Button } from '@/components/ui/Button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { useDeleteDocumentMutation } from '@/graphql/generated/output'

interface IDeleteDocumentForm {
	documentId: string
}

export function DeleteDocumentForm({ documentId }: IDeleteDocumentForm) {
	const [remove, { loading: isLoading }] = useDeleteDocumentMutation({
		onCompleted: () => {
			toast.success('Document deleted successfully!')
		},
		onError: error => {
			toast.error('Failed to delete document', { description: error.message })
		},
		refetchQueries: ['FindDocumentsByProject']
	})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="flex w-full flex-col items-center"
				onClick={e => e.stopPropagation()}
			>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<ConfirmModal
					heading="Delete Document"
					message="Are you sure you want to delete this document?"
					onConfirm={() => remove({ variables: { id: documentId } })}
				>
					<Button
						variant="ghost"
						size="sm"
						disabled={isLoading}
						className="w-full"
					>
						<span>Delete</span>
						<X className="size-4" />
					</Button>
				</ConfirmModal>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
