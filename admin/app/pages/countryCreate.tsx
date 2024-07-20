import { CountryCreateForm } from '@app/components/forms/country-create-form'
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
						Country create
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Country" isCreating>
						<RedirectOnPersist to="countryDetail(id: $entity.id)" />
						<Slots.Actions>
							<PersistButton />
						</Slots.Actions>
						<CountryCreateForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
