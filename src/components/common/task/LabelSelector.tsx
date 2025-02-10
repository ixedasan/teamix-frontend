'use client'

import { useState } from 'react'
import { Check, ChevronDown, Plus, Tag, Tags } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/Command'
import { Dialog, DialogTrigger } from '@/components/ui/Dialog'
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
	useAddLabelToTaskMutation,
	useFindProjectByIdQuery,
	useRemoveLabelFromTaskMutation,
	type TaskFragment
} from '@/graphql/generated/output'
import { CreateLabelDialog } from './CreateLabelDialog'
import { cn } from '@/lib/utils'

type LabelData = TaskFragment['labels'][0]

interface LabelSelectorProps {
	taskId: string
	currentLabels: LabelData[]
	disabled?: boolean
	triggerVariant?: 'default' | 'compact' | 'icon-only'
	className?: string
	showTooltip?: boolean
}

export function LabelSelector({
	taskId,
	currentLabels,
	disabled = false,
	triggerVariant = 'default',
	className,
	showTooltip = true
}: LabelSelectorProps) {
	const [open, setOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

	const [addLabel] = useAddLabelToTaskMutation()
	const [removeLabel] = useRemoveLabelFromTaskMutation()

	const { data } = useFindProjectByIdQuery()
	const projectLabels = data?.findProjectById.labels || []

	const handleLabelChange = async (labelId: string) => {
		const isLabelSelected = currentLabels?.some(l => l.id === labelId)

		if (isLabelSelected) {
			await removeLabel({ variables: { taskId, labelId } })
		} else {
			await addLabel({ variables: { taskId, labelId } })
		}
	}

	const filteredLabels = projectLabels.filter(label =>
		label?.name.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const renderTriggerContent = () => {
		if (triggerVariant === 'icon-only') {
			return currentLabels?.length > 0 ? (
				<div className="flex items-center gap-1">
					{currentLabels
						?.slice(0, 2)
						.map(label => (
							<div
								key={label.id}
								className="h-4 w-4 rounded-full border-2"
								style={{ backgroundColor: label.color }}
							/>
						))}
				</div>
			) : (
				<Tag className="h-4 w-4" />
			)
		}

		if (triggerVariant === 'compact') {
			return (
				<div className="flex items-center gap-1.5">
					{currentLabels?.length > 0 ? (
						<div className="flex items-center gap-1">
							{currentLabels.slice(0, 2).map(label => (
								<div
									key={label.id}
									className="h-3 w-3 rounded-full"
									style={{ backgroundColor: label.color }}
								/>
							))}
						</div>
					) : (
						<Tag className="h-4 w-4" />
					)}
					<span className="text-xs">
						{currentLabels?.length > 0
							? currentLabels?.length === 1
								? currentLabels[0].name
								: `${currentLabels?.length} labels`
							: 'Add labels'}
					</span>
					<ChevronDown className="h-3 w-3 opacity-50" />
				</div>
			)
		}

		// Default variant
		return (
			<div className="flex w-full flex-wrap items-center justify-between">
				<div className="flex items-center gap-2">
					{currentLabels?.length > 0 ? (
						currentLabels.map(label => (
							<div
								key={label.id}
								className="flex shrink-0 items-center gap-1.5 rounded-md bg-accent/30 px-2 py-1"
							>
								<div
									className="h-3 w-3 rounded-full border border-white/30"
									style={{ backgroundColor: label.color }}
								/>
								<span className="text-sm">{label.name}</span>
							</div>
						))
					) : (
						<>
							<Tags className="h-4 w-4" />
							<span>Add labels</span>
						</>
					)}
				</div>
				<ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
			</div>
		)
	}

	const trigger = (
		<Button
			variant="outline"
			role="combobox"
			aria-expanded={open}
			className={cn(
				'justify-between gap-2',
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
		<>
			<Popover open={open} onOpenChange={setOpen}>
				{showTooltip && triggerVariant !== 'default' ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<PopoverTrigger asChild>{trigger}</PopoverTrigger>
						</TooltipTrigger>
						<TooltipContent>
							<p>
								{currentLabels?.length > 0
									? currentLabels.map(l => l.name).join(', ')
									: 'No labels'}
							</p>
						</TooltipContent>
					</Tooltip>
				) : (
					<PopoverTrigger asChild>{trigger}</PopoverTrigger>
				)}
				<PopoverContent align="start" className="w-72 p-0">
					<Command shouldFilter={false}>
						<CommandInput
							placeholder="Search labels..."
							value={searchQuery}
							onValueChange={setSearchQuery}
						/>
						<CommandEmpty className="py-0.5">
							{searchQuery ? (
								<Dialog>
									<DialogTrigger asChild>
										<Button
											variant="ghost"
											className="w-full justify-start"
											onClick={() => setIsCreateDialogOpen(true)}
										>
											<Plus className="mr-2 h-4 w-4" />
											Create &quot;{searchQuery}&quot;
										</Button>
									</DialogTrigger>
								</Dialog>
							) : (
								'No labels found'
							)}
						</CommandEmpty>
						<CommandGroup>
							<CommandList>
								{filteredLabels.map(label => {
									const isSelected = currentLabels?.some(l => l.id === label.id)

									return (
										<CommandItem
											key={label.id}
											value={label.id}
											onSelect={() => handleLabelChange(label.id)}
											className="aria-selected:bg-accent aria-selected:text-accent-foreground"
										>
											<div className="flex items-center gap-2">
												<div
													className="h-4 w-4 rounded-full"
													style={{ backgroundColor: label.color }}
												/>
												<span>{label.name}</span>
											</div>
											<Check
												className={cn(
													'ml-auto h-4 w-4',
													isSelected ? 'opacity-100' : 'opacity-0'
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

			<CreateLabelDialog
				isOpen={isCreateDialogOpen}
				onOpenChange={setIsCreateDialogOpen}
				taskId={taskId}
				initialLabelName={searchQuery}
				onSuccess={() => {
					setSearchQuery('')
					setOpen(false)
				}}
			/>
		</>
	)
}
