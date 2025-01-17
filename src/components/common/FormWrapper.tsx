import type { PropsWithChildren } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'

interface IFormWrapper {
	heading: string
}

export function FormWrapper({
	children,
	heading
}: PropsWithChildren<IFormWrapper>) {
	return (
		<Card>
			<CardHeader className="p-4">
				<CardTitle className="text-lg">{heading}</CardTitle>
				<CardContent className="p-0">{children}</CardContent>
			</CardHeader>
		</Card>
	)
}
