import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { LoginAccountForm } from '@/components/features/auth/forms/LoginAccountForm'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('auth.login')

	return {
		title: t('head')
	}
}

export default function LoginPage() {
	return <LoginAccountForm />
}
