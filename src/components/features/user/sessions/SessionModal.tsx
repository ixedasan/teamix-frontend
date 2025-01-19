'use client'

import { PropsWithChildren } from 'react'
import { Map as MapIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Map, Marker } from 'pigeon-maps'

import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/Dialog'
import { FindSessionsByUserQuery } from '@/graphql/generated/output'
import { formatDate } from '@/utils/format-date'

interface ISessionModal {
	session: FindSessionsByUserQuery['findSessionsByUser'][0]
}

export function SessionModal({
	children,
	session
}: PropsWithChildren<ISessionModal>) {
	const t = useTranslations('settings.sessions.sessionModal')

	const center: [number, number] = [
		session.metadata.location.latitude,
		session.metadata.location.longitude
	]

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-xl">
				<DialogTitle className="text-xl">{t('heading')}</DialogTitle>
				<div className="space-y-4">
					<div className="h-48 w-full overflow-hidden rounded-lg border">
						<Map height={192} defaultCenter={center} defaultZoom={13}>
							<Marker width={50} anchor={center} />
						</Map>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div className="space-y-2">
							<div className="flex items-center">
								<MapIcon className="mr-2 h-4 w-4" />
								<span className="font-medium">{t('location')}</span>
							</div>
							<span className="block text-muted-foreground">
								{session.metadata.location.country},{' '}
								{session.metadata.location.city}
							</span>
						</div>
						<div className="space-y-2">
							<div className="flex items-center">
								<span className="font-medium">{t('device')}</span>
							</div>
							<span className="block text-muted-foreground">
								{session.metadata.device.browser}, {session.metadata.device.os}
							</span>
						</div>
						<div className="space-y-2">
							<div className="flex items-center">
								<span className="font-medium">{t('ipAddress')}</span>
							</div>
							<span className="block text-muted-foreground">
								{session.metadata.ip}
							</span>
						</div>
						<div className="space-y-2">
							<div className="flex items-center">
								<span className="font-medium">{t('createdAt')}</span>
							</div>
							<span className="block text-muted-foreground">
								{formatDate(session.createdAt, true)}
							</span>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
