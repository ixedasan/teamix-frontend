import type { Metadata } from 'next'

import { DocumentEditor } from '@/components/features/document/editor/DocumentEditor'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Document',
	...NO_INDEX_PAGE
}

export default async function Page() {
	return <DocumentEditor />
}
