'use client'

import { useState } from 'react'
import { formatDistance } from 'date-fns'
import {
	ChevronRight,
	Copy,
	Edit,
	Link2,
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
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { Separator } from '@/components/ui/Separator'
import {
	FindTaskByIdQuery,
	useCreateTaskLinkMutation,
	useDeleteTaskLinkMutation,
	useUpdateTaskLinkMutation
} from '@/graphql/generated/output'
import { TaskLinkForm } from '../common/TaskLinkForm'
import { cn } from '@/lib/utils'

interface ITaskLinkSection {
	task: FindTaskByIdQuery['findTask']
}

export function TaskLinkSection({ task }: ITaskLinkSection) {
	const [open, setOpen] = useState(false)

	const [create] = useCreateTaskLinkMutation({
		onCompleted: () => {
			toast.success('Link added')
		},
		onError: () => {
			toast.error('Failed to add link')
		},
		refetchQueries: ['FindTaskById']
	})

	const [update] = useUpdateTaskLinkMutation({
		onCompleted: () => {
			toast.success('Link updated')
		},
		onError: () => {
			toast.error('Failed to update link')
		},
		refetchQueries: ['FindTaskById']
	})

	const [deleteLink] = useDeleteTaskLinkMutation({
		onCompleted: () => {
			toast.success('Link deleted')
		},
		onError: () => {
			toast.error('Failed to delete link')
		},
		refetchQueries: ['FindTaskById']
	})

	const handleCopy = (url: string) => {
		try {
			navigator.clipboard.writeText(url)
			toast.success('Link copied to clipboard')
		} catch {
			toast.error('Failed to copy link')
		}
	}

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
					<span>Links</span>
					<span className="rounded bg-muted px-1.5 py-0.5 text-xs">
						{task?.links.length}
					</span>
				</CollapsibleTrigger>
				{open && (
					<TaskLinkForm
						title="Add link"
						submitLabel="Add"
						onSubmit={data => create({ variables: { taskId: task?.id, data } })}
						trigger={<Plus className="mr-2 size-4 cursor-pointer" />}
					/>
				)}
			</div>
			<Separator />
			<CollapsibleContent>
				{task?.links.map(link => (
					<a
						key={link.id}
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<div className="mt-2 flex items-center justify-between rounded-md bg-muted/50 px-4 py-2 hover:bg-muted/80">
							<div className="flex items-center gap-2">
								<Link2 className="size-4 text-muted-foreground" />
								{link.title}
								<span className="text-xs text-muted-foreground">
									{formatDistance(new Date(link.createdAt), new Date(), {
										addSuffix: true
									})}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<Button
									variant="ghost"
									size="icon"
									className="size-8"
									onClick={e => {
										e.preventDefault()
										handleCopy(link.url)
									}}
									title="Copy link"
								>
									<Copy className="size-4" />
								</Button>
								<DropdownMenu>
									<DropdownMenuTrigger
										asChild
										onClick={e => e.stopPropagation()}
									>
										<Button variant="ghost" size="icon" className="size-8">
											<MoreHorizontal className="size-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end" className="gap-1">
										<TaskLinkForm
											initialData={{ title: link.title ?? '', url: link.url }}
											title="Edit link"
											submitLabel="Save"
											onSubmit={data =>
												update({ variables: { linkId: link.id, data } })
											}
											trigger={
												<Button variant="ghost" size="sm" className="w-full">
													Edit
													<Edit className="ml-1 size-4" />
												</Button>
											}
										/>

										<ConfirmModal
											heading="Delete link"
											message="Are you sure you want to delete this link?"
											onConfirm={() =>
												deleteLink({ variables: { linkId: link.id } })
											}
										>
											<DropdownMenuItem className="flex justify-center text-destructive">
												Delete
												<Trash className="ml-1 size-4" />
											</DropdownMenuItem>
										</ConfirmModal>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>
					</a>
				))}
			</CollapsibleContent>
		</Collapsible>
	)
}
