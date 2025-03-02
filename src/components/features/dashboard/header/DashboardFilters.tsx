'use client'

import type React from 'react'
import { useCallback, useMemo, useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, Check, Filter, X } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Calendar } from '@/components/ui/Calendar'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/Command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/Popover'
import { Separator } from '@/components/ui/Separator'
import { Priority, TaskStatus } from '@/graphql/generated/output'
import type { FilterProps, FilterState, Project } from '../types/filters.types'
import { cn } from '@/lib/utils'

export function DashboardFilters({
	projects,
	onFilterChange,
	initialFilters
}: FilterProps) {
	const [filters, setFilters] = useState<FilterState>({
		status: initialFilters?.status || [],
		priority: initialFilters?.priority || [],
		projects: initialFilters?.projects || [],
		search: initialFilters?.search || '',
		dateRange: initialFilters?.dateRange || { from: undefined, to: undefined },
		assignee: initialFilters?.assignee || [],
		labels: initialFilters?.labels || []
	})

	const [dateOpen, setDateOpen] = useState(false)

	const statusOptions = useMemo(() => Object.values(TaskStatus), [])
	const priorityOptions = useMemo(() => Object.values(Priority), [])

	const handleFilterChange = useCallback(
		(updates: Partial<FilterState>) => {
			const newFilters = { ...filters, ...updates }
			setFilters(newFilters)
			onFilterChange(newFilters)
		},
		[filters, onFilterChange]
	)

	const toggleFilter = useCallback(
		<T extends keyof FilterState>(
			key: T,
			value: FilterState[T] extends Array<infer U> ? U : never
		) => {
			const currentValues = filters[key] as any[]
			const newValues = currentValues.includes(value)
				? currentValues.filter(v => v !== value)
				: [...currentValues, value]

			handleFilterChange({ [key]: newValues } as Partial<FilterState>)
		},
		[filters, handleFilterChange]
	)

	const clearFilters = useCallback(() => {
		const emptyFilters: FilterState = {
			status: [],
			priority: [],
			projects: [],
			search: '',
			dateRange: { from: undefined, to: undefined },
			assignee: [],
			labels: []
		}
		setFilters(emptyFilters)
		onFilterChange(emptyFilters)
	}, [onFilterChange])

	const activeFilterCount = useMemo(() => {
		return (
			filters.status.length +
			filters.priority.length +
			filters.projects.length +
			filters.assignee.length +
			filters.labels.length +
			(filters.search ? 1 : 0) +
			(filters.dateRange.from || filters.dateRange.to ? 1 : 0)
		)
	}, [filters])

	const handleRemoveFilter = useCallback(
		(key: keyof FilterState, value?: any) => {
			if (key === 'dateRange') {
				handleFilterChange({
					dateRange: { from: undefined, to: undefined }
				})
			} else if (value !== undefined) {
				const currentValues = filters[key] as any[]
				handleFilterChange({
					[key]: currentValues.filter(v => v !== value)
				} as Partial<FilterState>)
			}
		},
		[handleFilterChange]
	)

	return (
		<div className="space-y-4">
			<div className="flex flex-wrap items-center gap-2">
				<FilterPopover
					trigger="Status"
					items={statusOptions}
					selectedItems={filters.status}
					onItemClick={status => toggleFilter('status', status)}
					renderItem={status => <StatusBadge status={status as TaskStatus} />}
				/>

				<FilterPopover
					trigger="Priority"
					items={priorityOptions}
					selectedItems={filters.priority}
					onItemClick={priority => toggleFilter('priority', priority)}
					renderItem={priority => (
						<PriorityBadge priority={priority as Priority} />
					)}
				/>

				<FilterPopover
					trigger="Projects"
					items={projects}
					selectedItems={filters.projects}
					onItemClick={project => toggleFilter('projects', project.id)}
					renderItem={project => <ProjectItem project={project} />}
					getItemId={project => project.id}
				/>

				<Popover open={dateOpen} onOpenChange={setDateOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className={cn(
								'justify-start text-left font-normal',
								(filters.dateRange.from || filters.dateRange.to) &&
									'text-primary'
							)}
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							{filters.dateRange.from ? (
								filters.dateRange.to ? (
									<>
										{format(filters.dateRange.from, 'LLL dd, y')} -{' '}
										{format(filters.dateRange.to, 'LLL dd, y')}
									</>
								) : (
									format(filters.dateRange.from, 'LLL dd, y')
								)
							) : (
								'Date range'
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-auto p-0" align="start">
						<Calendar
							initialFocus
							mode="range"
							defaultMonth={filters.dateRange.from}
							selected={{
								from: filters.dateRange.from,
								to: filters.dateRange.to
							}}
							onSelect={range =>
								handleFilterChange({
									dateRange: range || { from: undefined, to: undefined }
								})
							}
							numberOfMonths={2}
						/>
					</PopoverContent>
				</Popover>

				{activeFilterCount > 0 && (
					<Button
						variant="ghost"
						size="sm"
						onClick={clearFilters}
						className="gap-1"
					>
						<X className="h-4 w-4" />
						Clear filters ({activeFilterCount})
					</Button>
				)}
			</div>

			{activeFilterCount > 0 && (
				<div className="flex flex-wrap gap-2">
					{filters.status.map(status => (
						<FilterChip
							key={status}
							label={status}
							onRemove={() => handleRemoveFilter('status', status)}
						>
							<StatusBadge status={status} />
						</FilterChip>
					))}
					{filters.priority.map(priority => (
						<FilterChip
							key={priority}
							label={priority}
							onRemove={() => handleRemoveFilter('priority', priority)}
						>
							<PriorityBadge priority={priority} />
						</FilterChip>
					))}
					{filters.projects.map(projectId => {
						const project = projects.find(p => p.id === projectId)
						if (!project) return null
						return (
							<FilterChip
								key={projectId}
								label={project.name}
								onRemove={() => handleRemoveFilter('projects', projectId)}
							>
								<ProjectItem project={project} />
							</FilterChip>
						)
					})}
					{(filters.dateRange.from || filters.dateRange.to) && (
						<FilterChip
							label="Date range"
							onRemove={() => handleRemoveFilter('dateRange')}
						>
							<CalendarIcon className="mr-1 h-4 w-4" />
							{filters.dateRange.from
								? filters.dateRange.to
									? `${format(filters.dateRange.from, 'LLL dd')} - ${format(filters.dateRange.to, 'LLL dd')}`
									: format(filters.dateRange.from, 'LLL dd')
								: 'Date range'}
						</FilterChip>
					)}
				</div>
			)}
		</div>
	)
}

interface FilterPopoverProps<T> {
	trigger: string
	items: T[]
	selectedItems: T[]
	onItemClick: (item: T) => void
	renderItem: (item: T) => React.ReactNode
	getItemId?: (item: T) => string
}

function FilterPopover<T>({
	trigger,
	items,
	selectedItems,
	onItemClick,
	renderItem,
	getItemId = item => item as string
}: FilterPopoverProps<T>) {
	const [open, setOpen] = useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" className="gap-1">
					<Filter className="h-4 w-4" />
					{trigger}
					{selectedItems.length > 0 && (
						<Badge variant="secondary" className="ml-1 px-1 py-0">
							{selectedItems.length}
						</Badge>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandInput placeholder={`Search ${trigger.toLowerCase()}...`} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{items.map(item => (
								<CommandItem
									key={getItemId(item)}
									onSelect={() => {
										onItemClick(item)
										setOpen(false)
									}}
								>
									<div
										className={cn(
											'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
											selectedItems.includes(item)
												? 'bg-primary text-primary-foreground'
												: 'opacity-50 [&_svg]:invisible'
										)}
									>
										<Check className={cn('h-4 w-4')} />
									</div>
									{renderItem(item)}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

interface FilterChipProps {
	label: string
	onRemove: () => void
	children: React.ReactNode
}

function FilterChip({ label, onRemove, children }: FilterChipProps) {
	return (
		<Badge
			variant="secondary"
			className="flex items-center gap-1 pr-1"
			key={label}
		>
			{children}
			<Separator orientation="vertical" className="mx-1 h-4" />
			<Button
				variant="ghost"
				size="icon"
				className="h-4 w-4 p-0 hover:bg-transparent"
				onClick={onRemove}
			>
				<X className="h-3 w-3" />
				<span className="sr-only">Remove {label} filter</span>
			</Button>
		</Badge>
	)
}

function StatusBadge({ status }: { status: TaskStatus }) {
	const getStatusColor = (status: TaskStatus) => {
		switch (status) {
			case TaskStatus.Backlog:
				return 'bg-slate-100 text-slate-800'
			case TaskStatus.Todo:
				return 'bg-blue-100 text-blue-800'
			case TaskStatus.InProgress:
				return 'bg-purple-100 text-purple-800'
			case TaskStatus.Done:
				return 'bg-green-100 text-green-800'
			case TaskStatus.Cancelled:
				return 'bg-red-100 text-red-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	const getStatusLabel = (status: TaskStatus) => {
		switch (status) {
			case TaskStatus.InProgress:
				return 'In Progress'
			default:
				return status.charAt(0) + status.slice(1).toLowerCase()
		}
	}

	return (
		<span
			className={cn(
				'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
				getStatusColor(status)
			)}
		>
			{getStatusLabel(status)}
		</span>
	)
}

function PriorityBadge({ priority }: { priority: Priority }) {
	const getPriorityColor = (priority: Priority) => {
		switch (priority) {
			case Priority.None:
				return 'bg-slate-100 text-slate-800'
			case Priority.Low:
				return 'bg-green-100 text-green-800'
			case Priority.Medium:
				return 'bg-yellow-100 text-yellow-800'
			case Priority.High:
				return 'bg-orange-100 text-orange-800'
			case Priority.Urgent:
				return 'bg-red-100 text-red-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	return (
		<span
			className={cn(
				'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
				getPriorityColor(priority)
			)}
		>
			{priority.charAt(0) + priority.slice(1).toLowerCase()}
		</span>
	)
}

function ProjectItem({ project }: { project: Project }) {
	return (
		<div className="flex items-center gap-2">
			{project.icon && <span className="text-lg">{project.icon}</span>}
			<span>{project.name}</span>
		</div>
	)
}
