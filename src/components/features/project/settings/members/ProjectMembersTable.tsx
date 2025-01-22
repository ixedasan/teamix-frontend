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

import { DataTableColumnHeader } from '@/components/common/table/ColumnHeader'
import { DataTableViewOptions } from '@/components/common/table/ColumnToggle'
import { DataTableFacetedFilter } from '@/components/common/table/Filters'
import { UserAvatar } from '@/components/common/UserAvatar'
import { Alert, AlertDescription } from '@/components/ui/Alert'
import { Badge } from '@/components/ui/Badge'
import { Skeleton } from '@/components/ui/Skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/Table'
import {
	Role,
	useFindProjectByIdQuery,
	type FindProjectByIdQuery
} from '@/graphql/generated/output'
import { cn } from '@/lib/utils'

type Member = NonNullable<
	FindProjectByIdQuery['findProjectById']
>['members'][number]

const columns: ColumnDef<Member>[] = [
	{
		id: 'user',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="User" />
		),
		cell: ({ row }) => {
			const user = row.original.user
			return (
				<div className="flex items-center gap-3">
					<UserAvatar user={user} />
					<div className="flex flex-col">
						<span className="font-medium">{user.displayName}</span>
						<span className="text-sm text-muted-foreground">
							@{user.username}
						</span>
					</div>
				</div>
			)
		}
	},
	{
		accessorKey: 'user.email',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => <div>{row.original.user.email}</div>
	},
	{
		accessorKey: 'role',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
		cell: ({ row }) => (
			<Badge
				variant="outline"
				className={cn(
					'capitalize',
					row.original.role === Role.Admin && 'bg-blue-500/10 text-blue-500',
					row.original.role === Role.Member &&
						'bg-purple-500/10 text-purple-500',
					row.original.role === Role.Viewer && 'bg-green-500/10 text-green-500'
				)}
			>
				{row.original.role.toLowerCase()}
			</Badge>
		)
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Joined" />
		),
		cell: ({ row }) => {
			const date = new Date(row.original.createdAt)
			return (
				<div className="text-muted-foreground">{date.toLocaleDateString()}</div>
			)
		}
	}
]

const LoadingSkeleton = () => (
	<div className="w-full space-y-4">
		{Array.from({ length: 5 }).map((_, i) => (
			<div key={i} className="flex items-center space-x-4">
				<Skeleton className="h-8 w-8 rounded-full" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-[200px]" />
					<Skeleton className="h-4 w-[150px]" />
				</div>
			</div>
		))}
	</div>
)

export function ProjectMembersTable() {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const { data, loading, error } = useFindProjectByIdQuery()

	const members = useMemo(() => data?.findProjectById?.members || [], [data])

	const roleOptions = useMemo(() => {
		const roles = new Set(members.map(member => member.role))
		return Array.from(roles).map(role => ({
			label: role.charAt(0) + role.slice(1).toLowerCase(),
			value: role
		}))
	}, [members])

	const table = useReactTable({
		data: members,
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

	if (loading) {
		return <LoadingSkeleton />
	}

	if (error) {
		return (
			<Alert variant="destructive">
				<AlertDescription>
					Error loading project members: {error.message}
				</AlertDescription>
			</Alert>
		)
	}

	if (!data?.findProjectById) {
		return (
			<Alert>
				<AlertDescription>Project not found</AlertDescription>
			</Alert>
		)
	}

	return (
		<div className="w-full">
			<div className="flex flex-wrap items-center justify-between py-4">
				<div className="flex gap-2">
					{table.getColumn('role') && (
						<DataTableFacetedFilter
							title="Role"
							column={table.getColumn('role')}
							options={roleOptions}
						/>
					)}
				</div>
				<DataTableViewOptions table={table} />
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									)
								})}
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
									className="h-24 text-center"
								>
									No members found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
