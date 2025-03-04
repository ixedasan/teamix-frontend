'use client'

import {
	ExternalLink,
	Github,
	Globe,
	Linkedin,
	Mail,
	Twitter
} from 'lucide-react'

import { UserAvatar } from '@/components/common/UserAvatar'
import { Button } from '@/components/ui/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'
import { Separator } from '@/components/ui/Separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import type { FindProfileBySlugQuery } from '@/graphql/generated/output'

interface IProfileRoot {
	profile: FindProfileBySlugQuery['findProfileBySlug']
}

export function ProfileRoot({ profile }: IProfileRoot) {
	const sortedSocialLinks = [...profile.socialLinks].sort(
		(a, b) => a.position - b.position
	)

	const getSocialIcon = (title: string) => {
		const normalizedTitle = title.toLowerCase()

		if (normalizedTitle.includes('github')) {
			return <Github className="h-4 w-4" />
		} else if (
			normalizedTitle.includes('twitter') ||
			normalizedTitle.includes('x')
		) {
			return <Twitter className="h-4 w-4" />
		} else if (normalizedTitle.includes('linkedin')) {
			return <Linkedin className="h-4 w-4" />
		} else {
			return <Globe className="h-4 w-4" />
		}
	}

	return (
		<div className="container mx-auto max-w-5xl px-4">
			<div className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10">
				<div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center opacity-10"></div>
				<div className="relative z-10 flex flex-col items-center justify-center px-6 py-16 text-center md:py-24">
					<UserAvatar user={profile} size="xl" />
					<h1 className="py-2 text-3xl font-bold md:text-4xl">
						{profile.displayName}
					</h1>
					<p className="mb-4 text-lg text-muted-foreground">
						@{profile.username}
					</p>
					<div className="flex flex-wrap justify-center gap-2">
						<a
							href={`mailto:${profile.email}`}
							className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary transition-colors hover:bg-primary/20"
						>
							<Mail className="h-4 w-4" />
							{profile.email}
						</a>
					</div>
				</div>
			</div>

			<div className="grid gap-6 md:grid-cols-3">
				<div className="space-y-6 md:col-span-1">
					{sortedSocialLinks.length > 0 && (
						<Card className="overflow-hidden">
							<CardHeader className="bg-muted/50">
								<CardTitle className="text-xl">Connect</CardTitle>
								<CardDescription>
									Follow {profile.displayName} on social media
								</CardDescription>
							</CardHeader>
							<CardContent className="p-0">
								<div className="divide-y">
									{sortedSocialLinks.map(link => (
										<a
											key={link.id}
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-3 p-4 transition-colors hover:bg-muted"
										>
											<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
												{getSocialIcon(link.title)}
											</div>
											<div className="min-w-0 flex-1">
												<p className="font-medium">{link.title}</p>
												<p className="truncate text-xs text-muted-foreground">
													{link.url.replace(/^https?:\/\/(www\.)?/, '')}
												</p>
											</div>
											<ExternalLink className="h-4 w-4 text-muted-foreground" />
										</a>
									))}
								</div>
							</CardContent>
							<CardFooter className="flex justify-between border-t bg-muted/50 p-4">
								<div className="text-xs text-muted-foreground">
									Connect with {profile.displayName}
								</div>
							</CardFooter>
						</Card>
					)}

					<Card>
						<CardHeader>
							<CardTitle className="text-xl">Contact</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="flex items-center gap-3">
								<Mail className="h-5 w-5 text-muted-foreground" />
								<a
									href={`mailto:${profile.email}`}
									className="text-primary hover:underline"
								>
									{profile.email}
								</a>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="md:col-span-2">
					<Tabs defaultValue="about" className="w-full">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="about">About</TabsTrigger>
							<TabsTrigger value="details">Details</TabsTrigger>
						</TabsList>

						<TabsContent value="about" className="mt-6">
							<Card>
								<CardHeader className="pb-3">
									<CardTitle>About {profile.displayName}</CardTitle>
									<CardDescription>Bio and introduction</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="prose dark:prose-invert max-w-none">
										{profile.bio ? (
											<div className="space-y-4">
												<p className="leading-7">{profile.bio}</p>
											</div>
										) : (
											<p className="italic text-muted-foreground">
												No bio provided.
											</p>
										)}
									</div>
								</CardContent>
								<CardFooter className="flex justify-between border-t pt-6">
									<div className="text-sm text-muted-foreground">
										User since {new Date().getFullYear()}
									</div>
									<Button variant="outline" size="sm">
										Connect
									</Button>
								</CardFooter>
							</Card>
						</TabsContent>

						<TabsContent value="details" className="mt-6">
							<Card>
								<CardHeader>
									<CardTitle>User Details</CardTitle>
									<CardDescription>
										Profile information and account details
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-6">
									<div className="space-y-2">
										<h3 className="text-sm font-medium text-muted-foreground">
											Username
										</h3>
										<p className="text-lg">@{profile.username}</p>
									</div>
									<Separator />
									<div className="space-y-2">
										<h3 className="text-sm font-medium text-muted-foreground">
											Display Name
										</h3>
										<p className="text-lg">{profile.displayName}</p>
									</div>
									<Separator />
									<div className="space-y-2">
										<h3 className="text-sm font-medium text-muted-foreground">
											Email Address
										</h3>
										<p className="text-lg">{profile.email}</p>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	)
}
