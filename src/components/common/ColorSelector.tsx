'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useTheme } from 'next-themes'
import ColorPicker from 'react-best-gradient-color-picker'

import { Button } from '../ui/Button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'

interface IColorSelector {
	onChange: (value: string) => void
	isDisabled?: boolean
	value?: string
}

export function ColorSelector({ onChange, isDisabled, value }: IColorSelector) {
	const { theme } = useTheme()
	const [color, setColor] = useState('#ffffff')
	const [isPopoverOpen, setIsPopoverOpen] = useState(false)

	if (value && !color) {
		setColor(value)
	}

	return (
		<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
			<PopoverTrigger
				className="disabled:cursor-not-allowed"
				disabled={isDisabled}
			>
				<div
					className="h-6 w-6 cursor-pointer rounded-md border border-gray-200 shadow-md transition-all hover:shadow-lg"
					style={{ backgroundColor: color }}
				/>
			</PopoverTrigger>
			<PopoverContent side="right" className="mb-4 mr-28 p-0">
				<div className="relative">
					<Button
						onClick={() => setIsPopoverOpen(false)}
						variant="outline"
						className="absolute -right-8 -top-8 z-50 size-6 p-0"
						aria-label="Close color picker"
					>
						<X className="size-4" />
					</Button>
					<ColorPicker
						value={color}
						onChange={(color: string) => {
							onChange(color)
							setColor(color)
						}}
						disableDarkMode={theme !== 'dark'}
						hideAdvancedSliders
						hideColorGuide
						hideInputType
						hideColorTypeBtns
						hideGradientType
						hideGradientAngle
						hideGradientStop
						hideGradientControls
					/>
				</div>
			</PopoverContent>
		</Popover>
	)
}
