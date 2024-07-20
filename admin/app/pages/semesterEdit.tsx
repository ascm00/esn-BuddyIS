import { SemesterEditForm } from '@app/components/forms/semester-edit-form'
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
						Semester edit
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Semester(id=$id)" isCreating={false}>
						<Slots.Actions>
							<PersistButton />
						</Slots.Actions>
						<SemesterEditForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
