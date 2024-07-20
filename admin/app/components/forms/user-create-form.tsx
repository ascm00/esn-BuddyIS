import { FormLayout, InputField, SelectField } from '@app/lib/form'
import { Component, Field } from '@contember/interface'

export const UserCreateForm = Component(() => <FormLayout>
	<InputField field="phoneNumber" label="Phone number" />
	<SelectField
		field="university"
		label="University"
		createNewForm={<>
			<InputField field="name" label="Name" required />
		</>}
		options="University"
	>
		<Field field="name" />
	</SelectField>
	<InputField field="esnCardId" label="Esn card id" />
	<InputField field="surname" label="Surname" required />
	<InputField field="xname" label="Xname" />
	<SelectField
		field="faculty"
		label="Faculty"
		createNewForm={<>
			<InputField field="name" label="Name" required />
		</>}
		options="Faculty"
	>
		<Field field="name" />
	</SelectField>
	<SelectField
		field="country"
		label="Country"
		createNewForm={<>
			<InputField field="name" label="Name" required />
		</>}
		options="Country"
	>
		<Field field="name" />
	</SelectField>
	<InputField field="firstName" label="First name" required />
</FormLayout>)
