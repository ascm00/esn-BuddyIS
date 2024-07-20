import { CheckboxField, FormLayout, InputField, RadioEnumField, SelectField } from '@app/lib/form'
import { DefaultRepeater, RepeaterItemActions, RepeaterRemoveItemButton } from '@app/lib/repeater'
import { Component, Field } from '@contember/interface'

export const UserEditForm = Component(() => <FormLayout>
	<InputField field="lastLoginDate" label="Last login date" />
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
	<CheckboxField field="active" label="Active" />
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
	<DefaultRepeater field="applications" orderBy="createdAt" title="Applications">
		<RepeaterItemActions>
			<RepeaterRemoveItemButton />
		</RepeaterItemActions>
		<InputField field="points" label="Point" />
		<InputField field="motivation" label="Motivation" />
		<RadioEnumField
			field="status"
			label="Status"
			options={{ enabled: 'enabled', disabled: 'disabled', cancelled: 'cancelled' }}
		/>
		<RadioEnumField field="result" label="Result" options={{ accepted: 'accepted', declined: 'declined' }} />
		<InputField field="rBuddy" label="R buddy" />
		<InputField field="rParty" label="R party" />
		<InputField field="rTravel" label="R travel" />
		<InputField field="rSport" label="R sport" />
		<RadioEnumField
			field="preferredSex"
			label="Preferred sex"
			options={{ man: 'man', woman: 'woman', dontCare: 'dontCare' }}
		/>
	</DefaultRepeater>
</FormLayout>)
