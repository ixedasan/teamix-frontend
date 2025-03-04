import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProfileRoot } from '@/components/features/profile/ProfileRoot'
import {
	FindProfileBySlugDocument,
	FindProfileBySlugQuery
} from '@/graphql/generated/output'
import { getMediaSource } from '@/utils/get-media-source'
import { SERVER_URL } from '@/constants/url.constants'

async function findProfileBySlug(params: { slug: string }) {
	try {
		const query = FindProfileBySlugDocument.loc?.source.body
		const variables = { slug: params.slug }

		const response = await fetch(SERVER_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query, variables }),
			next: {
				revalidate: 30
			}
		})

		const data = await response.json()

		return {
			profile: data.data
				.findProfileBySlug as FindProfileBySlugQuery['findProfileBySlug']
		}
	} catch {
		notFound()
	}
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const params = await props.params
	const { profile } = await findProfileBySlug({ slug: params.slug })

	return {
		title: profile.displayName,
		description: profile.bio ?? profile.displayName,
		openGraph: {
			images: [
				{
					url: getMediaSource(profile.avatar),
					alt: profile.displayName
				}
			]
		}
	}
}

export default async function ProfilePage(props: {
	params: Promise<{ slug: string }>
}) {
	const params = await props.params
	const { profile } = await findProfileBySlug({ slug: params.slug })

	return <ProfileRoot profile={profile} />
}
