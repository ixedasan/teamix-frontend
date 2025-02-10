import { ColumnDef, flexRender, Table } from '@tanstack/react-table'

import { ScrollArea, ScrollBar } from '@/components/ui/ScrollArea'
import {
	Table as ShadcnTable,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/Table'
import { TaskFragment } from '@/graphql/generated/output'

interface TaskTableViewProps {
	table: Table<TaskFragment>
	columns: ColumnDef<TaskFragment>[]
}

export function TaskTableView({ table, columns }: TaskTableViewProps) {
	return (
		<ScrollArea className="h-[calc(95svh-115px)] w-full overflow-x-auto">
			<div className="min-w-[2000px] rounded-md border">
				<ShadcnTable>
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
									No tasks found.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</ShadcnTable>
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	)
}
