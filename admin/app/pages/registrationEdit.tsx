import { EntitySubTree } from '@contember/interface'
import { Binding, PersistButton } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { RegistrationEditForm } from '@app/components/forms/registration-create-form'

export default () => {
	return (
		<>
			<Binding>
				<Slots.Title>
					Edit registration
				</Slots.Title>
				<Slots.Back>
					<BackButton />
				</Slots.Back>
				<EntitySubTree entity="EventRegistration(id=$id)" isCreating={false}>
					<Slots.Actions>
						<PersistButton  />
					</Slots.Actions>
					<RegistrationEditForm />
				</EntitySubTree>
			</Binding>
		</>
	)
}