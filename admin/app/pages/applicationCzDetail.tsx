import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { RadioEnumField } from '@app/lib/form'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { EnumCell } from '@contember/admin'
import { Component, EntitySubTree, Field, Link, useEntity } from '@contember/interface'
import { TrashIcon } from 'lucide-react'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Application successfully submitted!
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="ApplicationCz(id=$id)" isCreating={false}>
						<Slots.Actions>
							<Link to="applicationCzCreate(id: $entity.id)">
								<Button>
									Edit application
								</Button>
							</Link>
							<DeleteEntityModalButton 
								message="Are you completely sure to delete your buddy application?"
								deleteMessage="Delete"
								cancelTo={'myApplicationsCz'}
								afterPersistTo={'myApplicationsCz'}
							>
								<Button variant={'destructive'}>
									<TrashIcon />
								</Button>
							</DeleteEntityModalButton>
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
											Motivation
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="motivation" />
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
									<TableRow>
										<TableCell>
											Preferred country of university
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="preferredCountry.name" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											How many buddies max
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="howManyBuddies" />
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
		<Field field="preferredSex" />
	</>
))