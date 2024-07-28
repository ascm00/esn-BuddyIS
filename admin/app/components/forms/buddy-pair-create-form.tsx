import { CheckboxField, FormLayout, InputField, SelectField } from '@app/lib/form'
import { Component, Field } from '@contember/interface'

export const BuddyPairCreateForm = Component(() => <FormLayout>
	<SelectField
		field="czechStudent"
		label="Czech student"
		createNewForm={<>
			<InputField field="registrationDate" label="Registration date" required />
			<InputField field="lastLoginDate" label="Last login date" />
			<InputField field="phoneNumber" label="Phone number" />
			<InputField field="esnCardId" label="Esn card id" />
			<InputField field="surname" label="Surname" required />
			<InputField field="xname" label="Xname" />
			<CheckboxField field="active" label="Active" />
			<InputField field="firstName" label="First name" required />
		</>}
		options="Person"
	>
		<Field field="firstName" />
	</SelectField>
	<SelectField
		field="internationalStudent"
		label="International student"
		createNewForm={<>
			<InputField field="registrationDate" label="Registration date" required />
			<InputField field="lastLoginDate" label="Last login date" />
			<InputField field="phoneNumber" label="Phone number" />
			<InputField field="esnCardId" label="Esn card id" />
			<InputField field="surname" label="Surname" required />
			<InputField field="xname" label="Xname" />
			<CheckboxField field="active" label="Active" />
			<InputField field="firstName" label="First name" required />
		</>}
		options="Person"
	>
		<Field field="firstName" />
	</SelectField>
	<InputField field="note" label="Note" />
</FormLayout>)
