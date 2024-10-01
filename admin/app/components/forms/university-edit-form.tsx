import { FormLayout, InputField, SelectField } from '@app/lib/form'
import { Component, Field } from '@contember/interface'

export const UniversityEditForm = Component(() => <FormLayout>
	<InputField field="name" label="Name" required />
	<SelectField
		field="countryOfUniversity"
		label="Home University Country"
		createNewForm={<>
			<InputField field="name" label="Name" required />
		</>}
		options="Country"
	>
		<Field field="name" />
	</SelectField>
</FormLayout>)
