import { Bell } from 'lucide-react'

import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/Popover'
import { useFindNotificationsUnreadCountQuery } from '@/graphql/generated/output'
import { NotificationsList } from './NotificationsList'

export function Notifications() {
	const { data, loading: isLoadingCount } =
		useFindNotificationsUnreadCountQuery()
	const count = data?.findNotificationsUnreadCount ?? 0

	const displayCount = count > 10 ? '+9' : count

	if (isLoadingCount) return null

	return (
		<Popover>
			<PopoverTrigger className="mt-2">
				{count !== 0 && (
					<div className="absolute right-1 top-3 rounded-full bg-primary px-[5px] text-xs font-semibold text-white">
						{displayCount}
					</div>
				)}
				<Bell className="size-5 text-foreground" />
			</PopoverTrigger>
			<PopoverContent
				align="end"
				className="max-h-[500px] w-[320px] overflow-y-auto"
			>
				<NotificationsList />
			</PopoverContent>
		</Popover>
	)
}
