import { Todo } from '@app/lib/dev'
import { FormLayout, InputField, MultiSelectField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { formatDateTime } from '@app/lib/formatting'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { formatDate } from '@app/lib/utils/formatting'
import { Component, Field, HasMany, HasOne, identityEnvironmentExtension, useEntity, useEntitySubTree, usePersist, useRedirect } from '@contember/interface'

export const ApplicationCzEditForm = Component(
	() => {
		const now = new Date().toISOString()
		const entity = useEntity()
		const persist = usePersist()
		const redirect = useRedirect()


		const handlePersist = () => {
			// check if all mandatory fields are filled
			const semester = entity.getEntity('semester').getField('name').value
			const person = entity.getEntity('person')
			const studyProgram = person?.getEntity('studyProgram').getField('name').value
			const preferredCountryOfUniversity = entity.getEntity('preferredCountry').getField('name').value
			const howManyBuddies = entity.getField<number>('howManyBuddies').value ?? 0
			const motivation = entity.getField('motivation').value ?? undefined
			const buddiesValid = howManyBuddies > 0 && howManyBuddies <= 10

			let languagesFilled = false
			for (const languageEntity of entity.getEntityList('preferredLanguages') ?? []) {
				let languageName = languageEntity.getField('name').value ?? undefined
				if (languageName) {
					languagesFilled = true
					break
				}
			}

			const gender = person?.getField('gender').value
			const preferredBuddySex = entity.getField('preferredSex').value

			if(semester && studyProgram && preferredCountryOfUniversity && motivation && languagesFilled && gender && preferredBuddySex && buddiesValid){
				persist()
				redirect('applicationCzDetail(id: $entity.id)')
			} else {
				alert('Please fill all the mandatory fields and make sure that number of buddies is between 1 and 10.')
			}

		}
	
	return (<FormLayout>
	<Slots.Actions>
		<Button onClick={handlePersist}>Save changes</Button>
	</Slots.Actions>
	<SelectField field={'semester'} label="Semester *">
		<Field field="name" />
		<div className='hidden'>
			<Field field="openForCzechBuddyRegistrationsDate" format={formatDate} />
			<Field field="closeBuddyRegistrations" format={formatDate} />
		</div>
	</SelectField>
	<div>
		<h2 className="text-xl font-semibold">Information about you</h2>
		<hr className="my-2 border-gray-200" />
	</div>
	<HasOne field="person">
		<div className='flex flex-col space-y-4'>
		<RadioEnumField
			field="gender"
			label="Your gender *"
			orientation="horizontal"
			required
			options={{ man: 'Man', woman: 'Woman', other: 'Other' }}
		/>
		<SelectField field={'studyProgram'} label="Study program *" options={'StudyProgram'} description="If you are studying a program in Czech language, select 'Czech program'.">
			<Field field={'name'} />
		</SelectField>
		</div>
	</HasOne>
	<div>
		<h2 className="text-xl font-semibold">Application details</h2>
		<hr className="my-2 border-gray-200" />
	</div>
	<div className='flex flex-col space-y-4'>
		<TextareaField field="motivation" label="Motivation *" inputProps={{maxLength: 500}} description="Please describe why you want to be a buddy. Max length is 500 characters." />
		<InputField field="howManyBuddies" label="Number of buddies *" description="How many buddies could you take care of at most?" required />
		<SelectField
			field="preferredCountry"
			label="Preferred university country of your buddy *"
			options="Country"
		>
			<Field field="name" />
		</SelectField>
		<MultiSelectField field="preferredLanguages" label="Preferred languages of your buddy *">
			<Field field="name" />
		</MultiSelectField>
		<RadioEnumField
			field="preferredSex"
			required
			label="Preferred gender"
			orientation="horizontal"
			options={{ man: 'Man', woman: 'Woman', dontCare: 'Not preferred' }}
		/>
	</div>
	</FormLayout>)
}, () => (
	<>
		<HasOne field="semester">
			<Field field="name" />
			<Field field="openForCzechBuddyRegistrationsDate" format={formatDate} />
			<Field field="closeBuddyRegistrations" format={formatDate} />
		</HasOne>
		<HasOne field="person">
			<Field field="gender" />
			<Field field="firstName" />
			<Field field="surname" />
			<HasOne field="studyProgram">
				<Field field="name" />
			</HasOne>
		</HasOne>
		<Field field="motivation" />
		<Field field="howManyBuddies" />
		<HasMany field="preferredLanguages">
			<Field field="name" />
		</HasMany>
		<Field field="preferredSex" />
		<HasOne field="preferredCountry">
			<Field field="name" />
		</HasOne>
	</>
)
)