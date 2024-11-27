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

			entity.getField('internationalStudent.applicationsFr.status').updateValue('paired')

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
					options={`Person[(tenantPerson.roles='coordinator' || tenantPerson.roles='admin')]`}
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
				<SelectField
					field="internationalStudent"
					label="Foreign buddy"
					options={`Person[(applicationsFr.status = 'toBePaired' && applicationsFr.semester.isCurrent = true) && (tenantPerson.roles='internationalStudent')]`}
				>
					<Field field="firstName" /> {' '} <Field field="surname" />  {' ('} <Field field="tenantPerson.email" /> {')'}
					<div className='invisible'>
					<Field field="applicationsFr.status" />
					</div>
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
		<Field field="applicationsFr.status" />
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
