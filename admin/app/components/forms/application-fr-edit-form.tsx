import { Todo } from '@app/lib/dev'
import { FormLayout, InputField, MultiSelectField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { Component, EntityListSubTree, EntitySubTree, Environment, Field, HasMany, HasOne, identityEnvironmentExtension, RedirectOnPersist, useEntity, useEntityListSubTree, useEntitySubTree, useEnvironment, usePersist, useRedirect } from '@contember/interface'
import { useIdentity } from '@contember/admin'
import { ConnectUser } from '../ConnectUser'
import { ConnectEntity } from '../ConnectEntity'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'


export const ApplicationFrEditForm = Component(
	() => {
		const persist = usePersist()
		const entity = useEntity()
		const redirect = useRedirect()

		const handlePersist = () => {
			// check if all mandatory fields are filled
			const semester = entity.getEntity('semester').getField('name').value
			const person = entity.getEntity('person')
			const studyProgram = person?.getEntity('studyProgram').getField('name').value
			const countryOfUniversity = person?.getEntity('countryOfUniversity').getField('name').value
			let languagesFilled = false
			for (const languageEntity of person?.getEntityList('languages') ?? []) {
				let languageName = languageEntity.getField('name').value ?? undefined
				if (languageName) {
					languagesFilled = true
					break
				}
			}

			const gender = person?.getField('gender').value
			const preferredBuddySex = entity.getField('preferredBuddySex').value

			if(semester && studyProgram && countryOfUniversity && languagesFilled && gender && preferredBuddySex){
				persist()
				redirect(`applicationFrDetail(id : $entity.id)`)
			} else {
				alert('Please fill all the mandatory fields.')
			}

		}

	return (
	<>
		<Slots.Actions>
			<Button onClick={handlePersist}>Save</Button>
		</Slots.Actions>
		<FormLayout>
			<SelectField
				field="semester"
				label="Semester"
				options="Semester"
			>
				<Field field="name" />
			</SelectField>
			<div>
				<h2 className="text-xl font-semibold">Information about you</h2>
				<hr className="my-2 border-gray-200" />
			</div>
			<div className='flex flex-col space-y-4'>
				<HasOne field={'person'}>
						<RadioEnumField
							field="gender"
							label="Your gender *"
							orientation="horizontal"
							required
							options={{ man: 'Man', woman: 'Woman', other: 'Other' }}
						/>
						<SelectField field={'studyProgram'} label="Study program *" options={'StudyProgram'}>
							<Field field={'name'} />
						</SelectField>
						<SelectField field={'countryOfUniversity'} label="Home university country *" options={'Country'} description="Country where you attend university.">
							<Field field={'name'} />
						</SelectField>
						<MultiSelectField field="languages" label="Languages spoken *">
							<Field field="name" />
						</MultiSelectField>
				</HasOne>
			</div>
			<div>
				<h2 className="text-xl font-semibold">Application details</h2>
				<hr className="my-2 border-gray-200" />
			</div>
			<div className='flex flex-col space-y-4'>
				<RadioEnumField
					field="preferredBuddySex"
					required
					label="Preferred gender of your buddy *"
					orientation="horizontal"
					options={{ man: 'Man', woman: 'Woman', dontCare: 'Not preferred' }}
				/>
			</div>
			</FormLayout>
		</>)
	}, () => (
		<>
			<HasOne field={'semester'}>
				<Field field="name" />
			</HasOne>
			<HasOne field={'person'}>
				<Field field="firstName" />
				<Field field="surname" />
				<Field field="gender" />
				<Field field="studyProgram.name" />
				<Field field="countryOfUniversity.name" />
				<HasMany field="languages">
					<Field field="name" />
				</HasMany>
			</HasOne>
			<Field field="preferredBuddySex" />
		</>
	)
)
