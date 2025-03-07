'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

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
	const t = useTranslations('landing.pricing')
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })

	const plans = t.raw('plans') as {
		name: string
		description: string
		price: number
		features: string[]
	}[]

	return (
		<section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
							{t('title')}
						</div>
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							{t('subtitle')}
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
							{t('description')}
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
								className={`flex h-full flex-col ${index === 1 ? 'border-primary shadow-lg' : ''}`}
							>
								{index === 1 && (
									<div className="absolute right-4 top-0 -translate-y-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
										{t('mostPopular')}
									</div>
								)}
								<CardHeader>
									<CardTitle>{plan.name}</CardTitle>
									<CardDescription>{plan.description}</CardDescription>
								</CardHeader>
								<CardContent className="flex-1">
									<div className="mb-4">
										<span className="text-4xl font-bold">${plan.price}</span>
										<span className="text-muted-foreground">
											{' '}
											{t('perMonth')}
										</span>
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
											variant={index === 1 ? 'default' : 'outline'}
											className="w-full"
										>
											{t('button')}
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
