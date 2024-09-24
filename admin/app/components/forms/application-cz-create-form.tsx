import { Todo } from '@app/lib/dev'
import { FormLayout, InputField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { formatDateTime } from '@app/lib/formatting'
import { formatDate } from '@app/lib/utils/formatting'
import { Component, EntitySubTree, Field, HasOne, identityEnvironmentExtension, useEntity, useEntitySubTree } from '@contember/interface'

export const ApplicationCzCreateForm = Component(
	() => {

		const entity = useEntity()
		const me = useEntitySubTree('me')
		entity.connectEntityAtField('person', me)
		const now = new Date().toISOString()
		console.log(now)
	
	return (<FormLayout>
	<Todo>Semestr by měla aplikace znát automaticky a měl by se k přihlášce automaticky přiřadit. Potřeba checkovat, jestli už se na buddyho daný semestr hlásil</Todo>
	<SelectField
		field="semester"
		label="Semester"
		options={`Semester[openForCzechBuddyRegistrationsDate <= "${now}" && closeBuddyRegistrations >= "${now}"]`}
	>
		<Field field="name" /> {' ('}
		<Field field={'openForCzechBuddyRegistrationsDate'} format={formatDate}/> {' - '}
		<Field field={'closeBuddyRegistrations'} format={formatDate} /> {')'}
	</SelectField>
	<div>
		<h2 className="text-xl font-semibold">Information about you</h2>
		<hr className="my-2 border-gray-200" />
	</div>
	<HasOne field="person">
		<div className='flex flex-col space-y-4'>
		<RadioEnumField
			field="gender"
			label="Your gender"
			orientation="horizontal"
			required
			options={{ man: 'Man', woman: 'Woman', other: 'Other' }}
		/>
		<SelectField field={'studyProgram'} label="Study program" options={'StudyProgram'}>
			<Field field={'name'} />
		</SelectField>
		<SelectField field={'university'} label="University" options={'University'} description="Your home university">
			<Field field={'name'} />
		</SelectField>
		<SelectField field={'faculty'} label="Faculty at VSE" options={'Faculty'}>
			<Field field={'name'} />
		</SelectField>
		</div>
	</HasOne>
	<div>
		<h2 className="text-xl font-semibold">Application details</h2>
		<hr className="my-2 border-gray-200" />
	</div>
	<div className='flex flex-col space-y-4'>
		<TextareaField field="motivation" label="Motivation" />
		<SelectField
			field="preferredCountry"
			label="Preferred country"
			description="Where would you like your buddy to come from?"
			// createNewForm={<>
			// 	<InputField field="name" label="Name" required />
			// </>}
			options="Country"
		>
			<Field field="name" />
		</SelectField>
		<RadioEnumField
			field="preferredSex"
			required
			label="Preferred gender"
			orientation="horizontal"
			options={{ man: 'Man', woman: 'Woman', dontCare: 'Don\'t care' }}
		/>
	</div>
	</FormLayout>)
}, (_, env) => (
	<>
		<EntitySubTree
				entity={`Person(tenantPerson.id='${env.getExtension(identityEnvironmentExtension).identity?.person?.id}')`}
				alias="me"
			>
				<Field field="gender" />
				<HasOne field="studyProgram">
					<Field field="name" />
				</HasOne>
				<HasOne field="university">
					<Field field="name" />
				</HasOne>
				<HasOne field="faculty">
					<Field field="name" />
				</HasOne>
			</EntitySubTree>
			<HasOne field="person">
				<Field field="gender" />
				<HasOne field="studyProgram">
					<Field field="name" />
				</HasOne>
				<HasOne field="university">
					<Field field="name" />
				</HasOne>
				<HasOne field="faculty">
					<Field field="name" />
				</HasOne>
			</HasOne>
			<Field field={'motivation'} />
			<HasOne field={'preferredCountry'}>
				<Field field={'name'} />
			</HasOne>
			<Field field={'preferredSex'} />
		<HasOne field="semester">
			<Field field="name" />
			<Field field="openForCzechBuddyRegistrationsDate" />
			<Field field="closeBuddyRegistrations" />
		</HasOne>
	</>
)
)