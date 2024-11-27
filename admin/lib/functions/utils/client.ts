import config from '../../../config'
import { Env } from '../types'

export async function contentClient<T>(env: Env, query: {
	query: string,
	variables?: Record<string, any>
}, token?: string) {
	try {
		// const url = new URL(import.meta.env.VITE_CONTEMBER_CONTENT_API_URL as string)
		let url : URL
		if(import.meta.env.DEV === true){
			url = new URL(env.VITE_CONTEMBER_ADMIN_API_BASE_URL)
			url.pathname = `/content/${env.VITE_CONTEMBER_ADMIN_PROJECT_NAME}/live`
		} else {
			url = new URL(import.meta.env.VITE_CONTEMBER_CONTENT_API_URL as string)
		}

		const response = await fetch(url.toString(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token ?? env.VITE_CONTEMBER_PUBLIC_TOKEN}`,
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
	let url = new URL(env.VITE_CONTEMBER_ADMIN_API_BASE_URL)
	if(import.meta.env.DEV === true){
		url.pathname = `/tenant`
	}

	return fetch(url.toString(), {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token ?? env.VITE_CONTEMBER_ADMIN_INVITE_TOKEN}`,
		},
		body: JSON.stringify(query),
	})
}
