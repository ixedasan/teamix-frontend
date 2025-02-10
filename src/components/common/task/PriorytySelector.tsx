'use client'

import { useState } from 'react'
import {
	Check,
	ChevronDown,
	Flag,
	SignalHigh,
	SignalLow,
	SignalMedium,
	SquareX
} from 'lucide-react'

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
import { Priority } from '@/graphql/generated/output'
import { cn } from '@/lib/utils'

const priorityMap = {
	[Priority.Urgent]: {
		label: 'Urgent',
		icon: <Flag className="h-3 w-3 text-red-500" />,
		color: 'text-red-500'
	},
	[Priority.High]: {
		label: 'High',
		icon: <SignalHigh className="h-3 w-3 text-orange-500" />,
		color: 'text-orange-500'
	},
	[Priority.Medium]: {
		label: 'Medium',
		icon: <SignalMedium className="h-3 w-3 text-blue-500" />,
		color: 'text-blue-500'
	},
	[Priority.Low]: {
		label: 'Low',
		icon: <SignalLow className="h-3 w-3 text-gray-500" />,
		color: 'text-gray-500'
	},
	[Priority.None]: {
		label: 'None',
		icon: <SquareX className="h-3 w-3 text-muted-foreground" />,
		color: 'text-muted-foreground'
	}
}

interface IPrioritySelector {
	value?: Priority
	disabled?: boolean
	onChange: (priority: Priority) => void
	triggerVariant?: 'default' | 'compact' | 'icon-only'
	className?: string
	showTooltip?: boolean
}

export function PrioritySelector({
	value = Priority.None,
	disabled = false,
	onChange,
	triggerVariant = 'default',
	className,
	showTooltip = true
}: IPrioritySelector) {
	const [open, setOpen] = useState(false)
	const selectedPriority = priorityMap[value]

	const handlePriorityChange = (newPriority: Priority) => {
		onChange(newPriority)
		setOpen(false)
	}

	const renderTriggerContent = () => {
		switch (triggerVariant) {
			case 'compact':
				return (
					<div className="flex items-center gap-1.5">
						{selectedPriority.icon}
						<span className={cn('truncate text-xs', selectedPriority.color)}>
							{selectedPriority.label}
						</span>
						<ChevronDown className="h-3 w-3 shrink-0 opacity-50" />
					</div>
				)
			case 'icon-only':
				return selectedPriority.icon
			default:
				return (
					<div className="flex w-full items-center justify-between">
						<div className="flex items-center gap-2">
							{selectedPriority.icon}
							<span className={selectedPriority.color}>
								{selectedPriority.label}
							</span>
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
				triggerVariant === 'icon-only' && 'size-8 justify-center p-0.5',
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
						<p>Priority: {selectedPriority.label}</p>
					</TooltipContent>
				</Tooltip>
			) : (
				<PopoverTrigger asChild>{trigger}</PopoverTrigger>
			)}
			<PopoverContent align="start" className="w-52 p-0">
				<Command>
					<CommandInput placeholder="Search priority..." />
					<CommandEmpty>No priority found.</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{Object.entries(priorityMap).map(([priorityKey, priority]) => (
								<CommandItem
									key={priorityKey}
									value={priorityKey}
									onSelect={() => handlePriorityChange(priorityKey as Priority)}
									className="aria-selected:bg-accent aria-selected:text-accent-foreground"
								>
									<div className="flex items-center gap-2">
										{priority.icon}
										<span className={priority.color}>{priority.label}</span>
									</div>
									<Check
										className={cn(
											'ml-auto h-4 w-4 opacity-0',
											value === priorityKey && 'opacity-100'
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
