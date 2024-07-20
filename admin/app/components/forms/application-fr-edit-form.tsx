import { FormLayout, InputField, MultiSelectField, RadioEnumField, SelectField } from '@app/lib/form'
import { Component, Field } from '@contember/interface'

export const ApplicationFrEditForm = Component(() => <FormLayout>
	<SelectField
		field="semester"
		label="Semester"
		createNewForm={<>
			<InputField field="name" label="Name" required />
			<InputField field="startDate" label="Start date" required />
			<InputField field="endDate" label="End date" required />
		</>}
		options="Semester"
	>
		<Field field="name" />
	</SelectField>
	<RadioEnumField
		field="status"
		label="Status"
		options={{ enabled: 'enabled', disabled: 'disabled', cancelled: 'cancelled' }}
	/>
	<SelectField
		field="language"
		label="Language"
		createNewForm={<>
			<InputField field="name" label="Name" required />
		</>}
		options="Language"
	>
		<Field field="name" />
	</SelectField>
	<MultiSelectField field="hobbies" options="Hobby" label="Hobbies">
		<Field field="name" />
	</MultiSelectField>
	<RadioEnumField
		field="rating"
		label="Rating"
		options={{ one: 'one', three: 'three', four: 'four', five: 'five', two: 'two' }}
	/>
	<InputField field="rBuddy" label="R buddy" />
	<InputField field="rParty" label="R party" />
	<InputField field="rTravel" label="R travel" />
	<InputField field="rSport" label="R sport" />
	<RadioEnumField
		field="preferredBuddySex"
		label="Preferred buddy sex"
		options={{ man: 'man', woman: 'woman', dontCare: 'dontCare' }}
	/>
	<InputField field="emailForInformation" label="Email for information" />
	<SelectField field="limitations" label="Limitations" options="Limitations">
		<Field field="id" />
	</SelectField>
</FormLayout>)
