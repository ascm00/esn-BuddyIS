import { Todo } from '@app/lib/dev'
import { FormLayout, InputField, MultiSelectField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { formatDateTime } from '@app/lib/formatting'
import { formatDate } from '@app/lib/utils/formatting'
import { Component, Field, HasMany, HasOne, identityEnvironmentExtension, useEntity, useEntitySubTree } from '@contember/interface'

export const ApplicationCzEditForm = Component(
	() => {
		const now = new Date().toISOString()
	
	return (<FormLayout>
	{/* <Todo>Semestr by měla aplikace znát automaticky a měl by se k přihlášce automaticky přiřadit. Potřeba checkovat, jestli už se na buddyho daný semestr hlásil - Done</Todo> */}
	<SelectField
		field="semester"
		label="Semester *"
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
			label="Your gender *"
			orientation="horizontal"
			required
			options={{ man: 'Man', woman: 'Woman', other: 'Other' }}
		/>
		<SelectField field={'studyProgram'} label="Study program *" options={'StudyProgram'}>
			<Field field={'name'} />
		</SelectField>
		<SelectField field={'university'} label="University *" options={'University'} description="Your home university">
			<Field field={'name'} />
		</SelectField>
		{/* <SelectField field={'faculty'} label="Faculty at VSE" options={'Faculty'}>
			<Field field={'name'} />
		</SelectField> */}
		</div>
	</HasOne>
	<div>
		<h2 className="text-xl font-semibold">Application details</h2>
		<hr className="my-2 border-gray-200" />
	</div>
	<div className='flex flex-col space-y-4'>
		{/* <TextareaField field="motivation" label="Motivation" /> */}
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
}
)