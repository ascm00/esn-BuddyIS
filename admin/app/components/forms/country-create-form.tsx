import { FormLayout, InputField, RadioEnumField } from '@app/lib/form'
import { DefaultRepeater, RepeaterItemActions, RepeaterRemoveItemButton } from '@app/lib/repeater'
import { Component } from '@contember/interface'

export const CountryCreateForm = Component(() => <FormLayout>
	<DefaultRepeater field="universities" orderBy="createdAt" title="Universities">
		<RepeaterItemActions>
			<RepeaterRemoveItemButton />
		</RepeaterItemActions>
		<InputField field="name" label="Name" required />
	</DefaultRepeater>
	<InputField field="name" label="Name" required />
	<DefaultRepeater field="preferredApplicationsCz" orderBy="createdAt" title="Preferred applications czs">
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
