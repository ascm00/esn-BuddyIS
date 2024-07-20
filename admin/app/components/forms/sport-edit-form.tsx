import { FormLayout, InputField } from '@app/lib/form'
import { Component } from '@contember/interface'

export const SportEditForm = Component(() => <FormLayout>
	<InputField field="name" label="Name" required />
</FormLayout>)
