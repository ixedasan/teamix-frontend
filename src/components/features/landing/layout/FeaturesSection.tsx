'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
	BarChart3,
	Calendar,
	Dock,
	MessageSquare,
	Users,
	Zap
} from 'lucide-react'
import { useTranslations } from 'next-intl'

export function FeaturesSection() {
	const t = useTranslations('landing.features')

	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })

	const features = [
		{
			icon: <Calendar className="h-10 w-10 text-primary" />,
			title: t('projectPlanning.heading'),
			description: t('projectPlanning.description')
		},
		{
			icon: <Dock className="h-10 w-10 text-primary" />,
			title: t('documentManagement.heading'),
			description: t('documentManagement.description')
		},
		{
			icon: <Users className="h-10 w-10 text-primary" />,
			title: t('teamCollaboration.heading'),
			description: t('teamCollaboration.description')
		},
		{
			icon: <MessageSquare className="h-10 w-10 text-primary" />,
			title: t('chat.heading'),
			description: t('chat.description')
		},
		{
			icon: <BarChart3 className="h-10 w-10 text-primary" />,
			title: t('analytics.heading'),
			description: t('analytics.description')
		},
		{
			icon: <Zap className="h-10 w-10 text-primary" />,
			title: t('automation.heading'),
			description: t('automation.description')
		}
	]

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1
			}
		}
	}

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.5
			}
		}
	}

	return (
		<section className="w-full bg-muted/50 py-12 md:py-24 lg:py-32">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
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
					className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3"
				>
					<motion.div
						className="grid gap-6"
						variants={containerVariants}
						initial="hidden"
						animate={isInView ? 'visible' : 'hidden'}
					>
						{features.slice(0, 2).map((feature, index) => (
							<motion.div
								key={index}
								className="rounded-lg border bg-background p-6 shadow-sm"
								variants={itemVariants}
							>
								<div className="mb-4">{feature.icon}</div>
								<h3 className="text-xl font-bold">{feature.title}</h3>
								<p className="text-muted-foreground">{feature.description}</p>
							</motion.div>
						))}
					</motion.div>
					<motion.div
						className="grid gap-6"
						variants={containerVariants}
						initial="hidden"
						animate={isInView ? 'visible' : 'hidden'}
					>
						{features.slice(2, 4).map((feature, index) => (
							<motion.div
								key={index}
								className="rounded-lg border bg-background p-6 shadow-sm"
								variants={itemVariants}
							>
								<div className="mb-4">{feature.icon}</div>
								<h3 className="text-xl font-bold">{feature.title}</h3>
								<p className="text-muted-foreground">{feature.description}</p>
							</motion.div>
						))}
					</motion.div>
					<motion.div
						className="grid gap-6"
						variants={containerVariants}
						initial="hidden"
						animate={isInView ? 'visible' : 'hidden'}
					>
						{features.slice(4, 6).map((feature, index) => (
							<motion.div
								key={index}
								className="rounded-lg border bg-background p-6 shadow-sm"
								variants={itemVariants}
							>
								<div className="mb-4">{feature.icon}</div>
								<h3 className="text-xl font-bold">{feature.title}</h3>
								<p className="text-muted-foreground">{feature.description}</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	)
}
