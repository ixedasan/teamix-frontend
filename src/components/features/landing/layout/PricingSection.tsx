'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'

export function PricingSection() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })

	const plans = [
		{
			name: 'Free',
			description: 'Perfect for small teams just getting started',
			price: 0,
			features: [
				'Up to 5 team members',
				'5 projects',
				'Basic reporting',
				'Task management',
				'1GB storage',
				'Email support'
			],
			popular: false
		},
		{
			name: 'Pro',
			description: 'Ideal for growing teams with more complex needs',
			price: 10,
			features: [
				'Up to 20 team members',
				'Unlimited projects',
				'Advanced reporting',
				'Time tracking',
				'10GB storage',
				'Priority support',
				'Custom fields',
				'Automations'
			],
			popular: true
		},
		{
			name: 'Enterprise',
			description: 'Advanced features for large organizations',
			price: 49,
			features: [
				'Unlimited team members',
				'Unlimited projects',
				'Custom reporting',
				'Advanced security',
				'100GB storage',
				'24/7 support',
				'API access',
				'SSO integration',
				'Dedicated account manager'
			],
			popular: false
		}
	]

	return (
		<section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
							Pricing
						</div>
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							Simple, transparent pricing
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
							Choose the plan that&apos;s right for your team. All plans include
							a 14-day free trial.
						</p>
					</div>
				</div>

				<div
					ref={ref}
					className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3"
				>
					{plans.map((plan, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.5, delay: 0.1 * index }}
						>
							<Card
								className={`flex h-full flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}
							>
								{plan.popular && (
									<div className="absolute right-4 top-0 -translate-y-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
										Most Popular
									</div>
								)}
								<CardHeader>
									<CardTitle>{plan.name}</CardTitle>
									<CardDescription>{plan.description}</CardDescription>
								</CardHeader>
								<CardContent className="flex-1">
									<div className="mb-4">
										<span className="text-4xl font-bold">${plan.price}</span>
										<span className="text-muted-foreground"> /month</span>
									</div>
									<ul className="space-y-2">
										{plan.features.map((feature, i) => (
											<li key={i} className="flex items-center">
												<Check className="mr-2 h-4 w-4 text-primary" />
												<span>{feature}</span>
											</li>
										))}
									</ul>
								</CardContent>
								<CardFooter>
									<Link href="/projects" className="w-full">
										<Button
											variant={plan.popular ? 'default' : 'outline'}
											className="w-full"
										>
											Get Started
										</Button>
									</Link>
								</CardFooter>
							</Card>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}
