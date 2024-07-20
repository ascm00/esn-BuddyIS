import { CheckboxField, FormLayout, InputField } from '@app/lib/form'
import { Component } from '@contember/interface'

export const BuddyTaskEditForm = Component(() => <FormLayout>
	<InputField field="description" label="Description" required />
	<CheckboxField field="done" label="Done" />
	<CheckboxField field="confirmed" label="Confirmed" />
</FormLayout>)
