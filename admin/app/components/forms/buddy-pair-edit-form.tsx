import { CheckboxField, FormLayout, InputField, SelectField } from '@app/lib/form'
import { Component, EntityListSubTree, Field, HasMany, HasOne, useEntity, useEntityBeforePersist, useEntityListSubTree } from '@contember/interface'

export const BuddyPairEditForm = Component(
	() => {

	return (<FormLayout>
				<SelectField
					field="coordinator"
					label="Coordinator"
					options={`Person[tenantPerson.roles='coordinator' || tenantPerson.roles='admin']`}
				>
					<Field field="firstName" /> {' '} <Field field="surname" />  {' ('} <Field field="tenantPerson.email" /> {')'}
				</SelectField>
				<SelectField
					field="czechStudent"
					label="Local buddy"
					options={`Person[tenantPerson.roles='coordinator' || tenantPerson.roles='admin' || tenantPerson.roles='czechBuddy']`}
				>
					<Field field="firstName" /> {' '} <Field field="surname" />  {' ('} <Field field="tenantPerson.email" /> {')'}
				</SelectField>
				<SelectField
					field="internationalStudent"
					label="Foreign buddy"
					options={`Person[tenantPerson.roles='internationalStudent']`}
				>
					<Field field="firstName" /> {' '} <Field field="surname" />  {' ('} <Field field="tenantPerson.email" /> {')'}
				</SelectField>
			</FormLayout>
			)

        }
)
