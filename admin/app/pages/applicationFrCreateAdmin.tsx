import { ApplicationFrFormAdmin } from '@app/components/forms/application-fr-admin-form'
import { ApplicationFrCreateForm } from '@app/components/forms/application-fr-create-form'
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
						Foreign student - Application for buddy
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="ApplicationFr" isCreating>
						<RedirectOnPersist to="applicationFrDetail(id: $entity.id)" />
						{/* <Slots.Actions>
							<PersistButton />
						</Slots.Actions> */}
						<ApplicationFrFormAdmin />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
