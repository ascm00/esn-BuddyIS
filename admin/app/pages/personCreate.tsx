import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import {EntitySubTree, Field, RedirectOnPersist, StaticRender} from "@contember/interface";
import {PersonForm} from "@app/components/forms/personForm";
import { InitialUserForm } from '@app/components/initialUserForm'

export default () => {
	return (
		<>
			<Binding>
				{/* <InitialUserForm /> */}
				<div className="flex flex-col gap-12">
					<Slots.Title>New user</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Person" isCreating>
						<RedirectOnPersist to="userDetail(id: $entity.id)" />
						<PersonForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
