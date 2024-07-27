import { UserCreateForm } from '@app/components/forms/user-create-form'
import { Binding, PersistButton } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { InviteFormFields } from '@app/lib/tenant'
import { EntitySubTree, InviteForm, RedirectOnPersist } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						User create
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="User" isCreating>
						<RedirectOnPersist to="userDetail(id: $entity.id)" />
						<Slots.Actions>
							<PersistButton />
						</Slots.Actions>
						<UserCreateForm />		
						</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
