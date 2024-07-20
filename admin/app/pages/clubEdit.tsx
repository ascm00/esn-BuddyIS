import { ClubEditForm } from '@app/components/forms/club-edit-form'
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
						Club edit
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Club(id=$id)" isCreating={false}>
						<Slots.Actions>
							<PersistButton />
						</Slots.Actions>
						<ClubEditForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
