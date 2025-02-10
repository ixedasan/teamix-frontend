'use client'

import { useState, type ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { DateSelector } from '@/components/common/task/DateSelector'
import { PrioritySelector } from '@/components/common/task/PriorytySelector'
import { StatusSelector } from '@/components/common/task/StatusSelector'
import { Button } from '@/components/ui/Button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/Dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import {
	Priority,
	TaskStatus,
	useCreateTaskMutation
} from '@/graphql/generated/output'
import {
	CreateTaskSchema,
	type TypeCreateTaskSchema
} from '@/schemas/task/create-task.schema'

interface CreateTaskDialogProps {
	trigger?: ReactNode
	initialStatus?: TaskStatus
}

export function CreateTaskDialog({
	trigger,
	initialStatus
}: CreateTaskDialogProps) {
	const [open, setOpen] = useState(false)

	const form = useForm<TypeCreateTaskSchema>({
		resolver: zodResolver(CreateTaskSchema),
		values: {
			title: '',
			description: '',
			status: initialStatus ?? TaskStatus.Backlog,
			priority: Priority.None,
			startDate: undefined,
			dueDate: undefined
		}
	})

	const [create, { loading }] = useCreateTaskMutation({
		onCompleted: () => {
			toast.success('Task created successfully!')
			form.reset()
			setOpen(false)
		},
		onError: error => {
			toast.error('Failed to create task', {
				description: error.message
			})
		}
	})

	const onSubmit = (data: TypeCreateTaskSchema) => {
		create({ variables: { data: data } })
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger || (
					<Button
						variant="outline"
						size="sm"
						className="flex items-center gap-2"
					>
						<Calendar className="size-4" />
						<span>Create Task</span>
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Create New Task</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="Enter task title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter task description"
											className="min-h-24"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex items-center gap-2">
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<StatusSelector
										value={field.value}
										onChange={field.onChange}
										disabled={loading}
										triggerVariant="icon-only"
									/>
								)}
							/>
							<FormField
								control={form.control}
								name="priority"
								render={({ field }) => (
									<PrioritySelector
										value={field.value}
										onChange={field.onChange}
										disabled={loading}
										triggerVariant="icon-only"
									/>
								)}
							/>
							<FormField
								control={form.control}
								name="startDate"
								render={({ field }) => (
									<DateSelector
										value={field.value}
										onChange={field.onChange}
										disabled={loading}
										contentAlignment="start"
										triggerVariant="icon-only"
									/>
								)}
							/>
							<FormField
								control={form.control}
								name="dueDate"
								render={({ field }) => (
									<DateSelector
										value={field.value}
										onChange={field.onChange}
										disabled={loading}
										contentAlignment="start"
										triggerVariant="icon-only"
									/>
								)}
							/>
						</div>
						<div className="flex justify-end gap-2 pt-4">
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpen(false)}
								disabled={loading}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={loading}>
								Create Task
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
