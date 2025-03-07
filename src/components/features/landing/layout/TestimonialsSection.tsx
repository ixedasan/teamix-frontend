'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card'

export function TestimonialsSection() {
	const t = useTranslations('landing.testimonials')

	const ref = useRef(null)
	const isInView = useInView(ref, { once: true, amount: 0.2 })
	const [currentIndex, setCurrentIndex] = useState(0)

	const testimonials = [
		{
			quote: t('customer1.quote'),
			author: t('customer1.author'),
			role: t('customer1.role')
		},
		{
			quote: t('customer2.quote'),
			author: t('customer2.author'),
			role: t('customer2.role')
		},
		{
			quote: t('customer3.quote'),
			author: t('customer3.author'),
			role: t('customer3.role')
		},
		{
			quote: t('customer4.quote'),
			author: t('customer4.author'),
			role: t('customer4.role')
		}
	]

	const nextTestimonial = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
		)
	}

	const prevTestimonial = () => {
		setCurrentIndex(prevIndex =>
			prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
		)
	}

	const displayedTestimonials = () => {
		// For mobile: show 1, tablet: show 2, desktop: show 3
		const testimonialCount = testimonials.length
		const result = []

		for (let i = 0; i < 3; i++) {
			const index = (currentIndex + i) % testimonialCount
			result.push(testimonials[index])
		}

		return result
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

				<div ref={ref} className="relative mx-auto max-w-5xl py-12">
					<div className="mb-6 flex justify-end">
						<div className="flex gap-2">
							<Button
								variant="outline"
								size="icon"
								onClick={prevTestimonial}
								aria-label="Previous testimonial"
							>
								<ChevronLeft className="h-4 w-4" />
							</Button>
							<Button
								variant="outline"
								size="icon"
								onClick={nextTestimonial}
								aria-label="Next testimonial"
							>
								<ChevronRight className="h-4 w-4" />
							</Button>
						</div>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{displayedTestimonials().map((testimonial, index) => (
							<motion.div
								key={`${currentIndex}-${index}`}
								initial={{ opacity: 0, y: 20 }}
								animate={
									isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
								}
								transition={{ duration: 0.5, delay: 0.1 * index }}
								className={index > 0 ? 'hidden md:block' : ''}
							>
								<Card className="h-full">
									<CardHeader>
										<div className="flex">
											{[1, 2, 3, 4, 5].map((_, i) => (
												<Star
													key={i}
													className="h-4 w-4 fill-primary text-primary"
												/>
											))}
										</div>
									</CardHeader>
									<CardContent>
										<p className="text-lg">&quot;{testimonial.quote}&quot;</p>
									</CardContent>
									<CardFooter>
										<div>
											<p className="font-semibold">{testimonial.author}</p>
											<p className="text-sm text-muted-foreground">
												{testimonial.role}
											</p>
										</div>
									</CardFooter>
								</Card>
							</motion.div>
						))}
					</div>

					<div className="mt-8 flex justify-center gap-2">
						{testimonials.map((_, index) => (
							<Button
								key={index}
								variant="ghost"
								size="icon"
								className={`h-2 w-2 rounded-full p-0 ${
									index === currentIndex
										? 'bg-primary'
										: 'bg-muted-foreground/20'
								}`}
								onClick={() => setCurrentIndex(index)}
								aria-label={`Go to testimonial ${index + 1}`}
							/>
						))}
					</div>

					<div className="mt-12 flex flex-wrap justify-center gap-6">
						{[
							'Company',
							'Company',
							'Company',
							'Company',
							'Company',
							'Company'
						].map((company, index) => (
							<motion.div
								key={index}
								initial={{ opacity: 0 }}
								animate={isInView ? { opacity: 1 } : { opacity: 0 }}
								transition={{ duration: 0.5, delay: 0.1 * index }}
								className="flex h-12 items-center justify-center grayscale transition-all hover:grayscale-0"
							>
								<div className="text-xl font-bold text-muted-foreground">
									{company}
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
