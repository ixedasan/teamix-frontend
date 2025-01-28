import type { Metadata } from 'next'

import PaymentSuccess from '@/components/features/project/settings/plan/PaymentSuccess'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Success',
	...NO_INDEX_PAGE
}

export default async function Page() {
	return <PaymentSuccess />
}
