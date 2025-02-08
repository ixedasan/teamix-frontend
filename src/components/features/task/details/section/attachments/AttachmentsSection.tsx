'use client'

import { useCallback, useState } from 'react'
import {
	ChevronRight,
	Download,
	File,
	MoreHorizontal,
	Plus,
	Trash
} from 'lucide-react'
import { toast } from 'sonner'

import { ConfirmModal } from '@/components/common/ConfirmModal'
import { Button } from '@/components/ui/Button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '@/components/ui/Collapsible'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { Separator } from '@/components/ui/Separator'
import {
	useDeleteTaskAttachmentMutation,
	useFindTaskAttachmentsQuery,
	useGenerateAttachmentDownloadUrlMutation
} from '@/graphql/generated/output'
import { formatFileSize } from '@/utils/format-file-size'
import { CreateAttachmentsForm } from './CreateAttachmentsForm'
import { cn } from '@/lib/utils'

interface ITaskAttachmentsSection {
	taskId: string
}

export function TaskAttachmentsSection({ taskId }: ITaskAttachmentsSection) {
	const [open, setOpen] = useState(false)
	const [isDownloading, setIsDownloading] = useState<string | null>(null)

	const { data } = useFindTaskAttachmentsQuery({ variables: { taskId } })
	const attachments = data?.findTaskAttachments || []

	const [deleteAttachment] = useDeleteTaskAttachmentMutation({
		onCompleted: () => {
			toast.success('Attachment deleted')
		},
		onError: () => {
			toast.error('Failed to delete attachment')
		},
		refetchQueries: ['FindTaskAttachments']
	})

	const [generateDownloadUrl] = useGenerateAttachmentDownloadUrlMutation()

	const handleDownload = async (id: string, filename: string) => {
		setIsDownloading(id)
		try {
			const { data } = await generateDownloadUrl({ variables: { id } })
			const url = data?.generateAttachmentDownloadUrl

			if (!url) {
				throw new Error('Failed to get download URL')
			}

			const link = document.createElement('a')
			link.href = url
			link.download = filename
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		} catch {
			toast.error('Failed to download file')
		} finally {
			setIsDownloading(null)
		}
	}

	const memoizedFormatFileSize = useCallback((size: number) => {
		return formatFileSize(size)
	}, [])

	if (!attachments.length) return null

	return (
		<Collapsible
			defaultOpen={true}
			open={open}
			onOpenChange={setOpen}
			className="w-full space-y-2 pt-2"
		>
			<div className="flex items-center justify-between">
				<CollapsibleTrigger className="flex w-full items-center gap-2 text-sm font-medium">
					<ChevronRight
						className={cn(
							'size-4 transform transition-transform',
							open ? 'rotate-90' : 'rotate-0'
						)}
					/>
					<span>Attachments</span>
					<span className="rounded bg-muted px-1.5 py-0.5 text-xs">
						{attachments.length}
					</span>
				</CollapsibleTrigger>
				{open && (
					<CreateAttachmentsForm
						taskId={taskId}
						trigger={<Plus className="mr-2 size-4 cursor-pointer" />}
					/>
				)}
			</div>
			<Separator />
			<CollapsibleContent>
				{attachments.map(file => (
					<div
						key={file.id}
						className="mt-2 flex items-center justify-between rounded-md bg-muted/50 px-4 py-2 hover:bg-muted/80"
					>
						<div className="flex items-center gap-2">
							<File className="size-6 text-muted-foreground" />
							<div className="flex flex-col">
								<span className="text-sm">{file.filename}</span>
								<span className="text-xs text-muted-foreground">
									{memoizedFormatFileSize(file.size)}
								</span>
							</div>
						</div>
						<div className="flex items-center gap-1">
							<Button
								variant="ghost"
								size="icon"
								className="size-8"
								onClick={() => handleDownload(file.id, file.filename)}
								disabled={isDownloading === file.id}
								title="Download file"
							>
								<Download
									className={cn(
										'size-4',
										isDownloading === file.id && 'animate-bounce'
									)}
								/>
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon" className="size-8">
										<MoreHorizontal className="size-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="gap-1">
									<ConfirmModal
										heading="Delete attachment"
										message="Are you sure you want to delete this attachment?"
										onConfirm={() =>
											deleteAttachment({ variables: { id: file.id } })
										}
									>
										<Button
											variant="ghost"
											size="sm"
											className="w-full text-destructive"
										>
											Delete
											<Trash className="ml-1 size-4" />
										</Button>
									</ConfirmModal>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
				))}
			</CollapsibleContent>
		</Collapsible>
	)
}
