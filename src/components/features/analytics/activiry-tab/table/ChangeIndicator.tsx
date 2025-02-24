'use client'

import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

export const ChangeIndicator = ({
	value,
	prev
}: {
	value: number
	prev: number
}) => {
	const change = value - prev
	if (change === 0) return null

	return (
		<span
			className={cn(
				'flex items-center text-xs',
				change > 0 ? 'text-green-500' : 'text-red-500'
			)}
		>
			{change > 0 ? (
				<ArrowUpIcon className="h-3 w-3" />
			) : (
				<ArrowDownIcon className="h-3 w-3" />
			)}
			{Math.abs(change)}
		</span>
	)
}
