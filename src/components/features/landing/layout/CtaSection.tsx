'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslations } from 'next-intl'

export function CtaSection() {
	const t = useTranslations('landing.cta')

	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })

	const benefits = t.raw('benefits') as string[]

	return (
		<section className="w-full bg-muted/50 py-12 md:py-24 lg:py-32">
			<div ref={ref} className="container mx-auto px-4 md:px-6">
				<motion.div
					className="mx-auto flex max-w-5xl flex-col items-center justify-center space-y-4 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5 }}
				>
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
							{t('title')}
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
							{t('description')}
						</p>
					</div>
					<div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
						{benefits.map((benefit, index) => (
							<div key={index} className="flex items-center gap-1">
								<div className="h-2 w-2 rounded-full bg-primary" />
								<span className="text-sm">{benefit}</span>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	)
}
