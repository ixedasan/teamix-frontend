'use client'

import { ReactNode } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/Card'

interface IStatCard {
	title: string
	value: number | string
	description: string
	icon?: ReactNode
	trend?: number
	trendLabel?: string
}

export function StatCard({
	title,
	value,
	description,
	icon,
	trend,
	trendLabel
}: IStatCard) {
	return (
		<Card className="overflow-hidden">
			<CardContent className="p-6">
				<div className="flex items-start justify-between">
					<div className="space-y-1">
						<p className="text-sm text-gray-500">{title}</p>
						<p className="text-2xl font-bold">{value}</p>
						<div className="flex items-center">
							<span className="text-xs text-gray-500">{description}</span>
						</div>
					</div>
					{icon && <div>{icon}</div>}
				</div>

				{trend && (
					<div className="mt-4 flex items-center text-xs">
						{trend > 0 ? (
							<ChevronUp className="mr-1 h-3 w-3 text-green-500" />
						) : (
							<ChevronDown className="mr-1 h-3 w-3 text-red-500" />
						)}
						<span className={trend > 0 ? 'text-green-500' : 'text-red-500'}>
							{Math.abs(trend)}% {trendLabel}
						</span>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
