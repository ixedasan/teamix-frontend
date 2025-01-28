'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { EmojiPicker } from '@/components/common/EmojiPicker'
import { FormWrapper } from '@/components/common/FormWrapper'
import { SkeletonWrapper } from '@/components/common/SkeletonWrapper'
import { Button } from '@/components/ui/Button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import {
	useChangeProjectInfoMutation,
	useFindProjectByIdQuery
} from '@/graphql/generated/output'
import {
	ChangeProjectInfoSchema,
	type TypeChangeProjectInfoSchema
} from '@/schemas/project/change-project-info.schema'

export function ChangeProjectInfoForm() {
	const t = useTranslations('projects.settings.general.info')

	const { data, loading, refetch } = useFindProjectByIdQuery()
	const project = data?.findProjectById

	const form = useForm<TypeChangeProjectInfoSchema>({
		resolver: zodResolver(ChangeProjectInfoSchema),
		values: {
			name: project?.name ?? '',
			icon: project?.icon ?? '',
			description: project?.description ?? ''
		}
	})

	const { isValid, isDirty } = form.formState
	const descriptionLength = form.watch('description')?.length || 0

	const [change, { loading: isLoadingChange }] = useChangeProjectInfoMutation({
		onCompleted: () => {
			form.reset()
			toast.success(t('successMessage'))
			refetch()
		},
		onError: error => {
			toast.error(t('errorMessage'), {
				description: error.message
			})
		}
	})

	const onSubmit = (data: TypeChangeProjectInfoSchema) => {
		change({ variables: { data } })
	}

	return (
		<FormWrapper heading={t('heading')}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-6">
					<div className="flex w-full items-center gap-4">
						<FormField
							control={form.control}
							name="icon"
							render={({ field }) => (
								<FormItem>
									<SkeletonWrapper isLoading={loading}>
										<FormControl>
											<EmojiPicker
												onChange={(emoji: string) => field.onChange(emoji)}
												isDisabled={isLoadingChange}
												value={field.value}
											/>
										</FormControl>
									</SkeletonWrapper>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="w-full">
									<SkeletonWrapper isLoading={loading}>
										<FormControl>
											<Input
												placeholder={t('projectNamePlaceholder')}
												disabled={isLoadingChange}
												{...field}
											/>
										</FormControl>
									</SkeletonWrapper>
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<SkeletonWrapper isLoading={loading}>
									<FormControl>
										<div className="relative">
											<Textarea
												className="mb-6"
												placeholder={t('projectDescriptionPlaceholder')}
												disabled={isLoadingChange}
												maxLength={300}
												{...field}
											/>
											<div className="absolute bottom-2 right-3 text-sm text-muted-foreground">
												{descriptionLength}/300
											</div>
										</div>
									</FormControl>
								</SkeletonWrapper>
							</FormItem>
						)}
					/>
					<div className="flex justify-start">
						<Button disabled={!isValid || !isDirty || isLoadingChange}>
							{t('submitButton')}
						</Button>
					</div>
				</form>
			</Form>
		</FormWrapper>
	)
}
