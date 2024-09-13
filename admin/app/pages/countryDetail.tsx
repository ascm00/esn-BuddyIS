import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridBooleanColumn, DataGridColumn, DataGridDateColumn, DataGridEnumColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
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
						Country detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Country(id=$id)" isCreating={false}>
						<Slots.Actions>
							<Link to="countryEdit(id: $entity.id)">
								<Button>
									Edit country
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
											<Field field="name" />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableWrapper>
					</EntitySubTree>
					<div className="flex flex-col gap-4">
						<div className="text-lg font-bold">
							User
						</div>
						<DataGrid entities="Person[country.id = $id]">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="userDetail(id: $entity.id)">
												<a>
													Detail
												</a>
											</Link>
											<Link to="userEdit(id: $entity.id)">
												<a>
													Edit
												</a>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridDateColumn field="lastLoginDate" header="Last login date" />
									<DataGridTextColumn field="phoneNumber" header="Phone number" />
									<DataGridTextColumn field="esnCardId" header="Esn card id" />
									<DataGridTextColumn field="surname" header="Surname" />
									<DataGridTextColumn field="xname" header="Xname" />
									<DataGridBooleanColumn field="active" header="Active" />
									<DataGridTextColumn field="firstName" header="First name" />
								</DataGridTable>
							</DataGridLoader>
							<DataGridPagination />
						</DataGrid>
					</div>
					<div className="flex flex-col gap-4">
						<div className="text-lg font-bold">
							University
						</div>
						<Slots.Actions>
							<Link to="universityCreate">
								<Button>
									Create university
								</Button>
							</Link>
						</Slots.Actions>
						<DataGrid entities="University[country.id = $id]">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="universityDetail(id: $entity.id)">
												<a>
													Detail
												</a>
											</Link>
											<Link to="universityEdit(id: $entity.id)">
												<a>
													Edit
												</a>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridTextColumn field="name" header="Name" />
								</DataGridTable>
							</DataGridLoader>
							<DataGridPagination />
						</DataGrid>
					</div>
					<div className="flex flex-col gap-4">
						<div className="text-lg font-bold">
							Application cz
						</div>
						<Slots.Actions>
							<Link to="applicationCzCreate">
								<Button>
									Create application cz
								</Button>
							</Link>
						</Slots.Actions>
						<DataGrid entities="ApplicationCz[preferredCountry.id = $id]">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="applicationCzDetail(id: $entity.id)">
												<a>
													Detail
												</a>
											</Link>
											<Link to="applicationCzCreate(id: $entity.id)">
												<a>
													Edit
												</a>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridNumberColumn field="points" header="Point" />
									<DataGridTextColumn field="motivation" header="Motivation" />
									<DataGridEnumColumn
										field="status"
										header="Status"
										options={{ enabled: 'enabled', disabled: 'disabled', cancelled: 'cancelled' }}
									/>
									<DataGridEnumColumn field="result" header="Result" options={{ accepted: 'accepted', declined: 'declined' }} />
									<DataGridNumberColumn field="rBuddy" header="R buddy" />
									<DataGridNumberColumn field="rParty" header="R party" />
									<DataGridNumberColumn field="rTravel" header="R travel" />
									<DataGridNumberColumn field="rSport" header="R sport" />
									<DataGridEnumColumn
										field="preferredSex"
										header="Preferred sex"
										options={{ man: 'man', woman: 'woman', dontCare: 'dontCare' }}
									/>
								</DataGridTable>
							</DataGridLoader>
							<DataGridPagination />
						</DataGrid>
					</div>
				</div>
			</Binding>
		</>
	)
}
