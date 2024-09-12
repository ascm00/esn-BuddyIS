import { FacultyEditForm } from '@app/components/forms/faculty-edit-form'
import { StudyProgramForm } from '@app/components/forms/study-program-form'
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
						Study program edit
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="StudyProgram(id=$id)" isCreating={false}>
						<Slots.Actions>
							<PersistButton />
						</Slots.Actions>
						<StudyProgramForm />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
