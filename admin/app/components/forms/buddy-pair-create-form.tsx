import { CheckboxField, FormLayout, InputField, SelectField } from '@app/lib/form'
import { Component, EntityListSubTree, Field, HasMany, HasOne, useEntity, useEntityBeforePersist, useEntityListSubTree } from '@contember/interface'

export const BuddyPairCreateForm = Component(
	
	() => {
		const entity = useEntity()

		//connects pair to the current semester
		const semesterList = useEntityListSubTree('currentSemester')
		for (const semester of semesterList) {
			entity.connectEntityAtField('semester', semester)
			break
		}

		useEntityBeforePersist(() => {

			//Creates tasks for every buddy pair
			const entityList = entity.getEntityList('tasks')
			entityList.createNewEntity(accessor => {
				accessor().getField('description').updateValue('Pick-up')
			})
			entityList.createNewEntity(accessor => {
				accessor().getField('description').updateValue('Accomodation')
			})
			entityList.createNewEntity(accessor => {
				accessor().getField('description').updateValue('First shopping')
			})
			entityList.createNewEntity(accessor => {
				accessor().getField('description').updateValue('Foreign police')
			})
			entityList.createNewEntity(accessor => {
				accessor().getField('description').updateValue('Registration in school')
			})
			entityList.createNewEntity(accessor => {
				accessor().getField('description').updateValue('Tour de school')
			})
			entityList.createNewEntity(accessor => {
				accessor().getField('description').updateValue('Public transport pass') 
			})

		})

	
	return (<FormLayout>
				<SelectField
					field="coordinator"
					label="Coordinator"
					options="Person"
				>
					<Field field="firstName" /> {' '} <Field field="surname" />  {' ('} <Field field="tenantPerson.email" /> {')'}
				</SelectField>
				<SelectField
					field="czechStudent"
					label="Czech student"
					options="Person"
				>
					<Field field="firstName" /> {' '} <Field field="surname" />  {' ('} <Field field="tenantPerson.email" /> {')'}
				</SelectField>
				<SelectField
					field="internationalStudent"
					label="International student"
					options="Person"
				>
					<Field field="firstName" /> {' '} <Field field="surname" />  {' ('} <Field field="tenantPerson.email" /> {')'}
				</SelectField>
			</FormLayout>
			)

}, () => (
	<>
	<HasMany field="tasks">
		<Field field="description" />
	</HasMany>
	<HasOne field="coordinator">
		<Field field="firstName" />
		<Field field="surname" />
		<Field field="tenantPerson.email" />
	</HasOne>
	<HasOne field="czechStudent">
		<Field field="firstName" />
		<Field field="surname" />
		<Field field="tenantPerson.email" />
	</HasOne>
	<HasOne field="internationalStudent">
		<Field field="firstName" />
		<Field field="surname" />
		<Field field="tenantPerson.email" />
	</HasOne>
	<EntityListSubTree
		entities="Semester[isCurrent=true]"
		alias={'currentSemester'}
	>
		<Field field={'isCurrent'} />
	</EntityListSubTree>
	<HasOne field="semester" />

	</>
)
)
