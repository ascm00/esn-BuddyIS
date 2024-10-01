import { FormLayout, InputField, SelectField } from '@app/lib/form'
import { Component, Field } from '@contember/interface'

export const UniversityCreateForm = Component(() => <FormLayout>
	<InputField field="name" label="Name" required />
	<SelectField
		field="countryOfUniversity"
		label="Country of university"
		createNewForm={<>
			<InputField field="name" label="Name" required />
		</>}
		options="Country"
	>
		<Field field="name" />
	</SelectField>
</FormLayout>)
