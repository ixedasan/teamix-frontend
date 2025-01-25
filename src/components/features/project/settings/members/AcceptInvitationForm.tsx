'use client'

import { useEffect } from 'react'

import Loader from '@/components/common/Loader'
import { useAcceptProjectInvitationMutation } from '@/graphql/generated/output'
import { useCurrentUser } from '@/hooks/use-current-user'

interface IAcceptInvitationForm {
	token: string
}

export function AcceptInvitationForm({ token }: IAcceptInvitationForm) {
	const {} = useCurrentUser()

	const [accept] = useAcceptProjectInvitationMutation({})

	useEffect(() => {
		accept({
			variables: {
				token
			}
		})
	}, [accept, token])

	return (
		<div className="flex items-center justify-center">
			<Loader size={32} fullScreen />
		</div>
	)
}
