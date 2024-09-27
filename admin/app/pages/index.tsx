import { useEffect } from 'react'
import { useProjectUserRoles, useRedirect } from '@contember/interface'
import { Binding } from '@app/lib/binding'
import { InitialUserForm } from '@app/components/initialUserForm'
import InitialUserPage from './initialUserPage'
import EventFeed from './eventFeed'

export default () => {
	const redirect = useRedirect()
	const roles = useProjectUserRoles()

	useEffect(() => {
		}, [redirect])

		return (
			<>
				<EventFeed />
			</>
		)
}
