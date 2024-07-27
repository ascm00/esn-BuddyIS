import { GQLVariable, useSingleTenantMutation } from '@contember/admin'

const CREATE_SESSION_TOKEN = `
createSessionToken(email: $email, expiration: 2000) {
	ok
    error {
        code
        developerMessage
    }
    result {
        person {
            email
        }
        token
	}
}
`

const createSessionToken = {
	email: GQLVariable.Required(GQLVariable.String),
}

export type CreateSessionTokenErrorCodes = 'UNKNOWN_EMAIL' | 'UNKNOWN_PERSON_ID' | 'PERSON_DISABLED'

export const useSessionToken = () => {
	return useSingleTenantMutation<{ person: { email: string; }; token: string; }, CreateSessionTokenErrorCodes, typeof createSessionToken>(
		CREATE_SESSION_TOKEN,
		createSessionToken,
	)
}