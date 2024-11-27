const apiBaseUrl = import.meta.env.VITE_CONTEMBER_ADMIN_API_BASE_URL
const adminInviteToken = import.meta.env.VITE_CONTEMBER_ADMIN_INVITE_TOKEN
const projectName = import.meta.env.VITE_CONTEMBER_ADMIN_PROJECT_NAME
const baseUrl = import.meta.env.BASE_URL
const sessionToken = import.meta.env.VITE_CONTEMBER_ADMIN_SESSION_TOKEN
const publicToken = import.meta.env.VITE_CONTEMBER_PUBLIC_TOKEN
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
    sessionToken,
    adminWebUrl,
    loginToken,
    stage: 'live',
}