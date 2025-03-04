import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridEnumColumn, DataGridHasManyFilter, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { EntitySubTree, Field, HasRole, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						User detail 👤
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Person(id=$id)" isCreating={false}>
						<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
							<Slots.Actions>
								<Link to="personEdit(id: $entity.id)">
									<Button>
										Edit user
									</Button>
								</Link>
							</Slots.Actions>
						</HasRole>
						<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>
											First name
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="firstName" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Surname
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="surname" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											InSIS username
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="inSISusername" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Email
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="tenantPerson.email" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Phone number
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="phoneNumber" />
										</TableCell>
									</TableRow>
									<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
										<TableRow>
											<TableCell>
												ESNcard ID
											</TableCell>
											<TableCell className="font-semibold">
												<Field field="esnCardId" />
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												Home university country
											</TableCell>
											<TableCell className="font-semibold">
												<Field field="countryOfUniversity.name" />
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												Home university
											</TableCell>
											<TableCell className="font-semibold">
												<Field field="university.name" />
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												Faculty at VSE
											</TableCell>
											<TableCell className="font-semibold">
												<Field field="faculty.name" />
											</TableCell>
										</TableRow>
									</HasRole>
								</TableBody>
							</Table>
						</TableWrapper>
					</EntitySubTree>
					<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
							<div className="flex flex-col gap-4">
								<div className="flex justify-between">
									<div className="text-xl font-bold">Event registrations</div>
								</div>
								<DataGrid entities="EventRegistration[person.id = $id]" filteringStateStorage={'session'}>
									<DataGridToolbar>
										<DataGridQueryFilter />
										<DataGridHasOneFilter field="person" label="User">
											<Field field="firstName" /> {' '} <Field field="surname" />
										</DataGridHasOneFilter>
										<DataGridHasManyFilter field="allergies" label="Allergies">
											<Field field="name" />
										</DataGridHasManyFilter>
										<DataGridHasManyFilter field="dietaryRestrictions" label="Dietary Restrictions">
											<Field field="name" />
										</DataGridHasManyFilter>
									</DataGridToolbar>
									<DataGridLoader>
										<DataGridTable>
											<DataGridColumn>
												<div className="flex gap-2">
													<Link to="eventDetail(id: $entity.event.id)">
														<Button variant={'secondary'} size={'sm'}>Detail</Button>
													</Link>
												</div>
											</DataGridColumn>
											<DataGridTextColumn field="event.name" header="Name" />
											<DataGridTextColumn field="event.place" header="Place" />
											<DataGridDateColumn field="event.startDate" header="Event From" />
											<DataGridDateColumn field="event.endDate" header="Event To" />
											<DataGridTextColumn field="note" header="Note" />
										</DataGridTable>
									</DataGridLoader>
								</DataGrid>
							</div>
						</HasRole>
				</div>
			</Binding>
		</>
	)
}
