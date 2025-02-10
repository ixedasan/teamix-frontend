'use client'

import { useState } from 'react'
import { Check, ChevronDown, User, UserPlus } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
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
import {
	TaskFragment,
	useAssingTaskMutation,
	useFindProjectByIdQuery,
	useUnassignTaskMutation
} from '@/graphql/generated/output'
import { cn } from '@/lib/utils'

interface AssigneeSelectorProps {
	taskId: string
	currentAssignees: TaskFragment['assignees']
	disabled?: boolean
	triggerVariant?: 'default' | 'compact' | 'icon-only'
	className?: string
	showTooltip?: boolean
}

export function AssigneeSelector({
	taskId,
	currentAssignees,
	disabled = false,
	triggerVariant = 'default',
	className,
	showTooltip = true
}: AssigneeSelectorProps) {
	const [open, setOpen] = useState(false)

	const { data } = useFindProjectByIdQuery()
	const projectMembers = data?.findProjectById.members || []

	const [assignTask] = useAssingTaskMutation()
	const [unassignTask] = useUnassignTaskMutation()

	const handleAssignmentChange = async (userId: string) => {
		const isAssigned = currentAssignees.some(a => a.userId === userId)

		if (isAssigned) {
			await unassignTask({ variables: { taskId, userId } })
		} else {
			await assignTask({ variables: { taskId, userId } })
		}
	}

	const getAssigneeDisplay = (assignee: TaskFragment['assignees'][0]) => {
		return assignee.user.displayName || assignee.user.username
	}

	const renderTriggerContent = () => {
		const hasAssignees = currentAssignees?.length > 0
		const maxAvatars = triggerVariant === 'compact' ? 2 : 3
		const visibleAssignees = currentAssignees?.slice(0, maxAvatars)
		const remainingCount = currentAssignees?.length - maxAvatars

		const avatarGroup = (size: number) => (
			<div className="flex -space-x-2">
				{visibleAssignees.map(assignee => (
					<Avatar
						key={assignee.userId}
						className={`h-${size} w-${size} border-2 border-background`}
					>
						<AvatarImage src={assignee.user.avatar || undefined} />
						<AvatarFallback>
							{assignee.user.displayName?.[0] || assignee.user.username[0]}
						</AvatarFallback>
					</Avatar>
				))}
				{remainingCount > 0 && (
					<div
						className={`flex h-${size} w-${size} items-center justify-center rounded-full border-2 border-background bg-muted`}
					>
						<span className="text-xs">+{remainingCount}</span>
					</div>
				)}
			</div>
		)

		if (triggerVariant === 'icon-only') {
			return hasAssignees ? avatarGroup(6) : <UserPlus className="h-4 w-4" />
		}

		if (triggerVariant === 'compact') {
			return (
				<div className="flex items-center gap-1.5">
					{hasAssignees ? avatarGroup(5) : <User className="h-4 w-4" />}
					<span className="text-xs">
						{hasAssignees
							? currentAssignees?.length === 1
								? getAssigneeDisplay(currentAssignees[0])
								: `${currentAssignees?.length} assigned`
							: 'Assign'}
					</span>
					<ChevronDown className="h-3 w-3 opacity-50" />
				</div>
			)
		}

		// Default variant
		return (
			<div className="flex w-full items-center justify-between">
				<div className="flex items-center gap-2">
					{hasAssignees ? avatarGroup(6) : <UserPlus className="h-4 w-4" />}
					<span className="truncate">
						{hasAssignees
							? currentAssignees.length <= 3
								? currentAssignees.map(getAssigneeDisplay).join(', ')
								: `${currentAssignees.slice(0, 3).map(getAssigneeDisplay).join(', ')} +${
										currentAssignees.length - 3
									}`
							: 'Assign'}
					</span>
				</div>
				<ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
			</div>
		)
	}

	const trigger = (
		<Button
			variant="outline"
			role="combobox"
			aria-expanded={open}
			className={cn(
				'justify-between',
				triggerVariant === 'icon-only' && 'h-8 w-8 rounded-full p-0',
				triggerVariant === 'compact' && 'h-8 px-2',
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
						<p>
							{currentAssignees?.length > 0
								? currentAssignees.map(getAssigneeDisplay).join(', ')
								: 'No assignees'}
						</p>
					</TooltipContent>
				</Tooltip>
			) : (
				<PopoverTrigger asChild>{trigger}</PopoverTrigger>
			)}
			<PopoverContent align="start" className="w-64 p-0">
				<Command>
					<CommandInput placeholder="Search members..." />
					<CommandEmpty>No members found.</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{projectMembers.map(member => {
								const isAssigned = currentAssignees?.some(
									a => a.userId === member.userId
								)

								return (
									<CommandItem
										key={member.userId}
										value={member.userId}
										onSelect={() => handleAssignmentChange(member.userId)}
										className="aria-selected:bg-accent aria-selected:text-accent-foreground"
									>
										<div className="flex items-center gap-2">
											<Avatar className="h-6 w-6">
												<AvatarImage src={member.user.avatar || undefined} />
												<AvatarFallback>
													{member.user.displayName?.[0] ||
														member.user.username[0]}
												</AvatarFallback>
											</Avatar>
											<span>
												{member.user.displayName || member.user.username}
											</span>
										</div>
										<Check
											className={cn(
												'ml-auto h-4 w-4',
												isAssigned ? 'opacity-100' : 'opacity-0'
											)}
										/>
									</CommandItem>
								)
							})}
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
