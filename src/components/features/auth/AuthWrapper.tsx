import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { Logo } from '@/components/common/Logo'
import { Button } from '@/components/ui/Button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/Card'

interface IAuthWrapper {
	heading: string
	backButtonLabel?: string
	backButtonHref?: string
}

export function AuthWrapper({
	children,
	heading,
	backButtonHref,
	backButtonLabel
}: PropsWithChildren<IAuthWrapper>) {
	return (
		<div className="flex h-full items-center justify-center">
			<Card className="w-[450px]">
				<CardHeader className="flex-col items-center justify-center gap-y-4">
					<Logo />
					<CardTitle>{heading}</CardTitle>
				</CardHeader>
				<CardContent>{children}</CardContent>
				<CardFooter className="-mt-2">
					{backButtonLabel && backButtonHref && (
						<Link href={backButtonHref} className="w-full">
							<Button variant="ghost" className="w-full">
								{backButtonLabel}
							</Button>
						</Link>
					)}
				</CardFooter>
			</Card>
		</div>
	)
}
