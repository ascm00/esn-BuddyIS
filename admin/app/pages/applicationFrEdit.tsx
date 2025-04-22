import { ApplicationFrCreateForm } from '@app/components/forms/application-fr-create-form'
import { ApplicationFrEditForm } from '@app/components/forms/application-fr-edit-form'
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
						Foreign student - Application for buddy edit
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="ApplicationFr(id=$id)" isCreating={false}>
						{/* <Slots.Actions>
							<PersistButton />
						</Slots.Actions> */}
						<ApplicationFrEditForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
