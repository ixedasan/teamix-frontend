'use client'

import { useState, type ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calendar } from 'lucide-react'
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
import { useCreateDocumentMutation } from '@/graphql/generated/output'
import {
	CreateDocumentSchema,
	TypeCreateDocumentSchema
} from '@/schemas/document/create-document.schema'

interface CreateDocumentDialogProps {
	trigger?: ReactNode
}

export function CreateDocumentDialog({ trigger }: CreateDocumentDialogProps) {
	const [open, setOpen] = useState(false)

	const form = useForm<TypeCreateDocumentSchema>({
		resolver: zodResolver(CreateDocumentSchema),
		defaultValues: {
			title: ''
		}
	})

	const [create, { loading }] = useCreateDocumentMutation({
		onCompleted: () => {
			toast.success('Document created successfully!')
			form.reset()
			setOpen(false)
		},
		onError: error => {
			toast.error('Failed to create document', {
				description: error.message
			})
		},
		refetchQueries: ['FindDocumentsByProject']
	})

	const onSubmit = (data: TypeCreateDocumentSchema) => {
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
						<span>Create Doc</span>
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Create New Document</DialogTitle>
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
										<Input placeholder="Enter docs title" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
