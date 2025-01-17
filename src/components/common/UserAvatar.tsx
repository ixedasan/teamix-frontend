import { cva, type VariantProps } from 'class-variance-authority'

import { FindProfileQuery } from '@/graphql/generated/output'
import { getMediaSource } from '@/utils/get-media-source'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/Avatar'
import { cn } from '@/lib/utils'

const avatarSizes = cva('rounded-lg', {
	variants: {
		size: {
			sm: 'size-7',
			default: 'size-9',
			lg: 'size-14',
			xl: 'size-32'
		}
	},
	defaultVariants: {
		size: 'default'
	}
})

type User = Pick<FindProfileQuery['findProfile'], 'username' | 'avatar'>

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
	user: User
}

export function UserAvatar({ size, user }: UserAvatarProps) {
	const getFallbackSize = () => {
		if (size === 'xl') return 'text-4xl'
		if (size === 'lg') return 'text-2xl'
		return ''
	}

	return (
		<div className="relative">
			<Avatar className={cn(avatarSizes({ size }))}>
				<AvatarImage
					src={getMediaSource(user.avatar)}
					className="object-cover"
					alt={`${user.username}'s avatar`}
				/>
				<AvatarFallback className={getFallbackSize()}>
					{user.username[0].toUpperCase()}
				</AvatarFallback>
			</Avatar>
		</div>
	)
}
