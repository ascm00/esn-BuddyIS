import { CheckboxField, FormLayout, InputField, RadioEnumField } from '@app/lib/form'
import { DefaultRepeater, RepeaterItemActions, RepeaterRemoveItemButton } from '@app/lib/repeater'
import { Component } from '@contember/interface'

export const SemesterForm = Component(() => <FormLayout>
	<InputField field="name" label="Name" required />
	<InputField field="startDate" label="Start date" required />
	<InputField field="endDate" label="End date" required />
	<InputField field="openForCzechBuddyRegistrationsDate" label="Open Czech Buddies Registration" required />
	<InputField field="closeBuddyRegistrations" label="Close Czech Buddies Registration" required />
</FormLayout>)
