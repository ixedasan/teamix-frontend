import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { DocumentsPage } from "@/components/features/document/DocumentsPage"

export const metadata: Metadata = {
	title: 'Docs',
	...NO_INDEX_PAGE
}

export default async function DocsPage() {
	return <DocumentsPage />
}
