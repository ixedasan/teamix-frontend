'use client'

import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/Button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { useNewPasswordMutation } from '@/graphql/generated/output'
import {
	NewPasswordSchema,
	TypeNewPasswordSchema
} from '@/schemas/auth/new-password.schema'
import { AuthWrapper } from '../AuthWrapper'

export function NewPasswordForm() {
	const t = useTranslations('auth.newPassword')

	const router = useRouter()
	const params = useParams<{ token: string }>()

	const form = useForm<TypeNewPasswordSchema>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
			passwordConfirmation: ''
		}
	})

	const [newPassword, { loading: isLoadingNew }] = useNewPasswordMutation({
		onCompleted() {
			toast.success(t('successMessage'))
			router.push('/account/login')
		},
		onError(error) {
			toast.error(t(error.message))
		}
	})

	const { isValid } = form.formState

	function onSubmit(data: TypeNewPasswordSchema) {
		newPassword({ variables: { data: { ...data, token: params.token } } })
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref="/account/login"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-y-3">
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('passwordLabel')}</FormLabel>
								<FormControl>
									<Input
										placeholder="••••••••"
										type="password"
										disabled={isLoadingNew}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="passwordConfirmation"
						render={({ field }) => (
							<FormItem>
								<FormLabel>{t('passwordRepeatLabel')}</FormLabel>
								<FormControl>
									<Input
										placeholder="••••••••"
										type="password"
										disabled={isLoadingNew}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="mt-2 w-full" disabled={!isValid || isLoadingNew}>
						{t('submitButton')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
