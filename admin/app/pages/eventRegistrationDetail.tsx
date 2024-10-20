import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { EntitySubTree, Field, HasMany, HasRole, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Event reservation detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="EventRegistration(id=$id)" isCreating={false}>
						<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
							<Table>
								<TableBody>
                                    <TableRow>
										<TableCell>
											Person
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="person.firstName" /> {' '} <Field field="person.surname" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Paid
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="paid" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Event
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="event.name" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Note
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="note" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Waiting list
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="isWaitingList" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Dietary restrictions
										</TableCell>
										<TableCell className="font-semibold">
                                            <HasMany field="dietaryRestrictions">
                                                <Field field="name" />
                                            </HasMany>
										</TableCell>
									</TableRow>
                                    <TableRow>
										<TableCell>
											Allergies
										</TableCell>
										<TableCell className="font-semibold">
                                            <HasMany field="allergies">
                                                <Field field="name" />
                                            </HasMany>
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
