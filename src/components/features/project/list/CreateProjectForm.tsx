'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { EmojiPicker } from '@/components/common/EmojiPicker'
import { Button } from '@/components/ui/Button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { useCreateProjectMutation } from '@/graphql/generated/output'
import {
	CreateProjectSchema,
	TypeCreateProjectSchema
} from '@/schemas/project/create-project.schema'

interface ICreateProjectForm {
	showCancelButton?: boolean
	onCancel?: () => void
}

export function CreateProjectForm({
	showCancelButton,
	onCancel
}: ICreateProjectForm) {
	const t = useTranslations('projects.create')

	const router = useRouter()

	const form = useForm<TypeCreateProjectSchema>({
		resolver: zodResolver(CreateProjectSchema),
		defaultValues: {
			name: '',
			icon: '',
			description: ''
		}
	})

	const { isValid, isDirty } = form.formState
	const descriptionLength = form.watch('description')?.length || 0

	const [create, { loading: isLoadingCreate }] = useCreateProjectMutation({
		onCompleted: response => {
			form.reset()
			router.push(`/projects/${response.createProject.id}/settings`)
		},
		onError: error => {
			toast.error(error.message)
		}
	})

	const onSubmit = (data: TypeCreateProjectSchema) => {
		create({ variables: { data } })
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-6">
				<div className="flex w-full items-center gap-4">
					<FormField
						control={form.control}
						name="icon"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<EmojiPicker
										onChange={(emoji: string) => field.onChange(emoji)}
										isDisabled={isLoadingCreate}
									/>
								</FormControl>
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
										placeholder={t('projectNamePlaceholder')}
										disabled={isLoadingCreate}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<div className="relative">
									<Textarea
										className="mb-6"
										placeholder={t('projectDescriptionPlaceholder')}
										disabled={isLoadingCreate}
										maxLength={300}
										{...field}
									/>
									<div className="absolute bottom-2 right-3 text-sm text-muted-foreground">
										{descriptionLength}/300
									</div>
								</div>
							</FormControl>
						</FormItem>
					)}
				/>
				<div className="flex w-full flex-col gap-4 pb-2">
					<Button disabled={!isValid || !isDirty || isLoadingCreate}>
						{t('submitButton')}
					</Button>
					{showCancelButton && (
						<Button type="button" variant="outline" onClick={onCancel}>
							{t('cancelButton')}
						</Button>
					)}
				</div>
			</form>
		</Form>
	)
}
