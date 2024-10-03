import { FormLayout, InputField, RadioEnumField } from '@app/lib/form'
import { DefaultRepeater, RepeaterItemActions, RepeaterRemoveItemButton } from '@app/lib/repeater'
import { Component } from '@contember/interface'

export const CountryEditForm = Component(() => <FormLayout>
	<InputField field="name" label="Name" required />
</FormLayout>)
