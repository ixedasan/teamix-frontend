import { CircleHelp } from 'lucide-react'

import { ChromeIcon } from '@/components/ui/icons/ChromeIcon'
import { EdgeIcon } from '@/components/ui/icons/EdgeIcon'
import { FirefoxIcon } from '@/components/ui/icons/FirefoxIcon'
import { OperaIcon } from '@/components/ui/icons/OperaIcon'
import { SafariIcon } from '@/components/ui/icons/SafariIcon'

export function getBrowserIcon(browser: string) {
	switch (browser.toLowerCase()) {
		case 'chrome':
			return ChromeIcon
		case 'firefox':
			return FirefoxIcon
		case 'safari':
			return SafariIcon
		case 'edge':
			return EdgeIcon
		case 'microsoft edge':
			return EdgeIcon
		case 'opera':
			return OperaIcon
		default:
			return CircleHelp
	}
}
