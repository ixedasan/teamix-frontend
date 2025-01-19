'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheck, Eye, EyeOff } from 'lucide-react'
import { useTranslations } from 'next-intl'
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
import { useCreateUserMutation } from '@/graphql/generated/output'
import {
	CreateAccountSchema,
	TypeCreateAccountSchema
} from '@/schemas/auth/create-accaunt.schema'
import { AuthWrapper } from '../AuthWrapper'

export function CreateAccountForm() {
	const t = useTranslations('auth.register')

	const [isSuccess, setIsSuccess] = useState(false)

	const form = useForm<TypeCreateAccountSchema>({
		resolver: zodResolver(CreateAccountSchema),
		defaultValues: {
			username: '',
			email: '',
			password: ''
		}
	})

	const [create, { loading: isLoading }] = useCreateUserMutation({
		onCompleted() {
			setIsSuccess(true)
		},
		onError(error) {
			toast.error(error.message)
		}
	})

	const [showPassword, setShowPassword] = useState(false)
	const togglePasswordVisibility = () => {
		setShowPassword(prev => !prev)
	}

	const { isValid } = form.formState

	const onSubmit = (data: TypeCreateAccountSchema) => {
		create({ variables: { data } })
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
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('usernameLabel')}</FormLabel>
									<FormControl>
										<Input
											placeholder="johndoe"
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
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
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>{t('passwordLabel')}</FormLabel>
									<FormControl>
										<div className="relative">
											<Input
												placeholder="••••••••"
												disabled={isLoading}
												type={showPassword ? 'text' : 'password'}
												{...field}
											/>
											<button
												type="button"
												onClick={togglePasswordVisibility}
												className="absolute right-3 top-1/2 -translate-y-1/2"
											>
												{showPassword ? (
													<EyeOff className="h-4 w-4 text-gray-500" />
												) : (
													<Eye className="h-4 w-4 text-gray-500" />
												)}
											</button>
										</div>
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
