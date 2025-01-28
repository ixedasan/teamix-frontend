'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
	BarChart3,
	Clock,
	MessageSquare,
	Shield,
	Users,
	Zap
} from 'lucide-react'
import { useTranslations } from 'next-intl'

import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { Logo } from '@/components/common/Logo'
import ThemeSwitcher from '@/components/common/ThemeSwitcher'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/Accordion'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { ContactOurTeamForm } from './ContactOurTeamForm'

interface Feature {
	icon: keyof typeof iconMap
	title: string
	description: string
}

interface FAQ {
	question: string
	answer: string
}

const iconMap = {
	Users,
	MessageSquare,
	Shield,
	BarChart3,
	Clock,
	Zap
} as const

export function ContactSales() {
	const t = useTranslations('contactSales')

	useEffect(() => {
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('show')
				}
			})
		})

		document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))

		return () => observer.disconnect()
	}, [])

	const features = t.raw('features') as Feature[]
	const faqs = t.raw('faqs') as FAQ[]

	return (
		<div className="min-h-screen bg-gradient-to-b from-background via-background/90 to-background/80">
			<div className="container sticky mx-auto flex w-full items-center justify-between py-4">
				<Logo />
				<div>
					<ThemeSwitcher />
					<LanguageSwitcher />
				</div>
			</div>
			<div className="container mx-auto px-4 py-8">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="mb-16 text-center"
				>
					<Badge variant="secondary" className="mb-4">
						{t('badge')}
					</Badge>
					<h1 className="mb-4 text-5xl font-extrabold sm:text-6xl">
						<span className="bg-gradient-to-r from-primary via-chart-3/80 to-chart-5/70 bg-clip-text text-transparent">
							{t('title')}
						</span>
					</h1>
					<p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
						{t('subtitle')}
					</p>
				</motion.div>

				<div className="grid gap-12 lg:grid-cols-2">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
					>
						<Card className="relative overflow-hidden border-border shadow-lg">
							<CardContent className="p-6">
								<div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-primary/10 to-primary/5" />
								<ContactOurTeamForm />
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						className="space-y-8"
					>
						<h2 className="text-3xl font-bold text-foreground">
							{t('featuresTitle')}
						</h2>
						<div className="grid gap-6">
							{features.map((feature: Feature, index: number) => {
								const Icon = iconMap[feature.icon]
								return (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
									>
										<Card className="group border-border transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/5">
											<CardContent className="flex items-start gap-4 p-6">
												<div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-2">
													<Icon className="h-6 w-6 text-primary" />
												</div>
												<div>
													<h3 className="font-semibold text-foreground">
														{feature.title}
													</h3>
													<p className="text-sm text-muted-foreground">
														{feature.description}
													</p>
												</div>
											</CardContent>
										</Card>
									</motion.div>
								)
							})}
						</div>
					</motion.div>
				</div>

				<div className="mt-24 fade-in">
					<h2 className="mb-8 text-center text-3xl font-bold text-foreground">
						{t('faqsTitle')}
					</h2>
					<Accordion
						type="single"
						collapsible
						className="mx-auto w-full max-w-2xl"
					>
						{faqs.map((faq: FAQ, index: number) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
								className="border-border"
							>
								<AccordionTrigger className="text-left text-foreground transition-colors hover:text-primary">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="text-muted-foreground">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>
		</div>
	)
}
