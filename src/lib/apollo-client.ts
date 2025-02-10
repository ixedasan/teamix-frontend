import { ApolloClient, InMemoryCache, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { createClient } from 'graphql-ws'

import { SERVER_URL, WEBSOCKET_URL } from '../constants/url.constants'

const httpLink = createUploadLink({
	uri: SERVER_URL,
	credentials: 'include',
	headers: {
		'apollo-require-preflight': 'true'
	}
})

const wsLink =
	typeof window !== 'undefined'
		? new GraphQLWsLink(
				createClient({
					url: WEBSOCKET_URL
				})
			)
		: null

const splitLink =
	typeof window !== 'undefined' && wsLink != null
		? split(
				({ query }) => {
					const definition = getMainDefinition(query)
					return (
						definition.kind === 'OperationDefinition' &&
						definition.operation === 'subscription'
					)
				},
				wsLink,
				httpLink
			)
		: httpLink

export const client = new ApolloClient({
	link: splitLink,
	cache: new InMemoryCache()
})
