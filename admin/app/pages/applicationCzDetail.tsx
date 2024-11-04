import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { EntitySubTree, Field, Link } from '@contember/interface'

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
					<EntitySubTree entity="ApplicationCz(id=$id)" isCreating={false}>
						<Slots.Actions>
							<Link to="applicationCzCreate(id: $entity.id)">
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
											<Field field="preferredSex" />
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
