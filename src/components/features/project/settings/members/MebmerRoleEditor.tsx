'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/Badge'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/Select'
import {
	Role,
	useChangeMemberRoleMutation,
	useFindProjectByIdQuery,
	type FindProjectByIdQuery
} from '@/graphql/generated/output'
import { useCurrentUser } from '@/hooks/use-current-user'
import { cn } from '@/lib/utils'

interface IMemberRoleEditor {
	member: NonNullable<
		FindProjectByIdQuery['findProjectById']
	>['members'][number]
	disabled?: boolean
}

export function MebmerRoleEditor({ member, disabled }: IMemberRoleEditor) {
	const [isUpdating, setIsUpdating] = useState(false)

	const { profile } = useCurrentUser()

	const [updateRole] = useChangeMemberRoleMutation({
		onCompleted: () => {
			toast.success('Role updated successfully', {
				description: `Role for ${member.user.displayName} was updated to ${member.role}`
			})
			setIsUpdating(false)
		},
		onError: error => {
			toast.error('Failed to update role', { description: error.message })
			setIsUpdating(false)
		}
	})

	const { data } = useFindProjectByIdQuery()
	const currentUserRole = data?.findProjectById?.members.find(
		m => m.userId === profile?.id
	)?.role

	const isCurrentUser = member.userId === profile?.id
	const isAdmin = currentUserRole === Role.Admin
	const canEdit = !isCurrentUser && isAdmin

	const handleRoleChange = async (newRole: Role) => {
		if (isCurrentUser || isUpdating) return

		setIsUpdating(true)
		await updateRole({
			variables: {
				data: {
					userId: member.userId,
					role: newRole
				}
			}
		})
	}

	if (!canEdit) {
		return (
			<Badge
				variant="outline"
				className={cn(
					'capitalize',
					member.role === Role.Admin && 'bg-blue-500/10 text-blue-500',
					member.role === Role.Member && 'bg-purple-500/10 text-purple-500',
					member.role === Role.Viewer && 'bg-green-500/10 text-green-500'
				)}
			>
				{member.role.toLowerCase()}
			</Badge>
		)
	}

	return (
		<Select
			defaultValue={member.role}
			onValueChange={value => handleRoleChange(value as Role)}
			disabled={isUpdating}
		>
			<SelectTrigger className="w-[140px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={Role.Admin}>Admin</SelectItem>
				<SelectItem value={Role.Member}>Member</SelectItem>
				<SelectItem value={Role.Viewer}>Viewer</SelectItem>
			</SelectContent>
		</Select>
	)
}
