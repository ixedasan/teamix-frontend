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
	Priority,
	useUpdateTaskMutation,
	type TaskFragment
} from '@/graphql/generated/output'
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
	task: TaskFragment
}

export function PrioritySelector({ task }: IPrioritySelector) {
	const [open, setOpen] = useState(false)
	const [isUpdating, setIsUpdating] = useState(false)
	const [updateTask] = useUpdateTaskMutation()

	const selectedPriority = priorityMap[task.priority ?? Priority.None]

	const handlePriorityChange = async (newPriority: Priority) => {
		try {
			setIsUpdating(true)
			await updateTask({
				variables: {
					id: task.id,
					data: { priority: newPriority }
				}
			})
		} finally {
			setIsUpdating(false)
			setOpen(false)
		}
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-52 justify-between"
					disabled={isUpdating}
				>
					<div className="flex items-center gap-2">
						{selectedPriority.icon}
						<span className={selectedPriority.color}>
							{selectedPriority.label}
						</span>
					</div>
					<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-52 p-0">
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
											task.priority === priorityKey && 'opacity-100'
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
