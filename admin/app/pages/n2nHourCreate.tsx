import { N2nHourCreateForm } from '@app/components/forms/n2n-hour-create-form'
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
						N2n hour create 🎉
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="N2nHour" isCreating>
						<RedirectOnPersist to="n2nHourDetail(id: $entity.id)" />
						<Slots.Actions>
							<PersistButton />
						</Slots.Actions>
						<N2nHourCreateForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
