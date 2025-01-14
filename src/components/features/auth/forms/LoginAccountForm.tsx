'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, KeyRound } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/InputOtp'
import { useLoginUserMutation } from '@/graphql/generated/output'
import { LoginSchema, TypeLoginSchema } from '@/schemas/auth/login.schema'
import { AuthWrapper } from '../AuthWrapper'

export function LoginAccountForm() {
	const t = useTranslations('auth.login')

	const [showPassword, setShowPassword] = useState(false)
	const [isShowTwoFactor, setIsShowTwoFactor] = useState(false)

	const router = useRouter()

	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			login: '',
			password: ''
		}
	})

	const [login, { loading: isLoading }] = useLoginUserMutation({
		onCompleted(data) {
			if (data.loginUser.message) {
				setIsShowTwoFactor(true)
			} else {
				router.push('/dashboard/settings')
			}
		},
		onError(error) {
			toast.error(error.message)
		}
	})

	const { isValid } = form.formState

	function onSubmit(data: TypeLoginSchema) {
		login({ variables: { data } })
	}

	const togglePasswordVisibility = () => {
		setShowPassword(prev => !prev)
	}

	return (
		<AuthWrapper
			heading={t('heading')}
			backButtonLabel={t('backButtonLabel')}
			backButtonHref="/account/create"
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					{isShowTwoFactor ? (
						<Card className="border-2 border-primary/20">
							<CardContent className="flex flex-col items-center justify-center pt-6">
								<div className="mb-4 flex items-center justify-center space-x-2">
									<KeyRound className="h-5 w-5 text-primary" />
									<span className="text-lg font-medium">
										{t('totpVerification')}
									</span>
								</div>
								<FormField
									control={form.control}
									name="pin"
									render={({ field }) => (
										<FormItem className="w-full max-w-xs">
											<FormControl>
												<div className="flex justify-center">
													<InputOTP maxLength={6} {...field}>
														<InputOTPGroup>
															{Array.from({ length: 6 }).map((_, index) => (
																<InputOTPSlot key={index} index={index} />
															))}
														</InputOTPGroup>
													</InputOTP>
												</div>
											</FormControl>
											<FormDescription className="text-center">
												{t('pinDescription')}
											</FormDescription>
										</FormItem>
									)}
								/>
							</CardContent>
						</Card>
					) : (
						<>
							<FormField
								control={form.control}
								name="login"
								render={({ field }) => (
									<FormItem>
										<FormLabel>{t('loginLabel')}</FormLabel>
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
								name="password"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center justify-between">
											<FormLabel>{t('passwordLabel')}</FormLabel>
											<Link
												href="/account/recovery"
												className="ml-auto inline-block text-sm"
											>
												{t('forgotPassword')}
											</Link>
										</div>
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
						</>
					)}
					<Button className="mt-2 w-full" disabled={!isValid || isLoading}>
						{t('submitButton')}
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
