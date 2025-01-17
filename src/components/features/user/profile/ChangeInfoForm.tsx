'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@radix-ui/react-separator'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { FormWrapper } from '@/components/common/FormWrapper'
import { SkeletonWrapper } from '@/components/common/SkeletonWrapper'
import { Button } from '@/components/ui/Button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import {
	useChangeProfileInfoMutation,
	useFindProfileQuery
} from '@/graphql/generated/output'
import {
	ChangeInfoSchema,
	TypeChangeInfoSchema
} from '@/schemas/user/change-info.schema'

export function ChangeInfoForm() {
	const t = useTranslations('settings.profile.info')

	const { data, loading, refetch } = useFindProfileQuery()
	const profile = data?.findProfile

	const form = useForm<TypeChangeInfoSchema>({
		resolver: zodResolver(ChangeInfoSchema),
		values: {
			username: profile?.username ?? '',
			displayName: profile?.displayName ?? '',
			bio: profile?.bio ?? ''
		}
	})

	const [update, { loading: isLoadingUpdate }] = useChangeProfileInfoMutation({
		onCompleted() {
			refetch()
			toast.success(t('successMessage'))
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const { isValid, isDirty } = form.formState
	const bioLength = form.watch('bio')?.length || 0

	const onSubmit = (data: TypeChangeInfoSchema) => {
		update({ variables: { data } })
	}

	return (
		<FormWrapper heading={t('heading')}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t('usernameLabel')}</FormLabel>
								<SkeletonWrapper isLoading={loading}>
									<FormControl>
										<Input
											placeholder={t('usernamePlaceholder')}
											disabled={isLoadingUpdate}
											{...field}
										/>
									</FormControl>
								</SkeletonWrapper>
							</FormItem>
						)}
					/>
					<Separator />
					<FormField
						control={form.control}
						name="displayName"
						render={({ field }) => (
							<FormItem className="px-5 pb-3">
								<FormLabel>{t('displayNameLabel')}</FormLabel>
								<SkeletonWrapper isLoading={loading}>
									<FormControl>
										<Input
											placeholder={t('displayNamePlaceholder')}
											disabled={isLoadingUpdate}
											{...field}
										/>
									</FormControl>
								</SkeletonWrapper>
							</FormItem>
						)}
					/>
					<Separator />
					<FormField
						control={form.control}
						name="bio"
						render={({ field }) => (
							<FormItem className="px-5 pb-3">
								<FormLabel>{t('bioLabel')}</FormLabel>
								<SkeletonWrapper isLoading={loading}>
									<FormControl>
										<div className="relative">
											<Textarea
												className="pb-6"
												disabled={isLoadingUpdate}
												maxLength={300}
												{...field}
											/>
											<div className="absolute bottom-2 right-3 text-sm text-muted-foreground">
												{bioLength}/300
											</div>
										</div>
									</FormControl>
								</SkeletonWrapper>
							</FormItem>
						)}
					/>
					<Separator />
					<div className="flex justify-end p-5">
						<Button disabled={!isValid || !isDirty || isLoadingUpdate}>
							{t('submitButton')}
						</Button>
					</div>
				</form>
			</Form>
		</FormWrapper>
	)
}
