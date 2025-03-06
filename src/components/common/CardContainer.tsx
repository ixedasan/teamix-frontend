import type { ComponentType, PropsWithChildren, ReactNode } from 'react'

import { IconProps } from '@/utils/get-browser-icon'
import { Card } from '../ui/Card'
import { cn } from '@/lib/utils'

interface ICardContainer {
	heading: string
	description?: string
	Icon?: ComponentType<IconProps>
	isRightContentFull?: boolean
	rightContent?: ReactNode
}

export function CardContainer({
	heading,
	description,
	Icon,
	isRightContentFull,
	rightContent,
	children
}: PropsWithChildren<ICardContainer>) {
	return (
		<Card className="p-4">
			<div className="flex items-center justify-between">
				<div className="flex flex-row items-center gap-x-4">
					{Icon && (
						<div className="rounded-full bg-foreground p-2.5">
							<Icon className="size-7 text-secondary" />
						</div>
					)}
					<div className="space-y-1">
						<h2 className="font-semibold tracking-wide">{heading}</h2>
						{description && (
							<p className="max-w-4xl text-sm text-muted-foreground">
								{description}
							</p>
						)}
					</div>
				</div>
				{rightContent && (
					<div className={cn(isRightContentFull && 'ml-6 w-full')}>
						{rightContent}
					</div>
				)}
			</div>
			{children && <div className="mt-4">{children}</div>}
		</Card>
	)
}
