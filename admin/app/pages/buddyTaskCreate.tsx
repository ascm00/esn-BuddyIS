import { BuddyTaskCreateForm } from '@app/components/forms/buddy-task-create-form'
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
						Buddy task create 📝
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="BuddyTask" isCreating>
						<RedirectOnPersist to="buddyTaskDetail(id: $entity.id)" />
						<Slots.Actions>
							<PersistButton />
						</Slots.Actions>
						<BuddyTaskCreateForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
