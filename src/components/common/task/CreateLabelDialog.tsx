'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/Button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from '@/components/ui/Dialog'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import {
	useAddLabelToTaskMutation,
	useCreateLabelMutation
} from '@/graphql/generated/output'
import {
	CreateLabelSchema,
	TypeCreateLabelSchema
} from '@/schemas/project/create-label.schema'
import { ColorSelector } from '../ColorSelector'

interface CreateLabelDialogProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	taskId: string
	initialLabelName?: string
	onSuccess?: () => void
}

export function CreateLabelDialog({
	isOpen,
	onOpenChange,
	taskId,
	initialLabelName = '',
	onSuccess
}: CreateLabelDialogProps) {
	const form = useForm<TypeCreateLabelSchema>({
		resolver: zodResolver(CreateLabelSchema),
		defaultValues: {
			name: initialLabelName,
			color: '#ffffff'
		}
	})

	const [createLabel] = useCreateLabelMutation()
	const [addLabel] = useAddLabelToTaskMutation()

	useEffect(() => {
		if (isOpen) {
			form.reset({
				name: initialLabelName,
				color: '#ffffff'
			})
		}
	}, [isOpen, initialLabelName, form])

	const handleCreateAndAssign = async (values: TypeCreateLabelSchema) => {
		try {
			const { data } = await createLabel({
				variables: {
					data: {
						name: values?.name,
						color: values?.color
					}
				},
				refetchQueries: ['FindProjectById']
			})

			if (data?.createTaskLabel) {
				await addLabel({
					variables: {
						taskId,
						labelId: data.createTaskLabel.id
					}
				})
				onOpenChange(false)
				form.reset()
				onSuccess?.()
			}
		} catch (error) {
			console.error('Error creating label:', error)
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create label and assign to task</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleCreateAndAssign)}
						className="mt-2 space-y-6"
					>
						<div className="flex items-center gap-4">
							<FormField
								control={form.control}
								name="color"
								render={({ field }) => (
									<FormItem className="flex items-center">
										<FormControl>
											<ColorSelector
												onChange={(color: string) => field.onChange(color)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormControl>
											<Input placeholder="Label name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<Button type="submit" className="w-full">
							Create and assign label
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
