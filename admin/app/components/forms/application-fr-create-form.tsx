import { Todo } from '@app/lib/dev'
import { FormLayout, InputField, MultiSelectField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { Component, EntityListSubTree, EntitySubTree, Environment, Field, HasMany, HasOne, identityEnvironmentExtension, useEntity, useEntityListSubTree, useEntitySubTree, useEnvironment } from '@contember/interface'
import { useIdentity } from '@contember/admin'
import { ConnectUser } from '../ConnectUser'
import { ConnectEntity } from '../ConnectEntity'
import { Slots } from '@app/lib/layout'
import { PersistButton } from '@app/lib/binding'


export const ApplicationFrCreateForm = Component(
	(_, env) => {

		const entity = useEntity()
		const me = useEntitySubTree('me')
		entity.connectEntityAtField('person', me)

		const semesterList = useEntityListSubTree('currentSemester')
		for (const semester of semesterList) {
			entity.connectEntityAtField('semester', semester)
			break
		}

		const currentUserApplicationsFrTry = useEntitySubTree('currentUserApplicationsFr') ?? undefined
		const currentUserApplicationsFr = currentUserApplicationsFrTry?.getField('id').value ?? undefined
		
	return ((!currentUserApplicationsFr && <FormLayout>
		<Slots.Actions>
			<PersistButton />
		</Slots.Actions>
		<Todo>Semestr by měla aplikace znát automaticky a měl by se k přihlášce automaticky přiřadit. Potřeba checkovat, jestli už se na buddyho daný semestr hlásil. Nejde removenout jazyk. Select fieldy musí být mandatory.</Todo>
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
		<div className='flex flex-col space-y-4'>
			<HasOne field={'person'}>
					<RadioEnumField
						field="gender"
						label="Your gender *"
						orientation="horizontal"
						required
						options={{ man: 'Man', woman: 'Woman', other: 'Other' }}
					/>
					<SelectField field={'studyProgram'} label="Study program *" options={'StudyProgram'}>
						<Field field={'name'} />
					</SelectField>
					<SelectField field={'university'} label="Home university" options={'University'} description="If you are coming to VŠE as an exchange student. Please choose the university you're coming from. Otherwise leave it blank.">
						<Field field={'name'} />
					</SelectField>
					<SelectField field={'country'} label="Home country" options={'Country'}>
						<Field field={'name'} />
					</SelectField>
					<SelectField field={'faculty'} label="Faculty at VSE" options={'Faculty'}>
						<Field field={'name'} />
					</SelectField>
					<MultiSelectField field="languages" label="Languages spoken *">
						<Field field="name" />
					</MultiSelectField>
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
				label="Preferred gender of your buddy *"
				orientation="horizontal"
				options={{ man: 'Man', woman: 'Woman', dontCare: 'Don\'t care' }}
			/>
		</div>
		</FormLayout>) ||
		(currentUserApplicationsFr && (<div className='bg-blue-200 p-4 rounded-md'><div className='text-500'>Sorry, you can only apply for buddy once. You already applied.</div></div>))
	)
	}, (_, env) => (
		<>
			<EntityListSubTree
				entities="Semester[isCurrent=true]"
				alias={'currentSemester'}
			></EntityListSubTree>
			<EntitySubTree
				entity={`ApplicationFr(person.tenantPerson.id='${env.getExtension(identityEnvironmentExtension).identity?.person?.id}')`}
				alias={'currentUserApplicationsFr'}
			></EntitySubTree>
			<HasOne field="semester" />
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
				<HasOne field="country">
					<Field field="name" />
				</HasOne>
				<HasMany field="languages">
					<Field field="name" />
				</HasMany>
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
				<HasOne field="country">
					<Field field="name" />
				</HasOne>
				<HasMany field="languages">
					<Field field="name" />
				</HasMany>
			</HasOne>
			<Field field={'preferredBuddySex'} />
		</>
	)

)
