'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ColorSelector } from '@/components/common/ColorSelector'
import { Button } from '@/components/ui/Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
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
	useCreateLabelMutation,
	useFindProjectByIdQuery
} from '@/graphql/generated/output'
import { TypeCreateLabelSchema } from '@/schemas/project/create-label.schema'

export function CreateLabelForm() {
	const t = useTranslations('projects.settings.labels.create')

	const [open, setOpen] = useState(false)

	const { refetch } = useFindProjectByIdQuery()

	const form = useForm<TypeCreateLabelSchema>({
		defaultValues: {
			name: '',
			color: '#ffffff'
		}
	})

	const { isValid } = form.formState

	const [create, { loading: isLoadingCreate }] = useCreateLabelMutation({
		onCompleted: () => {
			setOpen(false)
			form.reset()
			toast.success(t('successMessage'))
			refetch()
		},
		onError: () => {
			toast.error(t('errorMessage'))
		}
	})

	const onSubmit = (data: TypeCreateLabelSchema) => {
		create({
			variables: { data }
		})
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<Plus className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t('heading')}</DialogTitle>
					<DialogDescription>{t('description')}</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<div className="flex items-center gap-4">
							<FormField
								control={form.control}
								name="color"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<ColorSelector
												onChange={(color: string) => field.onChange(color)}
												isDisabled={isLoadingCreate}
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
											<Input
												placeholder={t('namePlaceholder')}
												disabled={isLoadingCreate}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex justify-end gap-2">
							<Button
								type="button"
								variant="outline"
								onClick={() => setOpen(false)}
								disabled={isLoadingCreate}
							>
								{t('cancelButton')}
							</Button>
							<Button type="submit" disabled={!isValid || isLoadingCreate}>
								{t('submitButton')}
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
