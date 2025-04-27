import { useEffect } from 'react'
import { HasRole, useProjectUserRoles, useRedirect } from '@contember/interface'
import { Binding } from '@app/lib/binding'
import { InitialUserForm } from '@app/components/initialUserForm'
import InitialUserPage from './initialUserPage'
import EventFeed from './eventFeed'
import BuddyPairs from './buddyPairs'
import Dashboard from './dashboard'

export default () => {
	const redirect = useRedirect()
	const roles = useProjectUserRoles()

	useEffect(() => {
		}, [redirect])

		return (
			<>
				<HasRole role={'ozsRole'}>
					<BuddyPairs />
				</HasRole>
				<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('internationalStudent') || roles.has('czechBuddy') || roles.has('esnMember')}>
					<Dashboard />
				</HasRole>
			</>
		)
}
