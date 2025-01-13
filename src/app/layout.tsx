import ApolloClientProvider from '@/providers/ApolloClientProvider'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Geist, Geist_Mono } from 'next/font/google'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const locale = await getLocale()
	const messages = await getMessages()

	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ApolloClientProvider>
					<NextIntlClientProvider messages={messages}>
						{children}
					</NextIntlClientProvider>
				</ApolloClientProvider>
			</body>
		</html>
	)
}
