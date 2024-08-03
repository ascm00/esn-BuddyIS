import { EventCreateForm } from '@app/components/forms/event-create-form'
import { UserEditForm } from '@app/components/forms/user-edit-form'
import { InitialUserForm } from '@app/components/initialUserForm'
import { Binding, PersistButton } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { EntitySubTree, identityEnvironmentExtension, RedirectOnPersist, useIdentity } from '@contember/interface'


export default () => {
		const identity = useIdentity()
        const personId = identity?.person?.id

	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Create user
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity={`Person(tenantPerson.id = '${personId}')`} isCreating={false}>
                        <RedirectOnPersist to="events" />
							<Slots.Actions>
								<PersistButton />
							</Slots.Actions>
							<UserEditForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)

}
