'use client'

import { useMemo, useState } from 'react'
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState
} from '@tanstack/react-table'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Activity, ListFilter } from 'lucide-react'

import { DataTableViewOptions } from '@/components/common/table/ColumnToggle'
import { Button } from '@/components/ui/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/DropdownMenu'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/Table'
import type { FindProjectAnalyticsQuery } from '@/graphql/generated/output'
import { createActivityColumns } from './table/createActivityColumns'
import { StatCards } from './table/StatCards'

interface IActivitySummary {
	activity: FindProjectAnalyticsQuery['projectAnalytics']['activity']
}

type ActivityData = {
	date: string
	tasksCreated: number
	tasksCompleted: number
	comments: number
	activeUsers: number
}

export function ActivitySummary({ activity }: IActivitySummary) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const data = useMemo(
		() =>
			activity.tasksCreated.slice(0, 7).map((item, index) => ({
				date: format(new Date(item.date), 'MMM d, yyyy', { locale: enUS }),
				tasksCreated: item.count,
				tasksCompleted: activity.tasksCompleted[index]?.count || 0,
				comments: activity.comments[index]?.count || 0,
				activeUsers: activity.activeUsers[index]?.count || 0
			})),
		[activity]
	)

	const columns = useMemo<ColumnDef<ActivityData>[]>(
		() => createActivityColumns(data),
		[data]
	)

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnFilters
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	})

	return (
		<Card className="shadow-sm">
			<CardHeader className="border-b bg-muted/5">
				<div className="flex items-center justify-between">
					<div className="space-y-1">
						<CardTitle className="flex items-center text-lg font-semibold">
							<Activity className="mr-2 h-5 w-5 text-primary" />
							Activity Summary
						</CardTitle>
						<CardDescription className="text-sm text-muted-foreground">
							Total activity in the project for the last 30 days
						</CardDescription>
					</div>
					<div className="flex items-center space-x-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" className="ml-auto h-8">
									<ListFilter className="mr-2 h-4 w-4" />
									Time Range
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48">
								<DropdownMenuItem>Last 7 days</DropdownMenuItem>
								<DropdownMenuItem>Last 14 days</DropdownMenuItem>
								<DropdownMenuItem>Last 30 days</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<DataTableViewOptions table={table} title="Columns" />
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-0">
				<div className="border-b bg-muted/5 p-4">
					<StatCards activity={activity} />
				</div>
				<div className="rounded-lg">
					<Table>
						<TableHeader>
							{table.getHeaderGroups().map(headerGroup => (
								<TableRow key={headerGroup.id} className="hover:bg-muted/5">
									{headerGroup.headers.map(header => (
										<TableHead key={header.id} className="font-medium">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowModel().rows.length ? (
								table.getRowModel().rows.map(row => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
										className="transition-colors hover:bg-muted/5"
									>
										{row.getVisibleCells().map(cell => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={columns.length}
										className="h-24 text-center text-muted-foreground"
									>
										No data available
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
	)
}
