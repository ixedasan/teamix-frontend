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
	TaskStatus,
	useChangeTaskStatusMutation,
	type TaskFragment
} from '@/graphql/generated/output'
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
	task: TaskFragment
}

export function StatusSelector({ task }: IStatusSelector) {
	const [open, setOpen] = useState(false)
	const [isChanging, setIsChanging] = useState(false)
	const [changeStatus] = useChangeTaskStatusMutation()

	const selectedStatus = statusMap[task.status]

	const handleStatusChange = async (newStatus: TaskStatus) => {
		try {
			setIsChanging(true)
			await changeStatus({
				variables: { data: { taskId: task.id, status: newStatus } },
				optimisticResponse: {
					__typename: 'Mutation',
					changeTaskStatus: {
						...task,
						status: newStatus
					}
				}
			})
		} finally {
			setIsChanging(false)
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
					disabled={isChanging}
				>
					<div className="flex items-center gap-2">
						{selectedStatus.icon}
						<span>{selectedStatus.label}</span>
					</div>
					<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-52 p-0">
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
											task.status === statusKey ? 'opacity-100' : 'opacity-0'
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
