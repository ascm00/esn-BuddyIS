import { ContemberClientProps } from '@contember/react-client'

const apiBaseUrl = import.meta.env.VITE_CONTEMBER_ADMIN_API_BASE_URL
const adminInviteToken = import.meta.env.VITE_CONTEMBER_ADMIN_INVITE_TOKEN
const projectName = import.meta.env.VITE_CONTEMBER_ADMIN_PROJECT_NAME
const baseUrl = import.meta.env.BASE_URL
const sessionToken = import.meta.env.VITE_CONTEMBER_ADMIN_SESSION_TOKEN
const publicToken = import.meta.env.VITE_CONTEMBER_PUBLIC_TOKEN
const signupToken = import.meta.env.VITE_CONTEMBER_SIGNUP_TOKEN
const adminWebUrl = import.meta.env.VITE_CONTEMBER_ADMIN_WEB_URL
const loginToken = import.meta.env.VITE_CONTEMBER_ADMIN_LOGIN_TOKEN
const appUrl = import.meta.env.VITE_APP_URL

export default {
    apiBaseUrl,
    appUrl,
    publicToken,
    adminInviteToken,
    projectName,
    baseUrl,
	signupToken,
    sessionToken,
    adminWebUrl,
    loginToken,
    stage: 'live',
}

export const entrypointConfig = (() => {
	const apiBaseUrl = import.meta.env.VITE_CONTEMBER_ADMIN_API_BASE_URL
	const loginToken = import.meta.env.VITE_CONTEMBER_ADMIN_LOGIN_TOKEN
	const signupToken = import.meta.env.VITE_CONTEMBER_SIGNUP_TOKEN
	if (!apiBaseUrl) {
		throw new Error('VITE_CONTEMBER_ADMIN_API_BASE_URL is not set')
	}
	if (!loginToken) {
		throw new Error('VITE_CONTEMBER_ADMIN_LOGIN_TOKEN is not set')
	}
	return {
		clientConfig: {
			apiBaseUrl: apiBaseUrl,
			loginToken: loginToken,
		} satisfies ContemberClientProps,
		appUrl: '/app',
		hasTokenFromEnv: import.meta.env.VITE_CONTEMBER_ADMIN_SESSION_TOKEN !== '__SESSION_TOKEN__',
		idps: {
		// You can add more IDPs here
		// 	google: 'Login with Google',
		} satisfies Record<string, string>,
		magicLink: false,
	}
})()

