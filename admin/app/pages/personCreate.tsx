import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import {EntitySubTree, RedirectOnPersist} from "@contember/interface";
import {PersonForm} from "@app/components/forms/personForm";

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>Nový uživatel</Slots.Title>
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
