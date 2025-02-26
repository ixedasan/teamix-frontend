import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/common/table/ColumnHeader'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import {
	getInitials,
	getRelativeTime,
	getRoleBadgeColor,
	getRoleLabel
} from '@/utils/format-analytics'
import { getMediaSource } from '@/utils/get-media-source'
import { Member } from './TeamTable'
import { cn } from '@/lib/utils'

export const getTeamTableColumns = (): ColumnDef<Member>[] => [
	{
		accessorKey: 'displayName',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Member" />
		),
		cell: ({ row }) => {
			const member = row.original
			return (
				<div className="flex items-center space-x-3">
					<Avatar className="h-8 w-8">
						{member.avatar ? (
							<AvatarImage
								src={getMediaSource(member.avatar)}
								alt={member.displayName}
							/>
						) : null}
						<AvatarFallback>{getInitials(member.displayName)}</AvatarFallback>
					</Avatar>
					<div>
						<div className="font-medium">{member.displayName}</div>
						<div className="text-xs text-gray-500">@{member.username}</div>
					</div>
				</div>
			)
		}
	},
	{
		accessorKey: 'role',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
		cell: ({ row }) => {
			const role = row.original.role
			return (
				<div className="flex items-start">
					<span
						className={`rounded-full px-2 py-1 text-xs ${getRoleBadgeColor(role)}`}
					>
						{getRoleLabel(role)}
					</span>
				</div>
			)
		}
	},
	{
		accessorKey: 'assignedTasks',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Tasks" />
		),
		cell: ({ row }) => (
			<div className="text-left">{row.original.assignedTasks}</div>
		)
	},
	{
		accessorKey: 'completedTasks',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Completed" />
		),
		cell: ({ row }) => (
			<div className="text-left">{row.original.completedTasks}</div>
		)
	},
	{
		accessorKey: 'completionRate',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="% completion" />
		),
		cell: ({ row }) => {
			const rate = row.original.completionRate
			return (
				<div className="flex flex-col items-start">
					<span className="mb-1">{rate}%</span>
					<Progress
						value={rate}
						className="h-2 w-16 bg-gray-100"
						indicatorClassName={cn(
							rate >= 75 && 'bg-green-500',
							rate >= 50 && rate < 75 && 'bg-amber-500',
							rate < 50 && 'bg-red-500'
						)}
					/>
				</div>
			)
		}
	},
	{
		accessorKey: 'commentsCount',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Comments" />
		),
		cell: ({ row }) => (
			<div className="text-left">{row.original.commentsCount}</div>
		)
	},
	{
		accessorKey: 'urgentTasks',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Urgent tasks" />
		),
		cell: ({ row }) => {
			const urgentTasks = row.original.urgentTasks
			return (
				<div className="text-left">
					{urgentTasks > 0 ? (
						<Badge variant="destructive" className="font-normal">
							{urgentTasks}
						</Badge>
					) : (
						<span>0</span>
					)}
				</div>
			)
		}
	},
	{
		accessorKey: 'lastActive',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Latest activity" />
		),
		cell: ({ row }) => (
			<div className="text-left text-sm text-gray-500">
				{row.original.lastActive
					? getRelativeTime(row.original.lastActive.toString())
					: '—'}
			</div>
		)
	}
]
