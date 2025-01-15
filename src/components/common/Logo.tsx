'use client'

import { CommandIcon } from 'lucide-react'
import { useSidebar } from '@/components/ui/Sidebar'
import { cn } from '@/lib/utils'

interface LogoProps {
	fontSize?: string
	iconSize?: number
	className?: string
	showText?: boolean
}

export function Logo({
	fontSize = 'text-2xl',
	iconSize = 24,
	className,
	showText = true
}: LogoProps) {
	const { state } = useSidebar()

	return (
		<div
			className={cn(
				'flex items-center gap-3 transition-opacity hover:opacity-90',
				className
			)}
		>
			<div className="relative rounded-xl bg-gradient-to-br from-primary to-primary/80 p-2.5 transition-all group-hover:shadow-lg">
				<CommandIcon size={iconSize} className="stroke-primary-foreground" />
				<div className="absolute inset-0 animate-pulse rounded-xl bg-primary/10" />
			</div>

			{showText && state === 'expanded' && (
				<div className={cn('font-extrabold tracking-tight', fontSize)}>
					<span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
						Team
					</span>
					<span className="text-foreground">ix</span>
				</div>
			)}
		</div>
	)
}
