import { CheckboxField, FormLayout, InputField, RadioEnumField } from '@app/lib/form'
import { DefaultRepeater, RepeaterItemActions, RepeaterRemoveItemButton } from '@app/lib/repeater'
import { Component } from '@contember/interface'

export const SemesterEditForm = Component(() => <FormLayout>
	<InputField field="name" label="Name" required />
	<InputField field="startDate" label="Start date" required />
	<InputField field="endDate" label="End date" required />
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
	<DefaultRepeater field="applicationsFr" orderBy="createdAt" title="Applications frs">
		<RepeaterItemActions>
			<RepeaterRemoveItemButton />
		</RepeaterItemActions>
		<RadioEnumField
			field="status"
			label="Status"
			options={{ enabled: 'enabled', disabled: 'disabled', cancelled: 'cancelled' }}
		/>
		<RadioEnumField
			field="rating"
			label="Rating"
			options={{ one: 'one', three: 'three', four: 'four', five: 'five', two: 'two' }}
		/>
		<InputField field="rBuddy" label="R buddy" />
		<InputField field="rParty" label="R party" />
		<InputField field="rTravel" label="R travel" />
		<InputField field="rSport" label="R sport" />
		<RadioEnumField
			field="preferredBuddySex"
			label="Preferred buddy sex"
			options={{ man: 'man', woman: 'woman', dontCare: 'dontCare' }}
		/>
		<InputField field="emailForInformation" label="Email for information" />
	</DefaultRepeater>
	<DefaultRepeater field="parties" orderBy="createdAt" title="Parties">
		<RepeaterItemActions>
			<RepeaterRemoveItemButton />
		</RepeaterItemActions>
		<InputField field="name" label="Name" required />
		<InputField field="date" label="Date" required />
		<CheckboxField field="open" label="Open" />
	</DefaultRepeater>
</FormLayout>)
