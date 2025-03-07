'use client'

import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/Button'

export function LandingFooter() {
	const t = useTranslations('landing.footer')

	return (
		<footer className="w-full border-t bg-background">
			<div className="container mx-auto grid gap-8 px-4 py-10 md:px-6 lg:grid-cols-4 lg:gap-12">
				<div className="flex flex-col gap-2">
					<Logo iconSize={18} />
					<p className="text-sm text-muted-foreground">{t('description')}</p>
					<div className="mt-2 flex gap-2">
						<Button variant="ghost" size="icon" asChild>
							<Link href="#" aria-label={t('social.twitter')}>
								<Twitter className="h-4 w-4" />
							</Link>
						</Button>
						<Button variant="ghost" size="icon" asChild>
							<Link href="#" aria-label={t('social.facebook')}>
								<Facebook className="h-4 w-4" />
							</Link>
						</Button>
						<Button variant="ghost" size="icon" asChild>
							<Link href="#" aria-label={t('social.instagram')}>
								<Instagram className="h-4 w-4" />
							</Link>
						</Button>
						<Button variant="ghost" size="icon" asChild>
							<Link href="#" aria-label={t('social.linkedin')}>
								<Linkedin className="h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
					<div className="space-y-3">
						<h3 className="text-sm font-medium">{t('product.title')}</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('product.features')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('product.pricing')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('product.integrations')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('product.changelog')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('product.roadmap')}
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-3">
						<h3 className="text-sm font-medium">{t('company.title')}</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('company.about')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('company.blog')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('company.careers')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('company.customers')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('company.contact')}
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-3">
						<h3 className="text-sm font-medium">{t('resources.title')}</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('resources.documentation')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('resources.guides')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('resources.helpCenter')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('resources.api')}
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									{t('resources.community')}
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="border-t">
				<div className="container mx-auto flex flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-6">
					<p className="text-xs text-muted-foreground">
						{t('copyright', { year: new Date().getFullYear() })}
					</p>
					<div className="flex gap-4">
						<Link
							href="#"
							className="text-xs text-muted-foreground hover:text-foreground"
						>
							{t('legal.termsOfService')}
						</Link>
						<Link
							href="#"
							className="text-xs text-muted-foreground hover:text-foreground"
						>
							{t('legal.privacyPolicy')}
						</Link>
						<Link
							href="#"
							className="text-xs text-muted-foreground hover:text-foreground"
						>
							{t('legal.cookiePolicy')}
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
