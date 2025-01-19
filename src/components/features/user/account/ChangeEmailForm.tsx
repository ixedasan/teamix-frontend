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
import { useChangeEmailMutation } from '@/graphql/generated/output'
import { useCurrentUser } from '@/hooks/use-current-user'
import {
	ChangeEmailSchema,
	type TypeChangeEmailSchema
} from '@/schemas/user/change-email.schema'

export function ChangeEmailForm() {
	const t = useTranslations('settings.account.email')

	const { profile, loading, refetch } = useCurrentUser()

	const form = useForm<TypeChangeEmailSchema>({
		resolver: zodResolver(ChangeEmailSchema),
		values: {
			email: profile?.email ?? ''
		}
	})

	const { isValid, isDirty } = form.formState

	const [update, { loading: isLoadingUpdate }] = useChangeEmailMutation({
		onCompleted() {
			refetch()
			toast.success(t('successMessage'))
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const onSubmit = (data: TypeChangeEmailSchema) => {
		update({ variables: { data } })
	}

	return (
		<FormWrapper heading={t('heading')}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="px-5">
								<FormLabel>{t('emailLabel')}</FormLabel>
								<SkeletonWrapper isLoading={loading}>
									<FormControl>
										<Input
											placeholder="john.doe@example.com"
											disabled={isLoadingUpdate}
											{...field}
										/>
									</FormControl>
								</SkeletonWrapper>
							</FormItem>
						)}
					/>
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
