import { useEffect } from 'react'
import { HasRole, Link, useProjectUserRoles, useRedirect } from '@contember/interface'
import { Binding } from '@app/lib/binding'
import { InitialUserForm } from '@app/components/initialUserForm'
import InitialUserPage from './initialUserPage'
import EventFeed from './eventFeed'
import BuddyPairs from './buddyPairs'
import Dashboard from './dashboard'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { PlusCircle } from 'lucide-react'
import { useIsMobile } from '@app/lib/utils/use-mobile'

export default () => {
	const redirect = useRedirect()
	const roles = useProjectUserRoles()
	const isMobile = useIsMobile()

	useEffect(() => {
		}, [redirect])

		return (
			<>
				<HasRole role={'ozsRole'}>
					<BuddyPairs />
				</HasRole>
				<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('internationalStudent') || roles.has('czechBuddy') || roles.has('esnMember')}>
					<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
              			<Slots.Actions>
							<Link to="eventCreate">
								<Button>
									{!isMobile && 'Create event'}
									{isMobile && <PlusCircle />}
								</Button>
							</Link>
						</Slots.Actions>
          			</HasRole>
					<Dashboard />
				</HasRole>
			</>
		)
}
