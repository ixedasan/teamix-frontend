'use client'

import { useMemo, useState } from 'react'
import {
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table'
import { download, generateCsv, mkConfig } from 'export-to-csv'
import { DownloadIcon, Users } from 'lucide-react'
import { toast } from 'sonner'

import { DataTableViewOptions } from '@/components/common/table/ColumnToggle'
import { DataTableFacetedFilter } from '@/components/common/table/Filters'
import { Button } from '@/components/ui/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
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
	type FindProjectAnalyticsQuery
} from '@/graphql/generated/output'
import { getRelativeTime, getRoleLabel } from '@/utils/format-analytics'
import { getTeamTableColumns } from './tableColumns'

export type Member =
	FindProjectAnalyticsQuery['projectAnalytics']['memberProductivity'][0]

interface ITeamTable {
	memberProductivity: FindProjectAnalyticsQuery['projectAnalytics']['memberProductivity']
}

const csvConfig = mkConfig({
	fieldSeparator: ',',
	decimalSeparator: '.',
	useKeysAsHeaders: true
})

export function TeamTable({ memberProductivity }: ITeamTable) {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const columns = useMemo(() => getTeamTableColumns(), [])

	const table = useReactTable({
		data: memberProductivity,
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

	const handleExportCSV = (data: Member[]) => {
		if (!data.length) {
			return toast.error('No data to export')
		}

		const csvData = data.map(member => ({
			displayName: member.displayName,
			username: member.username,
			role: getRoleLabel(member.role),
			assignedTasks: member.assignedTasks,
			completedTasks: member.completedTasks,
			completionRate: `${member.completionRate}%`,
			commentsCount: member.commentsCount,
			urgentTasks: member.urgentTasks,
			lastActive: member.lastActive
				? getRelativeTime(member.lastActive.toString())
				: '—'
		}))

		const csv = generateCsv(csvConfig)(csvData)
		download(csvConfig)(csv)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center">
					<Users className="mr-2 h-5 w-5 text-muted-foreground" />
					Team productivity
				</CardTitle>
				<CardDescription>
					Productivity statistics of the project participants
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex flex-wrap items-center justify-between py-4">
					<div className="flex gap-2">
						{table.getColumn('role') && (
							<DataTableFacetedFilter
								title="Роль"
								column={table.getColumn('role')}
								options={[
									{ label: 'Admin', value: Role.Admin },
									{ label: 'Member', value: Role.Member },
									{ label: 'Viewer', value: Role.Viewer }
								]}
							/>
						)}
					</div>
					<div className="flex flex-wrap gap-2">
						<Button
							variant="outline"
							size="sm"
							className="ml-auto h-8 lg:flex"
							onClick={() => {
								const data = table.getRowModel().rows.map(row => row.original)
								handleExportCSV(data)
							}}
						>
							<DownloadIcon className="mr-2 h-4 w-4" />
							CSV export
						</Button>
						<DataTableViewOptions table={table} title="View" />
					</div>
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
										No data.
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
