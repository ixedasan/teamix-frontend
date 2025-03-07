'use client'

import { type ComponentType } from 'react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { CardContainer } from '@/components/common/CardContainer'
import { ConfirmModal } from '@/components/common/ConfirmModal'
import { Button } from '@/components/ui/Button'
import {
	FindSessionsByUserQuery,
	useFindSessionsByUserQuery,
	useRemoveSessionMutation
} from '@/graphql/generated/output'
import { getBrowserIcon, IconProps } from '@/utils/get-browser-icon'
import { SessionModal } from './SessionModal'

interface ISessionItem {
	session: FindSessionsByUserQuery['findSessionsByUser'][0]
	isCurrentSession?: boolean
}

export function SessionItem({ session, isCurrentSession }: ISessionItem) {
	const t = useTranslations('settings.sessions.sessionItem')

	const { refetch } = useFindSessionsByUserQuery()

	const [remove, { loading: isLoadingRemove }] = useRemoveSessionMutation({
		onCompleted() {
			refetch()
			toast.success(t('successMessage'))
		},
		onError() {
			toast.error(t('errorMessage'))
		}
	})

	const Icon: ComponentType<IconProps> = getBrowserIcon(
		session.metadata.device.browser
	)

	return (
		<CardContainer
			heading={`${session.metadata.device.browser}, ${session.metadata.device.os}`}
			description={`${session.metadata.location.country}, ${session.metadata.location.city}`}
			Icon={Icon}
			rightContent={
				<div className="flex items-center gap-x-4">
					{!isCurrentSession && (
						<ConfirmModal
							heading={t('confirmModal.heading')}
							message={t('confirmModal.message')}
							onConfirm={() => remove({ variables: { id: session.id } })}
						>
							<Button variant="secondary" disabled={isLoadingRemove}>
								{t('deleteButton')}
							</Button>
						</ConfirmModal>
					)}
					<SessionModal session={session}>
						<Button>{t('detailsButton')}</Button>
					</SessionModal>
				</div>
			}
		/>
	)
}
