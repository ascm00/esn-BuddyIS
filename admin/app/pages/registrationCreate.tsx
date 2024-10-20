import { EventCreateForm } from '@app/components/forms/event-create-form'
import { RegistrationCreateForm } from '@app/components/forms/registration-create-form'
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
						Registration
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="EventRegistration" isCreating>
						<Slots.Actions>
							<PersistButton />
						</Slots.Actions>
						<RegistrationCreateForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
