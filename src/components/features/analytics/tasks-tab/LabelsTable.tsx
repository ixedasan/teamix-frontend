'use client'

import { useMemo, useState } from 'react'
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table'
import { ListFilter, Search, Tag } from 'lucide-react'

import { DataTableColumnHeader } from '@/components/common/table/ColumnHeader'
import { DataTableViewOptions } from '@/components/common/table/ColumnToggle'
import { Badge } from '@/components/ui/Badge'
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
import { Input } from '@/components/ui/Input'
import { Progress } from '@/components/ui/Progress'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/Table'

type Label = {
	labelName: string
	color: string
	count: number
	percentage: number
}

interface ILabelsTable {
	labelDistribution: {
		distribution: Label[]
	}
}

export function LabelsTable({ labelDistribution }: ILabelsTable) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const columns = useMemo<ColumnDef<Label>[]>(
		() => [
			{
				accessorKey: 'labelName',
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Label name" />
				),
				cell: ({ row }) => (
					<div className="flex items-center space-x-2">
						<div
							className="h-3 w-3 rounded-full"
							style={{ backgroundColor: row.original.color }}
						/>
						<span className="font-medium">{row.original.labelName}</span>
					</div>
				)
			},
			{
				accessorKey: 'color',
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Color" />
				),
				cell: ({ row }) => (
					<Badge
						variant="outline"
						className="font-mono"
						style={{ borderColor: row.original.color }}
					>
						{row.original.color}
					</Badge>
				)
			},
			{
				accessorKey: 'count',
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Number of tasks" />
				),
				cell: ({ row }) => (
					<div className="font-medium">
						{row.original.count}
						<span className="ml-1 text-sm text-muted-foreground">tasks</span>
					</div>
				)
			},
			{
				accessorKey: 'percentage',
				header: ({ column }) => (
					<DataTableColumnHeader column={column} title="Percentage of total" />
				),
				cell: ({ row }) => (
					<div className="flex items-center space-x-4">
						<Progress
							value={row.original.percentage}
							className="h-2 w-32"
							indicatorClassName={`bg-primary`}
						/>
						<span className="text-sm font-medium">
							{row.original.percentage.toFixed(1)}%
						</span>
					</div>
				)
			}
		],
		[]
	)

	const table = useReactTable({
		data: labelDistribution.distribution,
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
						<CardTitle className="flex items-center text-xl">
							<Tag className="mr-2 h-5 w-5 text-primary" />
							Label distribution
						</CardTitle>
						<CardDescription>
							Detailed statistics of tags usage in the project
						</CardDescription>
					</div>
					<div className="flex items-center space-x-2">
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="sm" className="ml-auto h-8">
									<ListFilter className="mr-2 h-4 w-4" />
									Filters
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-48">
								<DropdownMenuItem>By number (desc.)</DropdownMenuItem>
								<DropdownMenuItem>By number (ask.)</DropdownMenuItem>
								<DropdownMenuItem>Alphabetically</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<DataTableViewOptions table={table} title="Columns" />
					</div>
				</div>
			</CardHeader>
			<CardContent className="p-0">
				<div className="border-b bg-muted/5 p-4">
					<div className="flex items-center space-x-2">
						<Search className="h-4 w-4 text-muted-foreground" />
						<Input
							placeholder="Tag Search..."
							value={
								(table.getColumn('labelName')?.getFilterValue() as string) ?? ''
							}
							onChange={event =>
								table.getColumn('labelName')?.setFilterValue(event.target.value)
							}
							className="h-8 w-[250px]"
						/>
					</div>
				</div>

				<div className="rounded-md">
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
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map(row => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && 'selected'}
										className="hover:bg-muted/5"
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
										className="h-32 text-center text-muted-foreground"
									>
										No data to display
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
