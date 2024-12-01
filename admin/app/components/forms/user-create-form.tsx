import { FormLayout, InputField, SelectField } from '@app/lib/form'
import { InviteFormFields } from '@app/lib/tenant'
import { Component, Field } from '@contember/interface'

export const UserCreateForm = Component(() => <FormLayout>
	<InputField field="firstName" label="First name" required />
	<InputField field="surname" label="Surname" required />
	<InputField field="inSISusername" label="InSIS username" />
	<InputField field="esnCardId" label="ESNcard ID" />
	<InputField field="phoneNumber" label="Phone number" />
	<SelectField
		field="university"
		label="Home University"
		createNewForm={<>
			<InputField field="name" label="Name" required />
		</>}
		options="University"
	>
		<Field field="name" />
	</SelectField>
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
	<SelectField
		field="faculty"
		label="Faculty at VSE"
		createNewForm={<>
			<InputField field="name" label="Name" required />
		</>}
		options="Faculty"
	>
		<Field field="name" />
	</SelectField>
</FormLayout>)
