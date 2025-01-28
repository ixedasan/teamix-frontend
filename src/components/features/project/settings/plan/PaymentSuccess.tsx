'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'

export default function PaymentSuccess() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const projectId = searchParams.get('project')

	useEffect(() => {
		if (!projectId) {
			router.push('/projects')
		}
	}, [projectId, router])

	return (
		<div className="flex min-h-[80vh] items-center justify-center p-4">
			<Card className="max-w-lg">
				<CardHeader className="text-center">
					<div className="mb-4 flex justify-center">
						<div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
							<Check className="h-6 w-6 text-green-600 dark:text-green-400" />
						</div>
					</div>
					<CardTitle className="text-2xl font-bold">
						Payment Successful!
					</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4 text-center">
					<p className="text-lg text-muted-foreground">
						Thank you for upgrading to Pro plan. Your project has been
						successfully upgraded.
					</p>

					<div className="rounded-lg bg-muted p-4">
						<h3 className="mb-2 font-medium">What's next?</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>✨ Explore new Pro features</li>
							<li>🔄 Set up workflow automations</li>
							<li>🤝 Invite your team members</li>
							<li>🔗 Configure integrations</li>
						</ul>
					</div>
				</CardContent>

				<CardFooter className="flex flex-col gap-2">
					<Button
						className="w-full"
						onClick={() => router.push(`/projects/${projectId}/tasks`)}
					>
						Go to Project
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}
