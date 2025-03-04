import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/Button'

export function LandingFooter() {
	return (
		<footer className="w-full border-t bg-background">
			<div className="container mx-auto grid gap-8 px-4 py-10 md:px-6 lg:grid-cols-4 lg:gap-12">
				<div className="flex flex-col gap-2">
					<Logo iconSize={18} />
					<p className="text-sm text-muted-foreground">
						The all-in-one project management platform for modern teams.
					</p>
					<div className="mt-2 flex gap-2">
						<Button variant="ghost" size="icon" asChild>
							<Link href="#" aria-label="Twitter">
								<Twitter className="h-4 w-4" />
							</Link>
						</Button>
						<Button variant="ghost" size="icon" asChild>
							<Link href="#" aria-label="Facebook">
								<Facebook className="h-4 w-4" />
							</Link>
						</Button>
						<Button variant="ghost" size="icon" asChild>
							<Link href="#" aria-label="Instagram">
								<Instagram className="h-4 w-4" />
							</Link>
						</Button>
						<Button variant="ghost" size="icon" asChild>
							<Link href="#" aria-label="LinkedIn">
								<Linkedin className="h-4 w-4" />
							</Link>
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
					<div className="space-y-3">
						<h3 className="text-sm font-medium">Product</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Features
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Pricing
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Integrations
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Changelog
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Roadmap
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-3">
						<h3 className="text-sm font-medium">Company</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									About
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Careers
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Customers
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-3">
						<h3 className="text-sm font-medium">Resources</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Documentation
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Guides
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Help Center
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									API
								</Link>
							</li>
							<li>
								<Link
									href="#"
									className="text-sm text-muted-foreground hover:text-foreground"
								>
									Community
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="border-t">
				<div className="container mx-auto flex flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-6">
					<p className="text-xs text-muted-foreground">
						© {new Date().getFullYear()} TEAMIX. All rights reserved.
					</p>
					<div className="flex gap-4">
						<Link
							href="#"
							className="text-xs text-muted-foreground hover:text-foreground"
						>
							Terms of Service
						</Link>
						<Link
							href="#"
							className="text-xs text-muted-foreground hover:text-foreground"
						>
							Privacy Policy
						</Link>
						<Link
							href="#"
							className="text-xs text-muted-foreground hover:text-foreground"
						>
							Cookie Policy
						</Link>
					</div>
				</div>
			</div>
		</footer>
	)
}
