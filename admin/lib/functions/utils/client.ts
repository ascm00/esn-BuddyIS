import config from '../../../config'
import { Env } from '../types'

export async function contentClient<T>(env: Env, query: {
	query: string,
	variables?: Record<string, any>
}, token?: string) {
	try {
		const url = new URL(env.VITE_CONTEMBER_ADMIN_API_BASE_URL)
		url.pathname = `/content/${env.VITE_CONTEMBER_ADMIN_PROJECT_NAME}/live`

		const response = await fetch(url.toString(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token ?? env.VITE_CONTEMBER_PUBLIC_TOKEN}`,
				// Authorization: `Bearer 0000000000000000000000000000000000000000`,
			},
			body: JSON.stringify(query),
		})

		if (!response.ok) {
			console.error({ url: response.url, status: response.status, statusText: response.statusText, body: await response.text() })
			return response
		}

		return await response.json()

	} catch (error) {
		console.error(error)
	}
}

export const tenantClient = (env: Env, query: { query: string, variables?: Record<string, any> }, token?: string) => {
	console.log(env.VITE_CONTEMBER_ADMIN_API_BASE_URL)
	const url = new URL(env.VITE_CONTEMBER_ADMIN_API_BASE_URL)
	url.pathname = '/tenant'
	console.log('url', url.toString())

	return fetch(url.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token ?? env.VITE_CONTEMBER_ADMIN_INVITE_TOKEN}`,
			// Authorization: `Bearer 0000000000000000000000000000000000000000`
		},
		body: JSON.stringify(query),
	})
}
