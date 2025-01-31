'use client'

import { Badge } from '@/components/ui/Badge'
import { Priority } from '@/graphql/generated/output'
import { cn } from '@/lib/utils'

interface IPriorityBadge {
	priority: Priority
}

const priorityLabels: Record<Priority, string> = {
	[Priority.None]: 'None',
	[Priority.Low]: 'Low',
	[Priority.Medium]: 'Medium',
	[Priority.High]: 'High',
	[Priority.Urgent]: 'Urgent'
}

export function PriorityBadge({ priority }: IPriorityBadge) {
	return (
		<Badge
			variant={priority === Priority.None ? 'outline' : 'default'}
			className={cn({
				'bg-green-500/20 text-green-600': priority === Priority.Low,
				'bg-yellow-500/20 text-yellow-600': priority === Priority.Medium,
				'bg-orange-500/20 text-orange-600': priority === Priority.High,
				'bg-red-500/20 text-red-600': priority === Priority.Urgent
			})}
		>
			{priorityLabels[priority]}
		</Badge>
	)
}
