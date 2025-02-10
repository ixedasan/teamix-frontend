'use client'

import { useState, type ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
import {
	TaskLinkSchema,
	type TypeTaskLinkSchema
} from '@/schemas/task/task-link.schema'

interface ITaskLinkForm {
	trigger?: ReactNode
	initialData?: TypeTaskLinkSchema
	onSubmit: (data: TypeTaskLinkSchema) => void
	title?: string
	submitLabel?: string
	isLoading?: boolean
}

export function TaskLinkForm({
	trigger,
	initialData,
	onSubmit,
	title = 'Add link',
	submitLabel = 'Create',
	isLoading = false
}: ITaskLinkForm) {
	const [open, setOpen] = useState(false)

	const form = useForm<TypeTaskLinkSchema>({
		resolver: zodResolver(TaskLinkSchema),
		values: {
			url: initialData?.url || '',
			title: initialData?.title || ''
		}
	})

	const { isValid } = form.formState

	const handleSubmit = (data: TypeTaskLinkSchema) => {
		try {
			onSubmit(data)
			setOpen(false)
			form.reset()
		} catch {
			toast.error('Failed to create link')
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{trigger ? (
					trigger
				) : (
					<Button variant="outline" size="icon">
						<Plus className="size-4" />
					</Button>
				)}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription className="hidden"></DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4"
					>
						<FormField
							control={form.control}
							name="url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>URL</FormLabel>
									<FormControl>
										<Input placeholder="" disabled={isLoading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Title</FormLabel>
									<FormControl>
										<Input placeholder="" disabled={isLoading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-end gap-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpen(false)}
								disabled={isLoading}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={!isValid || isLoading}>
								{submitLabel}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
