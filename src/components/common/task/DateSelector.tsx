'use client'

import { useState } from 'react'
import { format, isSameDay } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Calendar } from '@/components/ui/Calendar'
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
import { cn } from '@/lib/utils'

interface DateSelectorProps {
	value?: Date | null
	onChange: (date?: Date | null) => void
	disabled?: boolean
	triggerVariant?: 'default' | 'compact' | 'icon-only'
	contentAlignment?: 'start' | 'center' | 'end'
	className?: string
	showTooltip?: boolean
	tooltipContent?: string
}

export function DateSelector({
	value,
	onChange,
	disabled = false,
	triggerVariant = 'default',
	contentAlignment = 'center',
	className,
	showTooltip = true,
	tooltipContent = 'Selected date'
}: DateSelectorProps) {
	const [open, setOpen] = useState(false)

	const handleDateSelect = (date?: Date) => {
		if (date && value && isSameDay(date, value)) {
			onChange(null)
		} else {
			onChange(date)
		}
		setOpen(false)
	}

	const renderTriggerContent = () => {
		if (triggerVariant === 'icon-only') {
			return <CalendarIcon className="h-4 w-4" />
		}

		if (triggerVariant === 'compact') {
			return (
				<div className="flex items-center gap-1.5">
					{value ? (
						<span className="text-xs">{format(value, 'dd.MM')}</span>
					) : (
						<CalendarIcon className="h-4 w-4" />
					)}
				</div>
			)
		}

		// Default variant
		return (
			<div className="flex items-center gap-2">
				{value ? (
					<span>{format(value, 'dd.MM.yyyy')}</span>
				) : (
					<>
						<CalendarIcon className="h-4 w-4" />
						<span>Pick a date</span>
					</>
				)}
			</div>
		)
	}

	const trigger = (
		<Button
			variant="outline"
			className={cn(
				'justify-between',
				triggerVariant === 'icon-only' && 'h-6 w-6 p-0.5',
				triggerVariant === 'compact' && 'h-7 px-2',
				triggerVariant === 'default' && 'w-full',
				!value && 'text-muted-foreground',
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
							{value
								? `${tooltipContent}: ${format(value, 'PPP')}`
								: `${tooltipContent}`}
						</p>
					</TooltipContent>
				</Tooltip>
			) : (
				<PopoverTrigger asChild>{trigger}</PopoverTrigger>
			)}
			<PopoverContent align={contentAlignment} className="w-auto p-0">
				<Calendar
					mode="single"
					selected={value ?? undefined}
					onSelect={handleDateSelect}
					initialFocus
					disabled={{ before: new Date() }}
				/>
			</PopoverContent>
		</Popover>
	)
}
