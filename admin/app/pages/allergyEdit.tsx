import { DietaryRestrictionAllergyForm } from '@app/components/forms/dietary-restriction-allergy-form'
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
						Allergy edit
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Allergy(id=$id)">
						<RedirectOnPersist to="allergies" />
						<Slots.Actions>
							<PersistButton />
						</Slots.Actions>
						<DietaryRestrictionAllergyForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
