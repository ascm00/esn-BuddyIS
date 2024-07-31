import { UserEditForm } from '@app/components/forms/user-edit-form'
import { InitialUserForm } from '@app/components/initialUserForm'
import { Binding, PersistButton } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { EntitySubTree } from '@contember/interface'

export default () => {
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
					<InitialUserForm />
				</div>
			</Binding>
		</>
	)
}