import { Todo } from '@app/lib/dev'
import { FormLayout, InputField, MultiSelectField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { Component, EntitySubTree, Environment, Field, HasOne, identityEnvironmentExtension, useEntity, useEntitySubTree, useEnvironment } from '@contember/interface'
import { useIdentity } from '@contember/admin'
import { ConnectUser } from '../ConnectUser'
import { ConnectEntity } from '../ConnectEntity'


export const ApplicationFrCreateForm = Component(
	(_, env) => {

		const entity = useEntity()
		const me = useEntitySubTree('me')
		entity.connectEntityAtField('person', me)
		
	return (<FormLayout>

		<Todo>Semestr by měla aplikace znát automaticky a měl by se k přihlášce automaticky přiřadit. Potřeba checkovat, jestli už se na buddyho daný semestr hlásil</Todo>
		{/* <SelectField
			field="semester"
			label="Semester"
			createNewForm={<>
				<InputField field="name" label="Name" required />
				<InputField field="startDate" label="Start date" required />
				<InputField field="endDate" label="End date" required />
			</>}
			options="Semester"
		>
			<Field field="name" />
		</SelectField> */}
		<div>
			<h2 className="text-xl font-semibold">Information about you</h2>
			<hr className="my-2 border-gray-200" />
		</div>
		{/* <ConnectEntity
			field="person"
			entity="Person"
			where={`(personId='${id}')`}
		/>*/}
		<div className='flex flex-col space-y-4'>
			<HasOne field={'person'}>
					<RadioEnumField
						field="gender"
						label="Your gender"
						orientation="horizontal"
						required
						options={{ man: 'Man', woman: 'Woman', other: 'Other' }}
					/>
					<SelectField field={'studyProgram'} label="Study program" options={'StudyProgram'}>
						<Field field={'name'} />
					</SelectField>
					<SelectField field={'university'} label="Home university" options={'University'}>
						<Field field={'name'} />
					</SelectField>
					<SelectField field={'faculty'} label="Faculty at VSE" options={'Faculty'}>
						<Field field={'name'} />
					</SelectField>
			</HasOne>
		</div>
		<div>
			<h2 className="text-xl font-semibold">Application details</h2>
			<hr className="my-2 border-gray-200" />
		</div>
		<div className='flex flex-col space-y-4'>
			<RadioEnumField
				field="preferredBuddySex"
				required
				label="Preferred gender"
				orientation="horizontal"
				options={{ man: 'Man', woman: 'Woman', dontCare: 'Don\'t care' }}
			/>
		</div>
	</FormLayout>)
	}, (_, env) => (
		<>
			<EntitySubTree
				entity={`Person(tenantPerson.id='${env.getExtension(identityEnvironmentExtension).identity?.person?.id}')`}
				alias="me"
			>
				<Field field="gender" />
				<HasOne field="studyProgram">
					<Field field="name" />
				</HasOne>
				<HasOne field="university">
					<Field field="name" />
				</HasOne>
				<HasOne field="faculty">
					<Field field="name" />
				</HasOne>
			</EntitySubTree>
			<HasOne field="person">
				<Field field="gender" />
				<HasOne field="studyProgram">
					<Field field="name" />
				</HasOne>
				<HasOne field="university">
					<Field field="name" />
				</HasOne>
				<HasOne field="faculty">
					<Field field="name" />
				</HasOne>
			</HasOne>
			<Field field={'preferredBuddySex'} />
		</>
	)

)
