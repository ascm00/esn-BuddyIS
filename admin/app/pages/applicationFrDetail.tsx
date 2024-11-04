import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { Component, EntitySubTree, Field, Link, useEntity } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Application created successfully!
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="ApplicationFr(id=$id)" isCreating={false}>
						<Slots.Actions>
							<Link to="applicationFrEdit(id: $entity.id)">
								<Button>
									Edit application
								</Button>
							</Link>
						</Slots.Actions>
						<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
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
											<Field field="semester.name" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Study program
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="person.studyProgram.name" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Home University Country
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="person.countryOfUniversity.name" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Preferred buddy gender
										</TableCell>
										<TableCell className="font-semibold">
											<PreferredSexCell />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableWrapper>
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}

const PreferredSexCell = Component(() => {
	const entity = useEntity()
	const preferredSex = entity.getField('preferredSex').value

	if(preferredSex === 'dontCare') {
		return 'Not preferred'
	} else if (preferredSex === 'man') {
		return 'Man'
	} else if (preferredSex === 'woman') {
		return 'Woman'
	}
	return null
}, () => (
	<>
		<Field field="preferredBuddySex" />
	</>
))
