'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { format } from 'date-fns'
import { FileText } from 'lucide-react'

import { Heading } from '@/components/common/Heading'
import { DataTableColumnHeader } from '@/components/common/table/ColumnHeader'
import { DataTableViewOptions } from '@/components/common/table/ColumnToggle'
import { Input } from '@/components/ui/Input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/Table'
import {
	useFindDocumentsByProjectQuery,
	type FindDocumentsByProjectQuery
} from '@/graphql/generated/output'

type Document = FindDocumentsByProjectQuery['findDocumentsByProject'][0]

const columns: ColumnDef<Document>[] = [
	{
		accessorKey: 'title',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Название" />
		),
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<FileText className="h-4 w-4 text-muted-foreground" />
				<span>{row.original.title}</span>
			</div>
		)
	},

	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Дата создания" />
		),
		cell: ({ row }) => (
			<div className="text-muted-foreground">
				{format(new Date(row.original.createdAt), 'dd.MM.yyyy')}
			</div>
		)
	},
	{
		accessorKey: 'updatedAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Последнее обновление" />
		),
		cell: ({ row }) => (
			<div className="text-muted-foreground">
				{format(new Date(row.original.updatedAt), 'dd.MM.yyyy')}
			</div>
		)
	}
	// {
	// 	id: 'actions',
	// 	enableHiding: false,
	// 	cell: ({ row }) => <RowActions document={row.original} />
	// }
]

export function DocumentsPage() {
	const router = useRouter()
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const { data } = useFindDocumentsByProjectQuery()

	const table = useReactTable({
		data: data?.findDocumentsByProject || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			sorting,
			columnFilters
		},
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel()
	})

	return (
		<div className="w-full p-4">
			<div className="mb-4 flex items-center">
				<Heading title="Documents" description="List of documents" size="xl" />
			</div>
			<div className="flex flex-wrap items-center justify-between py-4">
				<Input
					placeholder="Search"
					value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
					onChange={e =>
						table.getColumn('title')?.setFilterValue(e.target.value)
					}
					className="h-8 w-[150px] lg:w-[250px]"
				/>
				<DataTableViewOptions table={table} title="View" />
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<TableHead key={header.id}>
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
								>
									{row.getVisibleCells().map(cell => (
										<TableCell
											key={cell.id}
											onClick={() =>
												router.push(
													`/projects/${row.original.projectId}/docs/${row.original.id}/`
												)
											}
											className="cursor-pointer"
										>
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
									className="h-24 text-center"
								>
									Documents not found
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
