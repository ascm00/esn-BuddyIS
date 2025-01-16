import { CheckboxField, FormLayout, InputField, SelectField } from '@app/lib/form'
import { Component, EntityListSubTree, Field, HasMany, HasOne, useEntity, useEntityBeforePersist, useEntityListSubTree } from '@contember/interface'

export const BuddyPairEditForm = Component(
	() => {

	const entity = useEntity()

	useEntityBeforePersist(()=> {
		//const coordinator = entity.getField<string>('coordinator.tenantPerson.email').value ?? undefined
		const localBuddy = entity.getField<string>('czechStudent.tenantPerson.email').value ?? undefined

        if(!(localBuddy)){
            return () => { entity.addError('Local buddy must not be empty.') }
        }
	})

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
					options={`Person[(applications.semester.isCurrent = true && applications.status.status='toBePaired') && (tenantPerson.roles='coordinator' || tenantPerson.roles='admin' || tenantPerson.roles='czechBuddy')]`}
				>
					<Field field="firstName" /> {' '} <Field field="surname" />  {' ('} <Field field="tenantPerson.email" /> {')'}
				</SelectField>
				{/* <SelectField
					field="internationalStudent"
					label="Foreign buddy"
					options={`Person[tenantPerson.roles='internationalStudent']`}
				>
					<Field field="firstName" /> {' '} <Field field="surname" />  {' ('} <Field field="tenantPerson.email" /> {')'}
				</SelectField> */}
			</FormLayout>
			)

        }, () => (
			<>
				<HasOne field={'coordinator'}>
					<Field field={'firstName'} />
					<Field field={'surname'} />
					<Field field={'tenantPerson.email'} />
				</HasOne>
				<HasOne field={'czechStudent'}>
					<Field field={'firstName'} />
					<Field field={'surname'} />
					<Field field={'tenantPerson.email'} />
				</HasOne>
				<HasOne field={'internationalStudent'}>
					<Field field={'firstName'} />
					<Field field={'surname'} />
					<Field field={'tenantPerson.email'} />
				</HasOne>
			</>
		)
)
