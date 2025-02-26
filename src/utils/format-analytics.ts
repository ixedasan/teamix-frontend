import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

import { Role } from '@/graphql/generated/output'

export const getInitials = (name: string) => {
	return name
		.split(' ')
		.map(part => part[0])
		.join('')
		.toUpperCase()
		.substring(0, 2)
}

export const formatDate = (dateString: string | null | undefined) => {
	if (!dateString) return '—'
	return format(new Date(dateString), 'd MMM yyyy', { locale: enUS })
}

export const getRelativeTime = (dateString: string | null | undefined) => {
	if (!dateString) return '—'

	const date = new Date(dateString)
	const now = new Date()
	const diffInDays = Math.floor(
		(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
	)

	if (diffInDays === 0) return 'Today'
	if (diffInDays === 1) return 'Yesterday'
	if (diffInDays < 7) return `${diffInDays} days ago`
	if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
	return `${Math.floor(diffInDays / 30)} months ago`
}

export const getRoleBadgeColor = (role: Role) => {
	switch (role) {
		case Role.Admin:
			return 'bg-blue-500/10 text-blue-500'
		case Role.Member:
			return 'bg-purple-500/10 text-purple-500'
		case Role.Viewer:
			return 'bg-green-500/10 text-green-500'
		default:
			return 'bg-gray-100'
	}
}

export const getRoleLabel = (role: Role) => {
	switch (role) {
		case Role.Admin:
			return 'Admin'
		case Role.Member:
			return 'Member'
		case Role.Viewer:
			return 'Viewer'
		default:
			return '—'
	}
}
