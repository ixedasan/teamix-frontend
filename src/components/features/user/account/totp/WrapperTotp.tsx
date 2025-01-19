'use client'

import { useTranslations } from 'next-intl'

import { CardContainer } from '@/components/common/CardContainer'
import { SkeletonWrapper } from '@/components/common/SkeletonWrapper'
import { useFindProfileQuery } from '@/graphql/generated/output'
import { DisableTotp } from './DisableTotp'
import { EnableTotp } from './EnableTotp'

export function WrapperTotp() {
	const t = useTranslations('settings.account.twoFactor')

	const { data, loading } = useFindProfileQuery()
	const user = data?.findProfile

	return (
		<SkeletonWrapper isLoading={loading}>
			<CardContainer
				heading={t('heading')}
				description={t('description')}
				rightContent={
					<div className="flex items-center gap-4">
						{!user?.isTotpEnabled ? <EnableTotp /> : <DisableTotp />}
					</div>
				}
			/>
		</SkeletonWrapper>
	)
}
