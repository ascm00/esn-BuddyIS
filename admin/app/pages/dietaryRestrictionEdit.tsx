
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
						Dietary restriction edit
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="DietaryRestrictions(id=$id)">
						<RedirectOnPersist to="dietaryRestrictions" />
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
