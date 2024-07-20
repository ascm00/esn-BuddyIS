import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridEnumColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
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
						User detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="User(id=$id)" isCreating={false}>
						<Slots.Actions>
							<Link to="userEdit(id: $entity.id)">
								<Button>
									Edit user
								</Button>
							</Link>
						</Slots.Actions>
						<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>
											Registration date
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="registrationDate" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Last login date
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="lastLoginDate" />
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
									<TableRow>
										<TableCell>
											Esn card id
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="esnCardId" />
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
											Xname
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="xname" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Active
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="active" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											First name
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="firstName" />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableWrapper>
					</EntitySubTree>
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
						<DataGrid entities="ApplicationCz[user.id = $id]">
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
											<Link to="applicationCzEdit(id: $entity.id)">
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
