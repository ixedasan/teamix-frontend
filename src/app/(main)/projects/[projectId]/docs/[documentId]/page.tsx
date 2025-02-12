import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Document',
	...NO_INDEX_PAGE
}

export default async function Page() {
	return <div></div>
}
