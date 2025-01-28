'use client'

import { useRouter } from 'next/navigation'
import { Check, X } from 'lucide-react'
import { toast } from 'sonner'

import { Heading } from '@/components/common/Heading'
import { Button } from '@/components/ui/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import {
	ProjectPlan,
	useFindProjectByIdQuery,
	useUpgrageProjectPlanMutation
} from '@/graphql/generated/output'
import { cn } from '@/lib/utils'

interface PricingFeature {
	name: string
	included: boolean
	description?: string
}

interface PricingPlan {
	id: ProjectPlan
	name: string
	description: string
	price: string
	billingPeriod?: string
	features: PricingFeature[]
	highlighted?: boolean
	action: {
		text: string
		href?: string
		variant:
			| 'default'
			| 'secondary'
			| 'destructive'
			| 'outline'
			| 'ghost'
			| 'link'
	}
}

const plans: PricingPlan[] = [
	{
		id: ProjectPlan.Free,
		name: 'Free',
		description: 'Basic features for small teams',
		price: '$0',
		billingPeriod: 'forever',
		features: [
			{
				name: 'Task Management',
				included: true,
				description: 'Create and assign tasks'
			},
			{
				name: 'Kanban Boards',
				included: true,
				description: 'Visualize your workflow'
			},
			{
				name: 'Calendar',
				included: true,
				description: 'Plan your schedule'
			},
			{
				name: 'File Sharing',
				included: true,
				description: 'Upload and share files'
			}
		],
		action: {
			text: 'Start Free',
			variant: 'ghost'
		}
	},
	{
		id: ProjectPlan.Pro,
		name: 'Pro',
		description: 'Everything in Free +',
		price: '$10',
		billingPeriod: 'per user / month',
		highlighted: true,
		features: [
			{
				name: 'More  features',
				included: true,
				description: 'Enhanced project management capabilities'
			},
			{
				name: 'Full Time Tracking',
				included: true,
				description: 'Complete time management solution'
			},

			{
				name: 'Automations',
				included: true,
				description: 'Automate repetitive tasks'
			},
			{
				name: 'Popular integrations',
				included: true,
				description: 'Connect with your favorite tools'
			},
			{
				name: 'AI',
				included: true,
				description: 'AI-powered productivity features'
			}
		],
		action: {
			text: 'Upgrade to Pro',
			variant: 'default'
		}
	},
	{
		id: ProjectPlan.Enterprise,
		name: 'Enterprise',
		description: 'Everything in Pro +',
		price: 'Quote on request',
		features: [
			{
				name: 'RBAC',
				included: true,
				description: 'Role-based access control'
			},
			{
				name: 'Project Templates',
				included: true,
				description: 'Standardize your workflows'
			},
			{
				name: 'Baselines And Deviations',
				included: true,
				description: 'Track project progress'
			},
			{
				name: 'Custom Reports',
				included: true,
				description: 'Build tailored analytics'
			},
			{
				name: 'Scheduled Comms',
				included: true,
				description: 'Automated communications'
			},
			{
				name: 'Intake Forms',
				included: true,
				description: 'Streamline request management'
			}
		],
		action: {
			text: 'Talk to sales',
			href: '/contact-sales',
			variant: 'outline'
		}
	}
]

export function PlanList() {
	const router = useRouter()
	const { data: projectData, loading: projectLoading } =
		useFindProjectByIdQuery()
	const currentPlan = projectData?.findProjectById?.plan || ProjectPlan.Free

	const [makePayment, { loading: paymentLoading }] =
		useUpgrageProjectPlanMutation({
			onCompleted: data => {
				if (data.makePayment.url) {
					router.push(data.makePayment.url)
				}
			},
			onError: error => {
				toast.error('Failed to upgrade plan. Please try again later.', {
					description: error.message
				})
			}
		})

	const handleAction = (plan: PricingPlan) => {
		if (plan.id === currentPlan) {
			return
		}

		if (plan.action.href) {
			router.push(plan.action.href)
			return
		}

		if (plan.id === ProjectPlan.Pro) {
			makePayment()
		}
	}

	const getActionText = (plan: PricingPlan) => {
		if (plan.id === currentPlan) {
			return 'Current Plan'
		}

		if (paymentLoading && plan.id === ProjectPlan.Pro) {
			return 'Processing...'
		}

		return plan.action.text
	}

	const getActionVariant = (plan: PricingPlan) => {
		if (plan.id === currentPlan) {
			return 'ghost' as const
		}

		return plan.action.variant
	}

	if (projectLoading) {
		return (
			<div className="flex items-center justify-center p-8">Loading...</div>
		)
	}

	return (
		<div className="mt-5">
			<div className="mb-8">
				<Heading
					title="Upgrade to unlock premium features"
					description="Choose the plan that best fits your team's needs. All plans include our core features with additional capabilities in paid tiers."
					size="lg"
				/>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{plans.map(plan => (
					<Card
						key={plan.id}
						className={cn(
							'relative overflow-hidden border transition-all duration-300',
							'hover:border-primary/50 dark:border-zinc-800 dark:hover:border-zinc-700',
							'bg-card dark:bg-card/95',
							plan.highlighted && 'ring-2 ring-primary/50 dark:ring-primary',
							plan.id === currentPlan &&
								'ring-2 ring-green-500 dark:ring-green-400'
						)}
					>
						{plan.highlighted && plan.id !== currentPlan && (
							<div className="absolute -right-12 top-6 rotate-45 bg-primary px-12 py-1 text-sm text-primary-foreground">
								Popular
							</div>
						)}
						{plan.id === currentPlan && (
							<div className="absolute -right-12 top-6 rotate-45 bg-green-500 px-12 py-1 text-sm text-white">
								Current
							</div>
						)}
						<CardHeader>
							<CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
							<CardDescription className="text-muted-foreground">
								{plan.description}
							</CardDescription>
							<div className="mt-4">
								<div className="text-3xl font-bold tracking-tight">
									{plan.price}
								</div>
								{plan.billingPeriod && (
									<div className="text-sm text-muted-foreground">
										{plan.billingPeriod}
									</div>
								)}
							</div>
						</CardHeader>
						<CardContent className="space-y-4">
							{plan.features.map((feature, index) => (
								<div
									key={index}
									className="group flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50"
								>
									{feature.included ? (
										<Check className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400" />
									) : (
										<X className="h-5 w-5 flex-shrink-0 text-red-500 dark:text-red-400" />
									)}
									<div>
										<span className="text-foreground">{feature.name}</span>
										{feature.description && (
											<p className="mt-1 text-sm text-muted-foreground">
												{feature.description}
											</p>
										)}
									</div>
								</div>
							))}
						</CardContent>
						<CardFooter className="flex flex-col gap-4">
							<Button
								className="w-full"
								variant={getActionVariant(plan)}
								onClick={() => handleAction(plan)}
								disabled={
									plan.id === currentPlan ||
									(paymentLoading && plan.id === ProjectPlan.Pro)
								}
							>
								{getActionText(plan)}
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	)
}
