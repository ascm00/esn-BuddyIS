import { FormLayout, InputField } from '@app/lib/form'
import { Component } from '@contember/interface'

export const SectionEditForm = Component(() => <FormLayout>
	<InputField field="name" label="Name" required />
	<InputField field="description" label="Description" />
</FormLayout>)
