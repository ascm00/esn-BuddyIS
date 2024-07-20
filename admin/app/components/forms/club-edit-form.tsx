import { CheckboxField, FormLayout, InputField } from '@app/lib/form'
import { DefaultRepeater, RepeaterItemActions, RepeaterRemoveItemButton } from '@app/lib/repeater'
import { Component } from '@contember/interface'

export const ClubEditForm = Component(() => <FormLayout>
	<DefaultRepeater field="parties" orderBy="createdAt" title="Parties">
		<RepeaterItemActions>
			<RepeaterRemoveItemButton />
		</RepeaterItemActions>
		<InputField field="name" label="Name" required />
		<InputField field="date" label="Date" required />
		<CheckboxField field="open" label="Open" />
	</DefaultRepeater>
	<InputField field="name" label="Name" required />
</FormLayout>)
