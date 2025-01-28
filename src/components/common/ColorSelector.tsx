'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import ColorPicker from 'react-best-gradient-color-picker'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'

interface IColorSelector {
	onChange: (value: string) => void
	isDisabled?: boolean
	value?: string
}

export function ColorSelector({ onChange, isDisabled, value }: IColorSelector) {
	const { theme } = useTheme()
	const [color, setColor] = useState('#ffffff')

	if (value && !color) {
		setColor(value)
	}

	return (
		<Popover>
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
			</PopoverContent>
		</Popover>
	)
}
