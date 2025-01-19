'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import Loader from '@/components/common/Loader'
import { useVerifyAccauntMutation } from '@/graphql/generated/output'
import { AuthWrapper } from '../AuthWrapper'

export function VerifyAccountForm() {
	const t = useTranslations('auth.verify')
	const router = useRouter()
	const searchParams = useSearchParams()

	const token = searchParams.get('token') ?? ''

	const [verify] = useVerifyAccauntMutation({
		onCompleted() {
			toast.success(t('successMessage'))
			router.push('/dashboard/settings')
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	useEffect(() => {
		verify({
			variables: {
				data: { token }
			}
		})
	}, [token])

	return (
		<AuthWrapper heading={t('heading')}>
			<div className="flex justify-center">
				<Loader size={38} />
			</div>
		</AuthWrapper>
	)
}
