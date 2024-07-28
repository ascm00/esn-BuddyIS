import { CheckboxField, FormLayout, InputField, MultiSelectField, SelectField } from '@app/lib/form'
import { Component, Field } from '@contember/interface'

export const N2nHourEditForm = Component(() => <FormLayout>
	<InputField field="from" label="From" required />
	<InputField field="to" label="To" required />
	<SelectField
		field="party"
		label="Party"
		createNewForm={<>
			<InputField field="name" label="Name" required />
			<InputField field="date" label="Date" required />
			<CheckboxField field="open" label="Open" />
		</>}
		options="N2nParty"
	>
		<Field field="name" />
	</SelectField>
	<MultiSelectField field="person" options="Person" label="User">
		<Field field="firstName" />
	</MultiSelectField>
</FormLayout>)
