'use client'

import { useCurrentUser } from '@/hooks/use-current-user'
import { CreateProjectDialog } from './CreateProjectDialog'

export function ListHeader() {
	// const t = useTranslations()

	const { profile } = useCurrentUser()

	return (
		<div className="flex w-full items-center justify-between">
			<h2 className="text-2xl font-bold">Hello {profile?.displayName}!</h2>
			<CreateProjectDialog />
		</div>
	)
}
