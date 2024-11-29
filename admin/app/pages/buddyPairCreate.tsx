import { BuddyPairCreateForm } from '@app/components/forms/buddy-pair-create-form'
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
						Buddy pair create 🤝
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="BuddyPair" isCreating>
						<RedirectOnPersist to="buddyPairDetail(id: $entity.id)" />
						<Slots.Actions>
							<PersistButton label="Create buddy pair" />
						</Slots.Actions>
						<BuddyPairCreateForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}