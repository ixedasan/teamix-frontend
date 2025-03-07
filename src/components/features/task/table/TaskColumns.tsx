import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/common/table/ColumnHeader'
import { AssigneeSelector } from '@/components/common/task/AssignmentSelector'
import { DateSelector } from '@/components/common/task/DateSelector'
import { LabelSelector } from '@/components/common/task/LabelSelector'
import { PrioritySelector } from '@/components/common/task/PriorytySelector'
import { StatusSelector } from '@/components/common/task/StatusSelector'
import { TaskFragment, TaskStatus } from '@/graphql/generated/output'

export const createTaskColumns = (
	handleStatusChange: (taskId: string, newStatus: TaskStatus) => Promise<void>,
	handleUpdateChange: (
		taskId: string,
		field: string,
		value: any
	) => Promise<void>,
	openTaskSheet: (taskId: string) => void
): ColumnDef<TaskFragment>[] => [
	{
		accessorKey: 'title',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Title" />
		),
		cell: ({ row }) => (
			<div
				className="w-56 cursor-pointer truncate font-medium"
				onClick={() => openTaskSheet(row.original.id)}
				title={row.original.title}
			>
				{row.original.title}
			</div>
		)
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Status" />
		),
		filterFn: (row, id, value) => value.includes(row.getValue(id)),
		cell: ({ row }) => (
			<StatusSelector
				value={row.original.status}
				onChange={status => handleStatusChange(row.original.id, status)}
			/>
		)
	},
	{
		accessorKey: 'priority',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Priority" />
		),
		filterFn: (row, id, value) => value.includes(row.getValue(id)),
		cell: ({ row }) => (
			<PrioritySelector
				value={row.original.priority}
				onChange={priority =>
					handleUpdateChange(row.original.id, 'priority', priority)
				}
			/>
		)
	},
	{
		accessorKey: 'startDate',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Start Date" />
		),
		cell: ({ row }) => (
			<DateSelector
				value={row.original.startDate}
				onChange={date =>
					handleUpdateChange(row.original.id, 'startDate', date)
				}
				tooltipContent="Start date"
			/>
		)
	},
	{
		accessorKey: 'dueDate',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Due Date" />
		),
		cell: ({ row }) => (
			<DateSelector
				value={row.original.dueDate}
				onChange={date => handleUpdateChange(row.original.id, 'dueDate', date)}
				tooltipContent="Due date"
			/>
		)
	},
	{
		accessorKey: 'assignees',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Assignees" />
		),
		cell: ({ row }) => (
			<AssigneeSelector
				taskId={row.original.id}
				currentAssignees={row.original.assignees}
			/>
		)
	},
	{
		accessorKey: 'labels',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Labels" />
		),
		cell: ({ row }) => (
			<LabelSelector
				taskId={row.original.id}
				currentLabels={row.original.labels}
			/>
		)
	}
]
