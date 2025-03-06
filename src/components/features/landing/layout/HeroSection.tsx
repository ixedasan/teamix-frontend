'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/Button'

export function HeroSection() {
	const t = useTranslations('landing.hero')

	return (
		<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
					<motion.div
						className="flex flex-col justify-center space-y-4"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<div className="space-y-2">
							<motion.h1
								className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.7, delay: 0.3 }}
							>
								{t('heading')} <span className="text-primary">TEAM</span>
								<span>IX</span>
							</motion.h1>
							<motion.p
								className="max-w-[600px] text-muted-foreground md:text-xl"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.7, delay: 0.5 }}
							>
								{t('description')}
							</motion.p>
						</div>
						<motion.div
							className="flex flex-col gap-2 min-[400px]:flex-row"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.7 }}
						>
							<Link href="/account/login">
								<Button size="lg" className="px-8">
									{t('button')}
								</Button>
							</Link>
						</motion.div>
						<motion.div
							className="flex items-center space-x-4 text-sm"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.9 }}
						>
							<div className="flex -space-x-2">
								{[1, 2, 3, 4].map(i => (
									<div
										key={i}
										className="h-8 w-8 rounded-full border-2 border-background bg-muted"
									/>
								))}
							</div>
							<div className="text-muted-foreground">
								{t('teamsFirst')}{' '}
								<span className="font-medium text-foreground">2,000+</span>{' '}
								{t('teamsSecond')}
							</div>
						</motion.div>
					</motion.div>
					<motion.div
						className="mx-auto lg:mx-0"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.7, delay: 0.6 }}
					>
						<div className="relative h-[350px] w-full sm:h-[400px] md:h-[450px] lg:h-[500px]">
							<div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 opacity-50 blur-3xl" />
							<div className="relative h-full w-full rounded-lg border bg-background p-2 shadow-lg">
								<div className="h-full w-full overflow-hidden rounded-md bg-muted">
									<Image
										src="/images/placeholder.svg"
										alt="TEAMIX Dashboard"
										width={800}
										height={500}
										className="h-full w-full object-cover"
									/>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	)
}
