import { ContentClient } from '@contember/client-content'
import { GraphQlClient } from '@contember/graphql-client'

import { MiddlewareHandler } from 'hono'

export type ContemberClientMiddlewareOptions = {
	baseUrl: string
	projectSlug: string
	token: string
}

export const contemberClient = (
	options: ContemberClientMiddlewareOptions,
): MiddlewareHandler => {
	const { baseUrl, projectSlug, token } = options

	if (!baseUrl) throw new Error(`Missing baseUrl for Contember client. Got ${baseUrl}`)
	if (!projectSlug) throw new Error(`Missing project slug for Contember client. Got ${projectSlug}`)
	if (!token) throw new Error(`Missing token for Contember client. Got ${token}`)

	const clientUrl = new URL(baseUrl)
	clientUrl.pathname = `/content/${projectSlug}/live`

	return async (c, next) => {
		const graphQlClient = new GraphQlClient(clientUrl.toString(), token)
		const client = new ContentClient(graphQlClient)

		c.set('client', client)

		await next()
	}
}
