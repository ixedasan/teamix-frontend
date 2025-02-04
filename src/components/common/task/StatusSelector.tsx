'use client'

import { useState } from 'react'
import { Check, ChevronDown, Circle, CircleCheck, CircleX } from 'lucide-react'

import { Button } from '@/components/ui/Button'
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
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/components/ui/Tooltip'
import { TaskStatus } from '@/graphql/generated/output'
import { cn } from '@/lib/utils'

const statusMap = {
	[TaskStatus.Backlog]: {
		label: 'Backlog',
		icon: <Circle className="h-3 w-3 text-muted-foreground" />,
		color: 'bg-gray-500'
	},
	[TaskStatus.Todo]: {
		label: 'To Do',
		icon: <Circle className="h-3 w-3 text-blue-500" />,
		color: 'bg-blue-500'
	},
	[TaskStatus.InProgress]: {
		label: 'In Progress',
		icon: <Circle className="h-3 w-3 text-yellow-500" />,
		color: 'bg-yellow-500'
	},
	[TaskStatus.Done]: {
		label: 'Done',
		icon: <CircleCheck className="h-3 w-3 text-green-500" />,
		color: 'bg-green-500'
	},
	[TaskStatus.Cancelled]: {
		label: 'Cancelled',
		icon: <CircleX className="h-3 w-3 text-red-500" />,
		color: 'bg-red-500'
	}
}

interface IStatusSelector {
	value?: TaskStatus
	disabled?: boolean
	onChange: (status: TaskStatus) => void
	triggerVariant?: 'default' | 'compact' | 'icon-only'
	className?: string
	showTooltip?: boolean
}

export function StatusSelector({
	value = TaskStatus.Backlog,
	disabled = false,
	onChange,
	triggerVariant = 'default',
	className,
	showTooltip = true
}: IStatusSelector) {
	const [open, setOpen] = useState(false)
	const selectedStatus = statusMap[value]

	const handleStatusChange = (newStatus: TaskStatus) => {
		onChange(newStatus)
		setOpen(false)
	}

	const renderTriggerContent = () => {
		switch (triggerVariant) {
			case 'compact':
				return (
					<div className="flex items-center gap-1.5">
						{selectedStatus.icon}
						<span className="truncate text-xs">{selectedStatus.label}</span>
						<ChevronDown className="h-3 w-3 shrink-0 opacity-50" />
					</div>
				)
			case 'icon-only':
				return selectedStatus.icon
			default:
				return (
					<div className="flex w-full items-center justify-between">
						<div className="flex items-center gap-2">
							{selectedStatus.icon}
							<span>{selectedStatus.label}</span>
						</div>

						<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</div>
				)
		}
	}

	const trigger = (
		<Button
			variant="outline"
			role="combobox"
			aria-expanded={open}
			className={cn(
				'justify-between',
				triggerVariant === 'icon-only' && 'h-6 w-6 p-0.5',
				triggerVariant === 'compact' && 'h-7 px-2',
				triggerVariant === 'default' && 'w-full',
				className
			)}
			disabled={disabled}
		>
			{renderTriggerContent()}
		</Button>
	)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			{showTooltip && triggerVariant !== 'default' ? (
				<Tooltip>
					<TooltipTrigger asChild>
						<PopoverTrigger asChild>{trigger}</PopoverTrigger>
					</TooltipTrigger>
					<TooltipContent>
						<p>Status: {selectedStatus.label}</p>
					</TooltipContent>
				</Tooltip>
			) : (
				<PopoverTrigger asChild>{trigger}</PopoverTrigger>
			)}
			<PopoverContent align="start" className="w-52 p-0">
				<Command>
					<CommandInput placeholder="Search status..." />
					<CommandEmpty>No status found.</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{Object.entries(statusMap).map(([statusKey, status]) => (
								<CommandItem
									key={statusKey}
									value={statusKey}
									onSelect={() => handleStatusChange(statusKey as TaskStatus)}
									className="aria-selected:bg-accent aria-selected:text-accent-foreground"
								>
									<div className="flex items-center gap-2">
										{status.icon}
										<span>{status.label}</span>
									</div>
									<Check
										className={cn(
											'ml-auto h-4 w-4',
											value === statusKey ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
