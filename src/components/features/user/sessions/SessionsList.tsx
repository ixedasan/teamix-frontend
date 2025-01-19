'use client'

import { useTranslations } from 'next-intl'

import { Heading } from '@/components/common/Heading'
import { ToggleCardSkeleton } from '@/components/common/ToggleCard'
import {
	useFindCurrentSessionQuery,
	useFindSessionsByUserQuery
} from '@/graphql/generated/output'
import { SessionItem } from './SessionItem'

export function SessionsList() {
	const t = useTranslations('settings.sessions')

	const { data: currentSessionData, loading: isLoadingCurrent } =
		useFindCurrentSessionQuery()

	const { data: sessionsData, loading: isLoadingSessions } =
		useFindSessionsByUserQuery()

	const currentSession = currentSessionData?.findCurrentSession
	const sessions = sessionsData?.findSessionsByUser ?? []

	const otherSessions = sessions.filter(
		session => session.id !== currentSession?.id
	)

	const renderLoadingState = (count: number) => (
		<div className="space-y-4">
			{Array.from({ length: count }).map((_, index) => (
				<ToggleCardSkeleton key={index} />
			))}
		</div>
	)

	const renderCurrentSession = () => (
		<>
			<Heading title={t('info.current')} size="sm" />
			{isLoadingCurrent ? (
				renderLoadingState(1)
			) : currentSession ? (
				<SessionItem session={currentSession} isCurrentSession />
			) : null}
		</>
	)

	const renderOtherSessions = () => (
		<>
			<Heading title={t('info.active')} size="sm" />
			{isLoadingSessions ? (
				renderLoadingState(3)
			) : otherSessions.length ? (
				<div className="space-y-4">
					{otherSessions.map(session => (
						<SessionItem key={session.id} session={session} />
					))}
				</div>
			) : (
				<div className="text-muted-foreground">{t('info.notFound')}</div>
			)}
		</>
	)

	return (
		<div className="space-y-6">
			{renderCurrentSession()}
			{renderOtherSessions()}
		</div>
	)
}
