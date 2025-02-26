'use client'

import { Skeleton } from '@/components/ui/Skeleton'

export function AnalyticsSkeletonLoader() {
	return (
		<div className="container mx-auto max-w-7xl px-4 py-6">
			<Skeleton className="mb-2 h-10 w-1/3" />
			<Skeleton className="mb-6 h-5 w-2/3" />

			<div className="space-y-6">
				<div className="mb-6 flex space-x-2">
					<Skeleton className="h-10 w-24" />
					<Skeleton className="h-10 w-24" />
					<Skeleton className="h-10 w-24" />
					<Skeleton className="h-10 w-24" />
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Skeleton className="h-32 w-full" />
					<Skeleton className="h-32 w-full" />
					<Skeleton className="h-32 w-full" />
					<Skeleton className="h-32 w-full" />
				</div>

				<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
					<Skeleton className="h-96 w-full" />
					<Skeleton className="h-96 w-full" />
					<Skeleton className="h-96 w-full" />
					<Skeleton className="h-96 w-full" />
				</div>
			</div>
		</div>
	)
}
