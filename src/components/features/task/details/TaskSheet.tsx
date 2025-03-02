'use client'

import { useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import { MoreVerticalIcon, Trash } from 'lucide-react'
import { toast } from 'sonner'

import { DeleteTaskDialog } from '@/components/common/task/DeleteTaskDialog'
import { Button } from '@/components/ui/Button'
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle
} from '@/components/ui/Drawer'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import { ScrollArea } from '@/components/ui/ScrollArea'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/components/ui/Sheet'
import { useFindTaskByIdQuery } from '@/graphql/generated/output'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useTaskSheet } from '@/store/task/task-sheet'
import { QuickEditSection } from './section/QuickEditSection'
import { TaskHeaderSection } from './section/TaskHeaderSection'

const CommentsSection = dynamic(
	() =>
		import('./section/comments/CommentsSection').then(m => m.CommentsSection),
	{ ssr: false }
)

const TaskLinkSection = dynamic(
	() => import('./section/links/TaskLinkSection').then(m => m.TaskLinkSection),
	{ ssr: false }
)

const TaskAttachmentsSection = dynamic(
	() =>
		import('./section/attachments/AttachmentsSection').then(
			m => m.TaskAttachmentsSection
		),
	{ ssr: false }
)

export function TaskSheet() {
	const isDesktop = useMediaQuery('(min-width: 768px)')
	const router = useRouter()
	const searchParams = useSearchParams()

	const { isOpen, taskId, open, close } = useTaskSheet()

	useEffect(() => {
		const taskIdFromUrl = searchParams.get('taskId')
		if (taskIdFromUrl && !isOpen) {
			open(taskIdFromUrl)
		}
	}, [searchParams, open, isOpen])

	const { data, loading, error } = useFindTaskByIdQuery({
		variables: { id: taskId ?? '' },
		skip: !taskId
	})
	const task = data?.findTask

	const handleOpenChange = useCallback(
		(openState: boolean) => {
			if (!openState) {
				const params = new URLSearchParams(searchParams.toString())
				params.delete('taskId')

				const newUrl = params.toString() ? `?${params.toString()}` : ''
				router.push(newUrl, { scroll: false })

				close()
			}
		},
		[close, router, searchParams]
	)

	if (error) {
		toast.error('Failed to load task details')
	}

	if (!task && isOpen && !loading) return null

	if (isDesktop) {
		return (
			<Sheet open={isOpen} onOpenChange={handleOpenChange}>
				<SheetContent className="h-full w-full max-w-2xl overflow-y-auto md:max-w-3xl xl:max-w-5xl">
					<SheetHeader>
						<SheetTitle className="sr-only"></SheetTitle>
						<SheetDescription className="sr-only"></SheetDescription>

						<DropdownMenu>
							<DropdownMenuTrigger
								asChild
								tabIndex={-1}
								className="absolute left-0 top-0 translate-x-2 p-4"
							>
								<Button variant="ghost" className="size-4">
									<MoreVerticalIcon className="size-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DeleteTaskDialog
									task={task}
									trigger={
										<Button
											className="w-full p-0 text-muted-foreground hover:text-destructive"
											variant="ghost"
										>
											Delete <Trash />
										</Button>
									}
								/>
							</DropdownMenuContent>
						</DropdownMenu>
					</SheetHeader>
					{task && (
						<div className="relative flex flex-col space-y-3 px-8 py-5">
							<TaskHeaderSection task={task} isLoading={loading} />

							<QuickEditSection task={task} isLoading={loading} />

							<TaskLinkSection taskId={task.id} />

							<TaskAttachmentsSection taskId={task.id} />

							<CommentsSection taskId={task.id} />
						</div>
					)}
				</SheetContent>
			</Sheet>
		)
	}

	return (
		<Drawer open={isOpen} onOpenChange={handleOpenChange}>
			<DrawerContent className="h-[90%]">
				<ScrollArea className="h-full">
					<DrawerHeader>
						<DrawerTitle className="sr-only"></DrawerTitle>
						<DrawerDescription className="sr-only"></DrawerDescription>
						{task && (
							<DropdownMenu>
								<DropdownMenuTrigger
									asChild
									tabIndex={-1}
									className="absolute left-0 top-0 translate-x-2 p-4"
								>
									<Button variant="ghost" className="size-4">
										<MoreVerticalIcon className="size-4" />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DeleteTaskDialog
										task={task}
										trigger={
											<Button
												className="w-full p-0 text-muted-foreground hover:text-destructive"
												variant="ghost"
											>
												Delete <Trash />
											</Button>
										}
									/>
								</DropdownMenuContent>
							</DropdownMenu>
						)}
					</DrawerHeader>
					{task && (
						<div className="relative flex flex-col space-y-3 p-4">
							<TaskHeaderSection task={task} isLoading={loading} />

							<QuickEditSection task={task} isLoading={loading} />

							<TaskLinkSection taskId={task.id} />

							<TaskAttachmentsSection taskId={task.id} />

							<CommentsSection taskId={task.id} />
						</div>
					)}
				</ScrollArea>
			</DrawerContent>
		</Drawer>
	)
}
