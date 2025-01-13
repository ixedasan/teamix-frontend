'use client'

import { useTranslations } from 'next-intl'
import ThemeSwitcher from '@/components/common/ThemeSwitcher'

const Page = () => {
	const t = useTranslations('home')
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-2">
			<h1 className="text-4xl font-bold underline">{t('test')}</h1>
			<ThemeSwitcher />
		</div>
	)
}
export default Page
