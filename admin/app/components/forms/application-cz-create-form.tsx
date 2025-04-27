import { Binding, PersistButton } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridQueryFilter, DataGridHasOneFilter, DataGridColumn, DataGridTable, DataGridToolbar, DataGridLoader, DataGridHasOneColumn, DataGridHasManyColumn, DataGridNumberColumn, DataGridEnumColumn, DataGridPagination } from '@app/lib/datagrid'
import { Todo } from '@app/lib/dev'
import { FormLayout, InputField, MultiSelectField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { formatDateTime } from '@app/lib/formatting'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableCell, TableRow, TableBody, TableWrapper } from '@app/lib/ui/table'
import { formatDate } from '@app/lib/utils/formatting'
import { Component, EntityListSubTree, EntitySubTree, Field, HasMany, HasOne, HasRole, identityEnvironmentExtension, If, Link, useEntity, useEntityListSubTree, useEntitySubTree, useIdentity, usePersist } from '@contember/interface'
import { Alert, AlertDescription, AlertTitle } from '@app/lib/ui/alert'
import { Clock } from 'lucide-react'

export function NoSemesterOpen() {
	return (
	  <Alert variant={'default'} className='bg-blue-100'>
		<Clock className="h-4 w-4" />
		<AlertTitle>No semester open</AlertTitle>
		<AlertDescription>
			Sorry, applications for all semesters are closed now. 😕
		</AlertDescription>
	  </Alert>
	)
}

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
			const motivationValid = entity.getField('motivation').value ?? undefined

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

			if(semester && studyProgram && preferredCountryOfUniversity && motivationValid && languagesFilled && gender && preferredBuddySex && buddiesValid){
				persist()
			} else {
				alert('Please fill all the mandatory fields and make sure that number of buddies is between 1 and 10.')
			}

		}
	
		if(closed){
			return (<NoSemesterOpen />)
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
			return (
				<>
					<Slots.Actions>
						<Link to="myApplicationsCz">
							<Button>
								All my buddy applications
							</Button>
						</Link>
					</Slots.Actions>
					<FormLayout>
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
					</FormLayout>
					<div className='bg-blue-200 p-4 rounded-md'><div className='text-500'>You already applied for a buddy this semester. If you want to see your applications, click on the button "All my buddy applications" above. ☝️</div></div>
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
					<TextareaField field="motivation" label="Motivation *" required inputProps={{maxLength: 500}} description="Please describe why you want to be a buddy. Max length is 500 characters." />
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

const ApplicationCzDataGrid = Component(() => {

	const personId = useIdentity()?.person?.id

	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						My buddy applications
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
						<DataGrid entities={`ApplicationCz[person.tenantPerson.id='${personId}']`}>
							<DataGridToolbar>
								<DataGridQueryFilter />
                                <DataGridHasOneFilter field="semester" label="Semester">
                                    <Field field="name" />
                                </DataGridHasOneFilter>
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="applicationCzEdit(id: $entity.id)">
												<Button variant={'destructive'} size={'sm'}>
													Edit
												</Button>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridHasOneColumn field="semester" header="Semester">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridEnumColumn field="preferredSex" header="Preferred gender of buddy" options={{man: 'Man', woman: 'Woman', dontCare: 'Not preferred'}} />
									<DataGridHasOneColumn field="preferredCountry" header="Preferred country of university">
										<Field field="name" />
									</DataGridHasOneColumn>
                                    <DataGridHasManyColumn field="preferredLanguages" header="Preferred languages">
                                        <Field field="name" />
                                    </DataGridHasManyColumn>
                                    <DataGridNumberColumn field="howManyBuddiesAssigned.number" header="Number of buddies assigned" />
                                    <DataGridNumberColumn field="howManyBuddies" header="Maximum number of buddies" />
								</DataGridTable>
							</DataGridLoader>
							<DataGridPagination />
						</DataGrid>
				</div>
			</Binding>
		</>
	)

})