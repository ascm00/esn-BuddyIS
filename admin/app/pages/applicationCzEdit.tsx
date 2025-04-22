import { ApplicationCzCreateForm } from '@app/components/forms/application-cz-create-form'
import { ApplicationCzEditForm } from '@app/components/forms/application-cz-edit-form'
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
						Local student - Application for buddy edit
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="ApplicationCz(id=$id)">
						<RedirectOnPersist to="applicationCzDetail(id: $entity.id)" />
						<ApplicationCzEditForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
