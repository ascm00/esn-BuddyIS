import { FormLayout, InputField, RadioEnumField, SelectField } from '@app/lib/form'
import { Component, Field } from '@contember/interface'

export const ApplicationCzCreateForm = Component(() => <FormLayout>
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
	<InputField field="motivation" label="Motivation" />
	<RadioEnumField
		field="status"
		label="Status"
		options={{ enabled: 'enabled', disabled: 'disabled', cancelled: 'cancelled' }}
	/>
	<SelectField
		field="preferredCountry"
		label="Preferred country"
		createNewForm={<>
			<InputField field="name" label="Name" required />
		</>}
		options="Country"
	>
		<Field field="name" />
	</SelectField>
	<InputField field="rBuddy" label="R buddy" />
	<InputField field="rParty" label="R party" />
	<InputField field="rTravel" label="R travel" />
	<InputField field="rSport" label="R sport" />
	<RadioEnumField
		field="preferredSex"
		label="Preferred sex"
		options={{ man: 'man', woman: 'woman', dontCare: 'dontCare' }}
	/>
	<RadioEnumField field="result" label="Result" options={{ accepted: 'accepted', declined: 'declined' }} />
</FormLayout>)
