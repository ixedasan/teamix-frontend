'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'

const Page = () => {
	const t = useTranslations('home')
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-2">
			<h1 className="text-4xl font-bold underline">{t('test')}</h1>
			<Button> Test button</Button>
		</div>
	)
}
export default Page
