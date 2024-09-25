import { PersistButton } from '@app/lib/binding'
import { Todo } from '@app/lib/dev'
import { FormLayout, InputField, MultiSelectField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { formatDateTime } from '@app/lib/formatting'
import { Slots } from '@app/lib/layout'
import { formatDate } from '@app/lib/utils/formatting'
import { Component, EntityListSubTree, EntitySubTree, Field, HasMany, HasOne, identityEnvironmentExtension, If, useEntity, useEntityListSubTree, useEntitySubTree } from '@contember/interface'

export const ApplicationCzCreateForm = Component(
	() => {

		const entity = useEntity()
		const me = useEntitySubTree('me')
		entity.connectEntityAtField('person', me)
		const now = new Date().toISOString()


		//checks if user already applied for buddy this semester. It changes dynamically based on select field - semester
		let applied = false
		const semester = entity.getField('semester.name').value ?? undefined
		const currentUserApplicationsList = useEntityListSubTree('currentUserApplicationsCz')
		for (const application of currentUserApplicationsList) {
			if (application.getField('semester.name').value === semester) {
				applied = true
				break
			}
		}

		//check if applications are open for any semester. If not, user can't apply for buddy
		let closed = true
		const semestersList = useEntityListSubTree('allSemesters')
		for (const semester of semestersList) {
			let openForCzechBuddyRegistrationsDate = semester.getField('openForCzechBuddyRegistrationsDate').value
			let closeBuddyRegistrations = semester.getField('closeBuddyRegistrations').value
			if ((openForCzechBuddyRegistrationsDate && closeBuddyRegistrations) && (openForCzechBuddyRegistrationsDate <= now && closeBuddyRegistrations >= now)) {
				closed = false
				break
			}
		}
	
		if(closed){
			return (<div className='bg-blue-200 p-4 rounded-md'><div className='text-500'>Sorry, applications are closed now.</div></div>)
		}
		else if (applied) {
			return (<div className='bg-blue-200 p-4 rounded-md'><div className='text-500'>Sorry, you can only apply for buddy once. You already applied this semester.</div></div>)
		} else {
			return (<FormLayout>
				<Slots.Actions>
					<PersistButton label="Apply for buddy"/>
				</Slots.Actions>
				{/* <Todo>Semestr by měla aplikace znát automaticky a měl by se k přihlášce automaticky přiřadit. Potřeba checkovat, jestli už se na buddyho daný semestr hlásil - Done</Todo> */}
				<SelectField
					field="semester"
					label="Semester *"
					options={`Semester[openForCzechBuddyRegistrationsDate <= "${now}" && closeBuddyRegistrations >= "${now}"]`}
				>
					<Field field="name" />
					<div className='invisible'>
						<Field field={'openForCzechBuddyRegistrationsDate'} format={formatDate}/>
						<Field field={'closeBuddyRegistrations'} format={formatDate} />
					</div>
				</SelectField>
				<div>
					<h2 className="text-xl font-semibold">Information about you</h2>
					<hr className="my-2 border-gray-200" />
				</div>
				<HasOne field="person">
					<div className='flex flex-col space-y-4'>
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
					<SelectField field={'university'} label="University *" options={'University'} description="Your home university">
						<Field field={'name'} />
					</SelectField>
					<SelectField field={'faculty'} label="Faculty at VSE" options={'Faculty'}>
						<Field field={'name'} />
					</SelectField>
					</div>
				</HasOne>
				<div>
					<h2 className="text-xl font-semibold">Application details</h2>
					<hr className="my-2 border-gray-200" />
				</div>
				<div className='flex flex-col space-y-4'>
					{/* <TextareaField field="motivation" label="Motivation" /> */}
					<InputField field="howManyBuddies" label="Number of buddies *" description="How many buddies could you take care of at most?" required />
					<MultiSelectField field="preferredLanguages" label="Preferred languages of your buddy *">
						<Field field="name" />
					</MultiSelectField>
					<RadioEnumField
						field="preferredSex"
						required
						label="Preferred gender"
						orientation="horizontal"
						options={{ man: 'Man', woman: 'Woman', dontCare: 'Don\'t care' }}
					/>
				</div>
				</FormLayout>)
		}
}, (_, env) => (
	<>
		<EntityListSubTree
				entities={`Semester`}
				alias={'allSemesters'}
		>
			<Field field="name" />
			<Field field="openForCzechBuddyRegistrationsDate" />
			<Field field="closeBuddyRegistrations" />
		</EntityListSubTree>
		<EntityListSubTree
				entities={`ApplicationCz[person.tenantPerson.id='${env.getExtension(identityEnvironmentExtension).identity?.person?.id}']`}
				alias={'currentUserApplicationsCz'}
		>
			<HasOne field="semester">
				<Field field="name" />
			</HasOne>
		</EntityListSubTree>
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
			<Field field={'motivation'} />
			<HasOne field={'preferredCountry'}>
				<Field field={'name'} />
			</HasOne>
			<Field field={'preferredSex'} />
			<Field field={'howManyBuddies'} />
			<HasMany field={'preferredLanguages'}>
				<Field field={'name'} />
			</HasMany>
		<HasOne field="semester">
			<Field field="name" />
			<Field field="openForCzechBuddyRegistrationsDate" />
			<Field field="closeBuddyRegistrations" />
		</HasOne>
	</>
)
)