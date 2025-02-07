'use client'

import { useCallback } from 'react'
// import { CommentsSection } from './section/CommentsSection'
import dynamic from 'next/dynamic'

import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle
} from '@/components/ui/Drawer'
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
	() => import('./section/CommentsSection').then(m => m.CommentsSection),
	{ ssr: false }
)

const TaskLinkSection = dynamic(
	() => import('./section/TaskLinkSection').then(m => m.TaskLinkSection),
	{ ssr: false }
)

export function TaskSheet() {
	const isDesktop = useMediaQuery('(min-width: 768px)')

	const { isOpen, taskId, close } = useTaskSheet()

	const { data, loading, error } = useFindTaskByIdQuery({
		variables: { id: taskId ?? '' },
		skip: !taskId
	})
	const task = data?.findTask

	const handleOpenChange = useCallback(
		(open: boolean) => {
			if (!open) close()
		},
		[close]
	)
	if (!task) return null

	if (isDesktop) {
		return (
			<Sheet open={isOpen} onOpenChange={handleOpenChange}>
				<SheetContent className="h-full w-full max-w-2xl overflow-y-auto md:max-w-3xl xl:max-w-5xl">
					<SheetHeader className="hidden">
						<SheetTitle></SheetTitle>
						<SheetDescription></SheetDescription>
					</SheetHeader>
					<div className="relative flex flex-col space-y-3 px-8 py-5">
						{/* Main info */}
						<TaskHeaderSection task={task} isLoading={loading} />

						{/* Quick editing */}
						<QuickEditSection task={task} isLoading={loading} />

						{task.links.length > 0 && <TaskLinkSection task={task} />}

						<CommentsSection taskId={task.id} />
					</div>
				</SheetContent>
			</Sheet>
		)
	}

	return (
		<Drawer open={isOpen} onOpenChange={handleOpenChange}>
			<DrawerContent className="h-[90%]">
				<DrawerHeader className="hidden">
					<DrawerTitle></DrawerTitle>
					<DrawerDescription></DrawerDescription>
				</DrawerHeader>
				<div className="relative flex flex-col space-y-3 p-4">
					{/* Main info */}
					<TaskHeaderSection task={task} isLoading={loading} />

					{/* Quick editing */}
					<QuickEditSection task={task} isLoading={loading} />

					{task.links.length > 0 && <TaskLinkSection task={task} />}

					<CommentsSection taskId={task.id} />
				</div>
			</DrawerContent>
		</Drawer>
	)
}
