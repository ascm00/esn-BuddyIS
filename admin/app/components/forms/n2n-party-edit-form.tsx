import { CheckboxField, FormLayout, InputField, SelectField } from '@app/lib/form'
import { DefaultRepeater, RepeaterItemActions, RepeaterRemoveItemButton } from '@app/lib/repeater'
import { Component, Field } from '@contember/interface'

export const N2nPartyEditForm = Component(() => <FormLayout>
	<InputField field="name" label="Name" required />
	<InputField field="date" label="Date" required />
	<CheckboxField field="open" label="Open" />
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
	<SelectField
		field="club"
		label="Club"
		createNewForm={<>
			<InputField field="name" label="Name" required />
		</>}
		options="Club"
	>
		<Field field="name" />
	</SelectField>
	<DefaultRepeater field="hours" orderBy="createdAt" title="Hours">
		<RepeaterItemActions>
			<RepeaterRemoveItemButton />
		</RepeaterItemActions>
		<InputField field="from" label="From" required />
		<InputField field="to" label="To" required />
	</DefaultRepeater>
</FormLayout>)
