import { Todo } from '@app/lib/dev'
import { FormLayout, InputField, MultiSelectField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { Component, EntityListSubTree, EntitySubTree, Environment, Field, HasMany, HasOne, identityEnvironmentExtension, Link, useEntity, useEntityListSubTree, useEntitySubTree, useEnvironment, usePersist, useIdentity } from '@contember/interface'
import { ConnectUser } from '../ConnectUser'
import { ConnectEntity } from '../ConnectEntity'
import { Slots } from '@app/lib/layout'
import { PersistButton } from '@app/lib/binding'
import { formatDate } from '@app/lib/formatting'
import { Button } from '@app/lib/ui/button'
import { TableWrapper, TableBody, Table, TableCell, TableRow } from '@app/lib/ui/table'
import { PreferredSexCell } from '@app/pages/applicationFrDetail'
export const ApplicationFrCreateForm = Component(
	(_, env) => {

		const entity = useEntity()
		const me = useEntitySubTree('me')
		entity.connectEntityAtField('person', me)
		const now = new Date().toISOString()
		const persist = usePersist()

		const semester = entity.getEntity('semester')?.getField('name').value ?? undefined

		//connects application to the current semester
		// checks if applications are open for current semester. If not, user can't apply for buddy
		const semesterList = useEntityListSubTree('allSemesters')
		let closed = true
		for (const semester of semesterList) {
			let openForCzechBuddyRegistrationsDate = semester.getField('openForCzechBuddyRegistrationsDate').value
			let closeBuddyRegistrations = semester.getField('closeBuddyRegistrations').value
			if ((openForCzechBuddyRegistrationsDate && closeBuddyRegistrations) && (openForCzechBuddyRegistrationsDate <= now && closeBuddyRegistrations >= now)) {
				closed = false
				break
			}
		}

		const currentUserApplicationsFrTry = useEntitySubTree('currentUserApplicationsFr') ?? undefined
		const currentUserApplicationsFr = currentUserApplicationsFrTry?.getField('id').value ?? undefined


		// I have to check whether user filled all the mandatory fields.
		const handlePersist = () => {
			// check if all mandatory fields are filled
			const semester = entity.getEntity('semester').getField('name').value
			const person = entity.getEntity('person')
			const studyProgram = person?.getEntity('studyProgram').getField('name').value
			const countryOfUniversity = person?.getEntity('countryOfUniversity').getField('name').value
			let languagesFilled = false
			for (const languageEntity of person?.getEntityList('languages') ?? []) {
				let languageName = languageEntity.getField('name').value ?? undefined
				if (languageName) {
					languagesFilled = true
					break
				}
			}

			const gender = person?.getField('gender').value
			const preferredBuddySex = entity.getField('preferredBuddySex').value

			if(semester && studyProgram && countryOfUniversity && languagesFilled && gender && preferredBuddySex){
				persist()
			} else {
				alert('Please fill all the mandatory fields.')
			}

		}

	if(closed){
		return (<div className='bg-blue-200 p-4 rounded-md'><div className='text-500'>Sorry, applications are closed now. 😕</div></div>)
	} else if (currentUserApplicationsFr) {
		const name = currentUserApplicationsFrTry?.getEntity('person').getField('firstName').value?.toString() + ' ' + currentUserApplicationsFrTry?.getEntity('person').getField('surname').value?.toString()	
		const semester = currentUserApplicationsFrTry?.getEntity('semester').getField('name').value?.toString()
		const studyProgram = currentUserApplicationsFrTry?.getEntity('person').getEntity('studyProgram').getField('name').value?.toString()
		const countryOfUniversity = currentUserApplicationsFrTry?.getEntity('person').getEntity('countryOfUniversity').getField('name').value?.toString()
		let preferredBuddySex = currentUserApplicationsFrTry?.getField('preferredBuddySex').value?.toString()
		if(preferredBuddySex === 'dontCare') {
			preferredBuddySex = 'Not preferred'
		} else if (preferredBuddySex === 'man') {
			preferredBuddySex = 'Man'
		} else if (preferredBuddySex === 'woman') {
			preferredBuddySex = 'Woman'
		}
		return (
		<>
			<div className='bg-blue-200 p-4 rounded-md max-w-lg'><div className='text-500'>You already applied for a buddy. Here is your application. 👇</div></div>
				<div>
						{/* <Slots.Actions>
							<Link to={`applicationFrEdit(id: '${currentUserApplicationsFr}')`}>
								<Button>
									Edit application
								</Button>
							</Link>
						</Slots.Actions> */}
						<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>
											Name
										</TableCell>
										<TableCell className="font-semibold">
											{name}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Semester
										</TableCell>
										<TableCell className="font-semibold">
											{semester}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Study program
										</TableCell>
										<TableCell className="font-semibold">
											{studyProgram}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Home University Country
										</TableCell>
										<TableCell className="font-semibold">
											{countryOfUniversity}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Preferred buddy gender
										</TableCell>
										<TableCell className="font-semibold">
											{preferredBuddySex}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableWrapper>
				</div>
			</>
		)
	} else {
		if (!semester) {
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
				<h2 className="text-xl font-semibold">Information about you</h2>
				<hr className="my-2 border-gray-200" />
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
						{/* <SelectField field={'university'} label="Home university" options={'University'} description="If you are coming to VŠE as an exchange student. Please choose the university you're coming from. Otherwise leave it blank.">
							<Field field={'name'} />
						</SelectField> */}
						<SelectField field={'countryOfUniversity'} label="Home university country *" options={'Country'} description="Country where you attend university.">
							<Field field={'name'} />
						</SelectField>
						{/* <SelectField field={'faculty'} label="Faculty at VSE" options={'Faculty'}>
							<Field field={'name'} />
						</SelectField> */}
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
					options={{ man: 'Man', woman: 'Woman', dontCare: 'Not preferred' }}
				/>
			</div>
			<div className='flex flex-col space-y-4 w-36 pt-2'>
				<Button onClick={handlePersist}>Apply for buddy</Button>
			</div>
			</FormLayout>)
		}
	}
	}, (_, env) => (
		<>
			<EntityListSubTree
				entities="Semester"
				alias={'allSemesters'}
			>
				<Field field="name" />
				<Field field="id" />
				<Field field="openForCzechBuddyRegistrationsDate" />
				<Field field="closeBuddyRegistrations" />
			</EntityListSubTree>
			<EntitySubTree
				entity={`ApplicationFr(person.tenantPerson.id='${env.getExtension(identityEnvironmentExtension).identity?.person?.id}')`}
				alias={'currentUserApplicationsFr'}
			>
				<Field field="id" />
				<Field field="person.firstName" />
				<Field field="person.studyProgram.name" />
				<Field field="person.countryOfUniversity.name" />
				<Field field="person.surname" />
				<Field field="semester.name" />
				<Field field="preferredBuddySex" />

			</EntitySubTree>
			<HasOne field="semester">
				<Field field={'name'} />
				<Field field="id" />
				<Field field="openForCzechBuddyRegistrationsDate" />
				<Field field="closeBuddyRegistrations" />
			</HasOne>
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
				<HasOne field="countryOfUniversity">
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
				<HasOne field="countryOfUniversity">
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
