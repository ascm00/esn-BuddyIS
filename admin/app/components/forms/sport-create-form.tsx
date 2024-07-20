import { FormLayout, InputField } from '@app/lib/form'
import { Component } from '@contember/interface'

export const SportCreateForm = Component(() => <FormLayout>
	<InputField field="name" label="Name" required />
</FormLayout>)
