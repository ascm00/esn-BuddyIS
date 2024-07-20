import { ApplicationCzEditForm } from '@app/components/forms/application-cz-edit-form'
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
						Application cz edit
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="ApplicationCz(id=$id)" isCreating={false}>
						<Slots.Actions>
							<PersistButton />
						</Slots.Actions>
						<ApplicationCzEditForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
