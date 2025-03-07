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
import { useTranslations } from 'next-intl'

import { SkeletonWrapper } from '@/components/common/SkeletonWrapper'
import { DataTableColumnHeader } from '@/components/common/table/ColumnHeader'
import { DataTableViewOptions } from '@/components/common/table/ColumnToggle'
import { DataTableFacetedFilter } from '@/components/common/table/Filters'
import { UserAvatar } from '@/components/common/UserAvatar'
import { Alert, AlertDescription } from '@/components/ui/Alert'
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
	useFindProjectByIdQuery,
	type FindProjectByIdQuery
} from '@/graphql/generated/output'
import { DeleteMemberForm } from './DeleteMemberForm'
import { MebmerRoleEditor } from './MebmerRoleEditor'

type Member = NonNullable<
	FindProjectByIdQuery['findProjectById']
>['members'][number]

const columns: (t: any) => ColumnDef<Member>[] = t => [
	{
		id: 'user',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title={t('columns.user')} />
		),
		filterFn: (row, id, filterValue) => {
			const user = row.original.user
			const searchValue = String(filterValue).toLowerCase()
			return (
				user.displayName.toLowerCase().includes(searchValue) ||
				user.username.toLowerCase().includes(searchValue) ||
				user.email.toLowerCase().includes(searchValue)
			)
		},
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
			<DataTableColumnHeader column={column} title={t('columns.email')} />
		),
		cell: ({ row }) => <div>{row.original.user.email}</div>
	},
	{
		accessorKey: 'role',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title={t('columns.role')} />
		),
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
		cell: ({ row }) => {
			return <MebmerRoleEditor member={row.original} />
		}
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title={t('columns.joined')} />
		),
		cell: ({ row }) => {
			const date = new Date(row.original.createdAt)
			return (
				<div className="text-muted-foreground">{date.toLocaleDateString()}</div>
			)
		}
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			return <DeleteMemberForm userId={row.original.userId} />
		}
	}
]

export function ProjectMembersTable() {
	const t = useTranslations('projects.settings.member.table')

	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const { data, loading, error } = useFindProjectByIdQuery()

	const members = useMemo(() => data?.findProjectById?.members || [], [data])
	const memoizedColumns = useMemo(() => columns(t), [t])

	const roleOptions = useMemo(() => {
		const roles = new Set(members.map(member => member.role))
		return Array.from(roles).map(role => ({
			label: role.charAt(0) + role.slice(1).toLowerCase(),
			value: role
		}))
	}, [members])

	const table = useReactTable({
		data: members,
		columns: memoizedColumns,
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

	if (error) {
		return (
			<Alert variant="destructive">
				<AlertDescription>
					Error loading project members: {error.message}
				</AlertDescription>
			</Alert>
		)
	}

	return (
		<SkeletonWrapper isLoading={loading}>
			<div className="w-full">
				<div className="over flex flex-wrap items-center justify-between py-4">
					<div className="flex gap-2">
						<Input
							placeholder={t('search.placeholder')}
							value={
								(table.getColumn('user')?.getFilterValue() as string) ?? ''
							}
							onChange={event =>
								table.getColumn('user')?.setFilterValue(event.target.value)
							}
							className="h-8 w-[150px] lg:w-[250px]"
						/>
						{table.getColumn('role') && (
							<DataTableFacetedFilter
								title={t('filters.role')}
								column={table.getColumn('role')}
								options={roleOptions}
							/>
						)}
					</div>
					<DataTableViewOptions table={table} title={t('filters.view')} />
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
										{t('noMembers')}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</SkeletonWrapper>
	)
}
