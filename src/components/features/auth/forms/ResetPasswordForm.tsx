'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { useResetPasswordMutation } from '@/graphql/generated/output'
import {
	ResetPasswordSchema,
	TypeResetPasswordSchema
} from '@/schemas/auth/reset-password.schema'
import { AuthWrapper } from '../AuthWrapper'

export function ResetPasswordForm() {
	const t = useTranslations('auth.resetPassword')

	const [isSuccess, setIsSuccess] = useState(false)

	const form = useForm<TypeResetPasswordSchema>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: ''
		}
	})

	const [resetPassword, { loading: isLoading }] = useResetPasswordMutation({
		onCompleted: () => {
			setIsSuccess(true)
			form.reset()
		},
		onError: () => {
			toast.error(t('errorMessage'))
		}
	})

	const { isValid } = form.formState

	const onSubmit = (data: TypeResetPasswordSchema) => {
		resetPassword({ variables: { data } })
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref="/account/login"
		>
			{isSuccess ? (
				<Alert>
					<CircleCheck className="size-4" />
					<AlertTitle>{t('successAlertTitle')}</AlertTitle>
					<AlertDescription>{t('successAlertDescription')}</AlertDescription>
				</Alert>
			) : (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('emailLabel')}</FormLabel>
									<FormControl>
										<Input
											placeholder="john.doe@example.com"
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<Button className="mt-2 w-full" disabled={!isValid || isLoading}>
							{t('submitButton')}
						</Button>
					</form>
				</Form>
			)}
		</AuthWrapper>
	)
}
