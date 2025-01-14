import type { Metadata } from 'next'
import { CreateAccauntForm } from '@/components/features/auth/forms/CreateAccauntForm'

export const metadata: Metadata = {
	title: 'Accaunt create'
}

export default function CreateAccauntPage() {
	return <CreateAccauntForm />
}
