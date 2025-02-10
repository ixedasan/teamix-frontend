'use client'

import { useCallback, useMemo, useState } from 'react'
import {
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table'

import { DataTableViewOptions } from '@/components/common/table/ColumnToggle'
import { DataTableFacetedFilter } from '@/components/common/table/Filters'
import { Input } from '@/components/ui/Input'
import {
	Priority,
	TaskFragment,
	TaskStatus,
	useChangeTaskStatusMutation,
	useUpdateTaskMutation
} from '@/graphql/generated/output'
import { useTaskSheet } from '@/store/task/task-sheet'
import { createTaskColumns } from './TaskColumns'
import { TaskTableView } from './TaskTableView'

interface ITaskTable {
	tasks: TaskFragment[]
}

export function TaskTable({ tasks }: ITaskTable) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const openTaskSheet = useTaskSheet(state => state.open)

	const [changeStatus] = useChangeTaskStatusMutation()
	const [updateTask] = useUpdateTaskMutation()

	const handleUpdateChange = useCallback(
		async (taskId: string, field: string, value: any) => {
			try {
				const task = tasks.find(t => t.id === taskId)
				if (!task) return

				await updateTask({
					variables: {
						id: taskId,
						data: { [field]: value }
					},
					optimisticResponse: {
						__typename: 'Mutation',
						updateTask: {
							__typename: 'TaskModel',
							...task,
							[field]: value
						}
					}
				})
			} catch (error) {
				console.error(`Error updating ${field}:`, error)
			}
		},
		[tasks, updateTask]
	)

	const handleStatusChange = useCallback(
		async (taskId: string, newStatus: TaskStatus) => {
			try {
				const task = tasks.find(t => t.id === taskId)
				if (!task) return

				await changeStatus({
					variables: {
						data: {
							taskId: taskId,
							status: newStatus,
							position: task.position
						}
					},
					optimisticResponse: {
						__typename: 'Mutation',
						changeTaskStatus: {
							__typename: 'TaskModel',
							id: taskId,
							status: newStatus,
							position: task.position
						}
					}
				})
			} catch (error) {
				console.error('Error changing status:', error)
			}
		},
		[tasks, changeStatus]
	)

	const columns = useMemo(
		() =>
			createTaskColumns(handleStatusChange, handleUpdateChange, openTaskSheet),
		[handleStatusChange, handleUpdateChange, openTaskSheet]
	)

	const table = useReactTable({
		data: tasks,
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: { sorting, columnFilters },
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	})

	const statusOptions = useMemo(
		() =>
			Object.values(TaskStatus).map(status => ({
				label: status,
				value: status
			})),
		[]
	)

	const priorityOptions = useMemo(
		() =>
			Object.values(Priority).map(priority => ({
				label: priority,
				value: priority
			})),
		[]
	)

	return (
		<div className="w-full p-4">
			<div className="flex flex-wrap items-center justify-between py-4">
				<div className="flex gap-2">
					<Input
						placeholder="Search"
						value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
						onChange={e =>
							table.getColumn('title')?.setFilterValue(e.target.value)
						}
						className="h-8 w-[150px] lg:w-[250px]"
					/>
					{table.getColumn('status') && (
						<DataTableFacetedFilter
							title="Status"
							column={table.getColumn('status')}
							options={statusOptions}
						/>
					)}
					{table.getColumn('priority') && (
						<DataTableFacetedFilter
							title="Priority"
							column={table.getColumn('priority')}
							options={priorityOptions}
						/>
					)}
				</div>
				<DataTableViewOptions table={table} title="View" />
			</div>
			<TaskTableView table={table} columns={columns} />
		</div>
	)
}
