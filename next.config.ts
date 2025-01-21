import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

import { MEDIA_PATHNAME } from '@/constants/url.constants'

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts')

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3000'
			},
			{
				protocol: 'https',
				hostname: MEDIA_PATHNAME
			}
		]
	}
}

export default withNextIntl(nextConfig)
