import { ApplicationCzCreateForm } from '@app/components/forms/application-cz-create-form'
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
						Local student - Application for buddy
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="ApplicationCz" isCreating>
						<RedirectOnPersist to="applicationCzDetail(id: $entity.id)" />
						<ApplicationCzCreateForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
