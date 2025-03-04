'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function CtaSection() {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })

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
							Ready to transform how your team works?
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
							Join thousands of teams already using TEAMIX to deliver projects
							faster and more efficiently.
						</p>
					</div>
					<div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
						<div className="flex items-center gap-1">
							<div className="h-2 w-2 rounded-full bg-primary" />
							<span className="text-sm">No credit card required</span>
						</div>
						<div className="flex items-center gap-1">
							<div className="h-2 w-2 rounded-full bg-primary" />
							<span className="text-sm">Cancel anytime</span>
						</div>
						<div className="flex items-center gap-1">
							<div className="h-2 w-2 rounded-full bg-primary" />
							<span className="text-sm">24/7 support</span>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	)
}
