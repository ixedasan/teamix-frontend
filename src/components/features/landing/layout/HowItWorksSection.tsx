'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function HowItWorksSection() {
	const t = useTranslations('landing.howItWorks')

	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })

	const steps = [
		{
			number: '01',
			title: t('step1.heading'),
			description:
				t('step1.description')
		},
		{
			number: '02',
			title: t('step2.heading'),
			description:
				t('step2.description')
		},
		{
			number: '03',
			title: t('step3.heading'),
			description:
				t('step3.description')
		},
		{
			number: '04',
			title: t('step4.heading'),
			description:
				t('step4.description')
		}
	]

	return (
		<section className="w-full py-12 md:py-24 lg:py-32">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
							{t('badge')}
						</div>
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
							{t('heading')}
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
							{t('description')}
						</p>
					</div>
				</div>

				<div
					ref={ref}
					className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2"
				>
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
						transition={{ duration: 0.7, delay: 0.2 }}
						className="relative h-[400px] overflow-hidden rounded-xl border bg-background shadow-lg"
					>
						<Image
							src="/images/placeholder.svg"
							alt="TEAMIX Platform Interface"
							width={600}
							height={800}
							className="h-full w-full object-cover"
						/>
					</motion.div>

					<div className="flex flex-col justify-center space-y-6">
						{steps.map((step, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0, y: 20 }}
								animate={
									isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
								}
								transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
								className="flex gap-4"
							>
								<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-background text-lg font-bold">
									{step.number}
								</div>
								<div className="space-y-1">
									<h3 className="text-xl font-bold">{step.title}</h3>
									<p className="text-muted-foreground">{step.description}</p>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
