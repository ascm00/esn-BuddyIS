import config from '../../../config'
import { Env } from '../types'

export async function contentClient<T>(env: Env, query: {
	query: string,
	variables?: Record<string, any>
}, token?: string) {
	try {
		let url: URL
		//has to be changed for microsoft azure production
		if(env.VITE_CONTEMBER_ADMIN_API_BASE_URL === '/_api') {
			url = new URL('https://esn-buddy-is.eu.contember.cloud/_api')
		} else {
			url = new URL(env.VITE_CONTEMBER_ADMIN_API_BASE_URL)
		}
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
	let url: URL
	//has to be changed for microsoft azure production
	if(env.VITE_CONTEMBER_ADMIN_API_BASE_URL === '/_api') {
		// url = new URL('https://esn-buddy-is.eu.contember.cloud/_api')
		url = new URL('https://api-esn-buddy-is.eu.contember.cloud/tenant')
	} else {
		url = new URL(env.VITE_CONTEMBER_ADMIN_API_BASE_URL)
	}
	//url.pathname = '/tenant'

	return fetch(url.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token ?? env.VITE_CONTEMBER_ADMIN_INVITE_TOKEN}`,
		},
		body: JSON.stringify(query),
	})
}
