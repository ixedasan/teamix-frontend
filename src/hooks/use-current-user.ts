import { useEffect } from 'react'

import {
	useClearSessionCookieMutation,
	useFindProfileQuery
} from '@/graphql/generated/output'

export function useCurrentUser() {
	const { data, loading, refetch, error } = useFindProfileQuery()

	const [clear] = useClearSessionCookieMutation()

	useEffect(() => {
		if (error?.graphQLErrors) {
			const isUnauthenticated = error.graphQLErrors.some(
				err => err.extensions?.code === 'UNAUTHENTICATED'
			)
			if (isUnauthenticated) {
				clear()
			}
		}
	}, [clear, error])

	return {
		profile: data?.findProfile,
		loading,
		refetch
	}
}
