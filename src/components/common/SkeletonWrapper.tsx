import { PropsWithChildren } from 'react'

import { Skeleton } from '../ui/Skeleton'
import { cn } from '@/lib/utils'

interface ISkeletonWrapper {
	isLoading: boolean
	fullWidth?: boolean
}

export function SkeletonWrapper({
	children,
	isLoading,
	fullWidth
}: PropsWithChildren<ISkeletonWrapper>) {
	if (!isLoading) return <>{children}</>

	return (
		<Skeleton className={cn(fullWidth && 'w-full')}>
			<div className="opacity-0">{children}</div>
		</Skeleton>
	)
}
