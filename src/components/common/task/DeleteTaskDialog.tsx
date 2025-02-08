'use client'

import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import {
	FindTaskByIdQuery,
	useDeleteTaskMutation
} from '@/graphql/generated/output'
import { useTaskSheet } from '@/store/task/task-sheet'

interface IDeleteTaskDialog {
	task: FindTaskByIdQuery['findTask']
	trigger?: ReactNode
}

export function DeleteTaskDialog({ task, trigger }: IDeleteTaskDialog) {
	const [isOpen, setIsOpen] = useState(false)

	const { close } = useTaskSheet()

	const [remove, { loading }] = useDeleteTaskMutation({
		onCompleted: () => {
			toast.success('Task deleted successfully')
			setIsOpen(false)
			close()
		},
		onError: () => {
			toast.error('Failed to delete task')
		}
	})

	const handleDelete = () => {
		remove({ variables: { id: task.id } })
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogTrigger asChild>
				{trigger || (
					<Button
						variant="ghost"
						size="sm"
						className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				)}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className="flex items-center gap-2 text-destructive">
						<AlertCircle className="h-5 w-5" />
						Delete Task
					</AlertDialogTitle>
					<AlertDialogDescription className="space-y-2 pt-4 text-base">
						<span>
							Are you sure you want to delete{' '}
							<span className="font-medium text-foreground">{task.title}</span>?
						</span>
						<span className="text-sm text-muted-foreground">
							This action cannot be undone. This will permanently delete the
							task and remove all associated data.
						</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="gap-2">
					<AlertDialogCancel disabled={loading} className="mt-0">
						Cancel
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={handleDelete}
						disabled={loading}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
					>
						{loading ? (
							<div className="flex items-center gap-1">
								<div className="h-4 w-4">
									<motion.span
										className="block h-1 w-1 rounded-full bg-destructive-foreground"
										animate={{
											y: [0, -8, 0],
											transition: {
												duration: 0.6,
												repeat: Infinity,
												ease: 'easeInOut',
												delay: 0
											}
										}}
									/>
									<motion.span
										className="block h-1 w-1 rounded-full bg-destructive-foreground"
										animate={{
											y: [0, -8, 0],
											transition: {
												duration: 0.6,
												repeat: Infinity,
												ease: 'easeInOut',
												delay: 0.2
											}
										}}
									/>
									<motion.span
										className="block h-1 w-1 rounded-full bg-destructive-foreground"
										animate={{
											y: [0, -8, 0],
											transition: {
												duration: 0.6,
												repeat: Infinity,
												ease: 'easeInOut',
												delay: 0.4
											}
										}}
									/>
								</div>
								Deleting...
							</div>
						) : (
							<div className="flex items-center gap-1">
								<Trash2 className="h-4 w-4" />
								Delete Task
							</div>
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
