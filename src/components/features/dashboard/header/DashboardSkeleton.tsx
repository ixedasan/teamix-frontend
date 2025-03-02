import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'

export function DashboardSkeleton() {
	return (
		<div className="mx-auto flex w-full flex-col gap-6 px-4">
			<div className="flex flex-wrap gap-2">
				{[1, 2, 3, 4].map(i => (
					<Skeleton key={i} className="h-10 w-24 rounded" />
				))}
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{[1, 2, 3, 4].map(i => (
					<Card key={i}>
						<CardHeader className="pb-2">
							<Skeleton className="h-5 w-32" />
						</CardHeader>
						<CardContent>
							<div className="flex flex-col gap-2">
								<Skeleton className="h-10 w-16" />
								<Skeleton className="h-4 w-40" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				<Card className="lg:col-span-1">
					<CardHeader>
						<CardTitle>
							<Skeleton className="h-6 w-40" />
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[1, 2, 3, 4].map(i => (
								<div key={i} className="flex items-center justify-between">
									<Skeleton className="h-4 w-24" />
									<Skeleton className="h-4 w-48" />
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>
							<Skeleton className="h-6 w-40" />
						</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center justify-center">
						<Skeleton className="h-48 w-48 rounded-full" />
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>
							<Skeleton className="h-6 w-40" />
						</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center justify-center">
						<Skeleton className="h-48 w-48 rounded-full" />
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>
						<Skeleton className="h-6 w-40" />
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						{[1, 2].map(i => (
							<div key={i} className="space-y-2">
								<div className="flex items-center justify-between">
									<Skeleton className="h-5 w-32" />
									<Skeleton className="h-5 w-8" />
								</div>
								<Skeleton className="h-2 w-full" />
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle>
						<Skeleton className="h-6 w-32" />
					</CardTitle>
					<Skeleton className="h-4 w-16" />
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						{[1, 2, 3, 4].map(i => (
							<div
								key={i}
								className="flex items-start space-x-4 rounded border p-3"
							>
								<Skeleton className="h-6 w-6" />
								<div className="flex-1 space-y-2">
									<Skeleton className="h-5 w-24" />
									<div className="flex items-center space-x-2">
										<Skeleton className="h-4 w-16" />
										<Skeleton className="h-4 w-4 rounded-full" />
									</div>
									<div className="flex justify-between">
										<Skeleton className="h-4 w-24" />
										<Skeleton className="h-6 w-20 rounded-full" />
									</div>
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
