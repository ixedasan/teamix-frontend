import type { Metadata } from 'next'

import { ContactSales } from '@/components/features/contact-sales/ContactSales'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Contact Sales',
	...NO_INDEX_PAGE
}

export default function ContactSalesPage() {
	return <ContactSales />
}
