'use client'

import { useState } from 'react'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/Button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/Dialog'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/Form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/InputOtp'
import {
	useEnableTotpMutation,
	useFindProfileQuery,
	useGenerateTotpSecretQuery
} from '@/graphql/generated/output'
import {
	EnableTotpSchema,
	type TypeEnableTotpSchema
} from '@/schemas/user/enable-totp.schema'

export function EnableTotp() {
	const t = useTranslations('settings.account.twoFactor.enable')

	const [isOpen, setIsOpen] = useState(false)

	const { refetch } = useFindProfileQuery()
	const { data, loading } = useGenerateTotpSecretQuery()
	const twoFactorSecret = data?.generateTotpSecret

	const form = useForm<TypeEnableTotpSchema>({
		resolver: zodResolver(EnableTotpSchema),
		defaultValues: {
			pin: ''
		}
	})

	const { isValid } = form.formState

	const [enable, { loading: isLoadingEnable }] = useEnableTotpMutation({
		onCompleted: () => {
			refetch()
			setIsOpen(false)
			toast.success(t('successMessage'))
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const onSubmit = (data: TypeEnableTotpSchema) => {
		enable({
			variables: {
				data: {
					secret: twoFactorSecret?.secret ?? '',
					pin: data.pin
				}
			}
		})
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>{t('trigger')}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>{t('heading')}</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<div className="flex flex-col items-center justify-center gap-4">
							<span className="text-sm text-muted-foreground">
								{twoFactorSecret?.qrCodeUrl ? t('qrInstructions') : ''}
							</span>
							<Image
								src={twoFactorSecret?.qrCodeUrl ?? ''}
								alt="QR"
								width={200}
								height={200}
								className="rounded-lg"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-center text-sm text-muted-foreground">
								{twoFactorSecret?.secret
									? t('secretCodeLabel') + twoFactorSecret.secret
									: ''}
							</span>
						</div>
						<div className="flex items-center justify-center">
							<FormField
								control={form.control}
								name="pin"
								render={({ field }) => (
									<FormItem className="w-full max-w-xs">
										<FormLabel>{t('pinLabel')}</FormLabel>
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
						</div>
						<DialogFooter>
							<Button
								type="submit"
								disabled={!isValid || loading || isLoadingEnable}
							>
								{t('submitButton')}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
