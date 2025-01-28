import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { AcceptInvitationForm } from '@/components/features/project/settings/members/AcceptInvitationForm'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Join Project',
	...NO_INDEX_PAGE
}

export default async function Page(props: {
	searchParams: Promise<{ token: string }>
}) {
	const searchParams = await props.searchParams
	if (!searchParams.token) redirect('/')

	return <AcceptInvitationForm token={searchParams.token} />
}
