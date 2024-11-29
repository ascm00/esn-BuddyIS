import { PersonForm } from '@app/components/forms/personForm'
import { UserEditForm } from '@app/components/forms/user-edit-form'
import { PersonInvite } from '@app/components/personInvite'
import { Binding, PersistButton } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { EntitySubTree, RedirectOnPersist } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						User edit 👤
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Person(id=$id)" isCreating={false}>
						<PersonForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
