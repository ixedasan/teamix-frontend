import { redirect } from 'next/navigation'
import { VerifyAccauntForm } from '@/components/features/auth/forms/VerifyAccauntForm'

export default async function VerifyAccountPage(props: {
	searchParams: Promise<{ token: string }>
}) {
	const searchParams = await props.searchParams

	if (!searchParams.token) redirect('/account/create')

	return <VerifyAccauntForm />
}
