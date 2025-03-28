'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { Logo } from '@/components/common/Logo'
import ThemeSwitcher from '@/components/common/ThemeSwitcher'
import { Button } from '@/components/ui/Button'
import { ListItem } from '@/components/ui/List'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle
} from '@/components/ui/NavigationMenu'

export function LandingHeader() {
	const t = useTranslations('landing.header')

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Logo iconSize={18} />
				</motion.div>
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-1">
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<NavigationMenuTrigger>
										{t('features.heading')}
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
											<li className="row-span-3">
												<NavigationMenuLink asChild>
													<Link
														className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
														href="/"
													>
														<div className="mb-2 mt-4 text-lg font-medium">
															TEAMIX Platform
														</div>
														<p className="text-sm leading-tight text-muted-foreground">
															{t('features.description')}
														</p>
													</Link>
												</NavigationMenuLink>
											</li>
											<ListItem
												href="/features/tasks"
												title={t('features.taskManagement')}
											>
												{t('features.taskManagementDescription')}
											</ListItem>
											<ListItem
												href="/features/collaboration"
												title={t('features.teamCollaboration')}
											>
												{t('features.teamCollaborationDescription')}
											</ListItem>
											<ListItem
												href="/features/analytics"
												title={t('features.analytics')}
											>
												{t('features.analyticsDescription')}
											</ListItem>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuTrigger>
										{t('solutions.heading')}
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
											<ListItem
												href="/solutions/startups"
												title={t('solutions.startaps')}
											>
												{t('solutions.startapsDescription')}
											</ListItem>
											<ListItem
												href="/solutions/enterprise"
												title={t('solutions.enterprise')}
											>
												{t('solutions.enterpriseDescription')}
											</ListItem>
											<ListItem
												href="/solutions/agencies"
												title={t('solutions.agency')}
											>
												{t('solutions.agencyDescription')}
											</ListItem>
											<ListItem
												href="/solutions/remote"
												title={t('solutions.remote')}
											>
												{t('solutions.remoteDescription')}
											</ListItem>
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<Link href="#pricing" legacyBehavior passHref>
										<NavigationMenuLink
											className={navigationMenuTriggerStyle()}
										>
											{t('pricing')}
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
						<ThemeSwitcher />
						<LanguageSwitcher />
						<Link href="/account/login">
							<Button className="ml-2 hidden md:flex">{t('button')}</Button>
						</Link>
						<Button variant="outline" size="icon" className="md:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="h-5 w-5"
							>
								<line x1="3" y1="6" x2="21" y2="6" />
								<line x1="3" y1="12" x2="21" y2="12" />
								<line x1="3" y1="18" x2="21" y2="18" />
							</svg>
							<span className="sr-only">Toggle menu</span>
						</Button>
					</nav>
				</div>
			</div>
		</header>
	)
}
