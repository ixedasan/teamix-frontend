'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/common/table/ColumnHeader'
import { ChangeIndicator } from './ChangeIndicator'

export type ActivityData = {
	date: string
	tasksCreated: number
	tasksCompleted: number
	comments: number
	activeUsers: number
}

export function createActivityColumns(
	data: ActivityData[]
): ColumnDef<ActivityData>[] {
	return [
		{
			accessorKey: 'date',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Date" />
			)
		},
		{
			accessorKey: 'tasksCreated',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Created tasks" />
			),
			cell: ({ row }) => {
				const value = row.getValue('tasksCreated') as number
				const prev = data[row.index + 1]?.tasksCreated || value
				return (
					<div className="flex items-center gap-2">
						<span className="font-medium tabular-nums">{value}</span>
						<ChangeIndicator value={value} prev={prev} />
					</div>
				)
			}
		},
		{
			accessorKey: 'tasksCompleted',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Completed tasks" />
			),
			cell: ({ row }) => {
				const value = row.getValue('tasksCompleted') as number
				const prev = data[row.index + 1]?.tasksCompleted || value
				return (
					<div className="flex items-center gap-2">
						<span className="font-medium tabular-nums">{value}</span>
						<ChangeIndicator value={value} prev={prev} />
					</div>
				)
			}
		},
		{
			accessorKey: 'comments',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Comments" />
			),
			cell: ({ row }) => {
				const value = row.getValue('comments') as number
				const prev = data[row.index + 1]?.comments || value
				return (
					<div className="flex items-center gap-2">
						<span className="font-medium tabular-nums">{value}</span>
						<ChangeIndicator value={value} prev={prev} />
					</div>
				)
			}
		},
		{
			accessorKey: 'activeUsers',
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Active participants" />
			),
			cell: ({ row }) => {
				const value = row.getValue('activeUsers') as number
				const prev = data[row.index + 1]?.activeUsers || value
				return (
					<div className="flex items-center gap-2">
						<span className="font-medium tabular-nums">{value}</span>
						<ChangeIndicator value={value} prev={prev} />
					</div>
				)
			}
		}
	]
}
