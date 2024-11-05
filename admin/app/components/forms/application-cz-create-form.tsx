import { PersistButton } from '@app/lib/binding'
import { Todo } from '@app/lib/dev'
import { FormLayout, InputField, MultiSelectField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { formatDateTime } from '@app/lib/formatting'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableCell, TableRow, TableBody, TableWrapper } from '@app/lib/ui/table'
import { formatDate } from '@app/lib/utils/formatting'
import { Component, EntityListSubTree, EntitySubTree, Field, HasMany, HasOne, HasRole, identityEnvironmentExtension, If, Link, useEntity, useEntityListSubTree, useEntitySubTree, usePersist } from '@contember/interface'

export const ApplicationCzCreateForm = Component(
	() => {

		const entity = useEntity()
		const persist = usePersist()
		const me = useEntitySubTree('me')
		entity.connectEntityAtField('person', me)
		const now = new Date().toISOString()
		const id = entity.getField('id').value



		//checks if user already applied for buddy this semester. It changes dynamically based on select field - semester
		let applied = false
		const semester = entity.getField('semester.name').value ?? undefined
		const semesterEntity = entity.getEntity('semester')
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

		const handlePersist = () => {
			// check if all mandatory fields are filled
			const semester = entity.getEntity('semester').getField('name').value
			const person = entity.getEntity('person')
			const studyProgram = person?.getEntity('studyProgram').getField('name').value
			const preferredCountryOfUniversity = entity.getEntity('preferredCountry').getField('name').value
			const howManyBuddies = entity.getField<number>('howManyBuddies').value ?? 0
			const buddiesValid = howManyBuddies > 0 && howManyBuddies <= 10

			let languagesFilled = false
			for (const languageEntity of entity.getEntityList('preferredLanguages') ?? []) {
				let languageName = languageEntity.getField('name').value ?? undefined
				if (languageName) {
					languagesFilled = true
					break
				}
			}

			const gender = person?.getField('gender').value
			const preferredBuddySex = entity.getField('preferredSex').value

			if(semester && studyProgram && preferredCountryOfUniversity && languagesFilled && gender && preferredBuddySex && buddiesValid){
				persist()
			} else {
				alert('Please fill all the mandatory fields and make sure that number of buddies is between 1 and 10.')
			}

		}
	
		if(closed){
			return (<div className='bg-blue-200 p-4 rounded-md'><div className='text-500'>Sorry, applications for all semesters are closed now.</div></div>)
		} else if (!semester) {
			return (<FormLayout>
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
			</FormLayout>)
		} else if (applied) {
			// const name = getEntity('person').getField('firstName').value?.toString() + ' ' + entity.getEntity('person').getField('surname').value?.toString()
			// const motivation = entity.getField('motivation').value?.toString()
			// const preferredSex = entity.getField('preferredSex').value?.toString()
			// const preferredCountry = entity.getEntity('preferredCountry').getField('name').value?.toString()
			// const howManyBuddies = entity.getField('howManyBuddies').value?.toString()
			return (
				<>
					<div className='bg-blue-200 p-4 rounded-md'><div className='text-500'>Sorry, you can only apply for buddy once. You already applied this semester.</div></div>
						{/* <Slots.Actions>
							<Link to={`applicationCzEdit(id: '${id}')`}>
								<Button>
									Edit application
								</Button>
							</Link>
						</Slots.Actions> */}
						{/* <TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>
											Name
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="person.firstName" /> {' '} <Field field="person.surname" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Semester
										</TableCell>
										<TableCell className="font-semibold">
											{semester.toString()}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Motivation
										</TableCell>
										<TableCell className="font-semibold">
											{motivation}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Preferred buddy gender
										</TableCell>
										<TableCell className="font-semibold">
											{preferredSex}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Preferred country of university
										</TableCell>
										<TableCell className="font-semibold">
											{preferredCountry}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											How many buddies max
										</TableCell>
										<TableCell className="font-semibold">
											{howManyBuddies}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableWrapper> */}
				</>
			)
		} else {
			return (<FormLayout>
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
					<SelectField field={'studyProgram'} label="Study program *" options={'StudyProgram'} description="If you are studying a program in Czech language, select 'Czech program'.">
						<Field field={'name'} />
					</SelectField>
					</div>
				</HasOne>
				<div>
					<h2 className="text-xl font-semibold">Application details</h2>
					<hr className="my-2 border-gray-200" />
				</div>
				<div className='flex flex-col space-y-4'>
					<TextareaField field="motivation" label="Motivation" />
					<InputField field="howManyBuddies" label="Number of buddies *" description="How many buddies could you take care of at most? Minimum is 1." defaultValue={1} />
					<SelectField
						field="preferredCountry"
						label="Preferred university country of your buddy *"
						options="Country"
					>
						<Field field="name" />
					</SelectField>
					<MultiSelectField field="preferredLanguages" label="Preferred languages of your buddy *">
						<Field field="name" />
					</MultiSelectField>
					<RadioEnumField
						field="preferredSex"
						required
						label="Preferred gender *"
						orientation="horizontal"
						options={{ man: 'Man', woman: 'Woman', dontCare: 'Not preferred' }}
					/>
				</div>
				<div className='flex flex-col space-y-4 w-36 pt-2'>
					<Button onClick={handlePersist}>
						Apply for buddy
					</Button>
				</div>
				</FormLayout>)
		}
}, (_, env) => (
	<>
		<Field field="id" />
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
				<Field field="firstName" />
				<Field field="surname" />
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
				<Field field="firstName" />
				<Field field="surname" />
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