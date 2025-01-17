'use client'

import type { PropsWithChildren } from 'react'
import { ApolloProvider } from '@apollo/client'

import { client } from '@/lib/apollo-client'

export default function ApolloClientProvider({
	children
}: PropsWithChildren<unknown>) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>
}
