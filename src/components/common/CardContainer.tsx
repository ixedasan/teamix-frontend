import type { PropsWithChildren, ReactNode } from 'react'

import { Card } from '../ui/Card'

interface ICardContainer {
	heading: string
	description: string
	rightContent?: ReactNode
}

export function CardContainer({
	children,
	heading,
	description,
	rightContent
}: PropsWithChildren<ICardContainer>) {
	return (
		<Card className="p-4">
			<div className="flex items-center justify-between gap-2">
				<div className="space-y-1">
					<h2 className="font-semibold tracking-wide">{heading}</h2>
					<p className="max-w-4xl text-sm text-muted-foreground">
						{description}
					</p>
				</div>
				{rightContent && <div>{rightContent}</div>}
			</div>
			{children && <div className="mt-4">{children}</div>}
		</Card>
	)
}
