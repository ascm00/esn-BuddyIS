import { GQLVariable, useSingleTenantMutation } from '@contember/admin'

const CHANGE_MY_PROFILE = `
changeMyProfile(email: $email) {
	ok
	error {
        code
        developerMessage
	}
}
`

const changeMyProfileVariables = {
	email: GQLVariable.Required(GQLVariable.String),
}

export type ChangeMyProfileErrorCodes = 'NOT_A_PERSON' | 'INVALID_EMAIL_FORMAT' | 'EMAIL_ALREADY_EXISTS'

export const useChangeMyProfile = () => {
	return useSingleTenantMutation<undefined, ChangeMyProfileErrorCodes, typeof changeMyProfileVariables>(
		CHANGE_MY_PROFILE,
		changeMyProfileVariables,
	)
}