import { useChangeMyProfile } from './useChangeMyProfile'
import { useSessionToken } from './useCreateSessionToken'

export function useChangeEmail() {
	const sessionToken = useSessionToken()
	const changeMyProfile = useChangeMyProfile()

	return async ({ email, newEmail }: { email: string; newEmail: string }) => {
		let sessionTokenResult: any

		try {
			sessionTokenResult = await sessionToken({ email })
		} catch (e) {
			console.error(e)
		}

		if (sessionTokenResult && !sessionTokenResult.ok) {
			return console.error(sessionTokenResult.error)
		}

		// return changeMyProfile({ email: newEmail }, { apiToken: sessionTokenResult ? sessionTokenResult.result.token : undefined })
        return changeMyProfile({ email: newEmail })
	}
}