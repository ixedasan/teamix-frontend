'use client'

import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { ConfirmModal } from '@/components/common/ConfirmModal'
import { Button } from '@/components/ui/Button'
import { useDisableTotpMutation } from '@/graphql/generated/output'
import { useCurrentUser } from '@/hooks/use-current-user'

export function DisableTotp() {
	const t = useTranslations('settings.account.twoFactor.disable')

	const { refetch } = useCurrentUser()

	const [disable, { loading: isLoadingDisable }] = useDisableTotpMutation({
		onCompleted() {
			refetch()
			toast.success(t('successMessage'))
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	return (
		<ConfirmModal
			heading={t('heading')}
			message={t('message')}
			onConfirm={() => disable()}
		>
			<Button variant="secondary" disabled={isLoadingDisable}>
				{t('trigger')}
			</Button>
		</ConfirmModal>
	)
}
