'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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
import { useChangePasswordMutation } from '@/graphql/generated/output'
import { useCurrentUser } from '@/hooks/use-current-user'
import {
	ChangePasswordSchema,
	type TypeChangePasswordSchema
} from '@/schemas/user/change-password.schema'

export function ChangePasswordForm() {
	const t = useTranslations('settings.account.password')

	const { refetch, loading } = useCurrentUser()

	const form = useForm<TypeChangePasswordSchema>({
		resolver: zodResolver(ChangePasswordSchema),
		values: {
			oldPassword: '',
			newPassword: ''
		}
	})

	const { isValid } = form.formState

	const [update, { loading: isLoadingUpdate }] = useChangePasswordMutation({
		onCompleted() {
			form.reset()
			refetch()
			toast.success(t('successMessage'))
		},
		onError(error) {
			toast.error(t('errorMessage'), { description: error.message })
		}
	})

	const onSubmit = (data: TypeChangePasswordSchema) => {
		update({ variables: { data } })
	}

	return (
		<FormWrapper heading={t('heading')}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
					<FormField
						control={form.control}
						name="oldPassword"
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t('oldPasswordLabel')}</FormLabel>
								<SkeletonWrapper isLoading={loading}>
									<FormControl>
										<Input
											placeholder="••••••••"
											type="password"
											disabled={isLoadingUpdate}
											{...field}
										/>
									</FormControl>
								</SkeletonWrapper>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="newPassword"
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t('newPasswordLabel')}</FormLabel>
								<SkeletonWrapper isLoading={loading}>
									<FormControl>
										<Input
											placeholder="••••••••"
											type="password"
											disabled={isLoadingUpdate}
											{...field}
										/>
									</FormControl>
								</SkeletonWrapper>
							</FormItem>
						)}
					/>
					<div className="flex justify-end p-5">
						<Button disabled={!isValid || isLoadingUpdate}>
							{t('submitButton')}
						</Button>
					</div>
				</form>
			</Form>
		</FormWrapper>
	)
}
