import { FacultyEditForm } from '@app/components/forms/faculty-edit-form'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { CurrentEntityLazyModalEdit } from '@app/lib/buttons/modalEdit'
import { DataGrid, DataGridBooleanColumn, DataGridColumn, DataGridDateColumn, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
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
						Faculty detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Faculty(id=$id)" isCreating={false}>
						<Slots.Actions>
						<CurrentEntityLazyModalEdit
							dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
							buttonContent={
								<span className="flex items-center">
									Edit faculty
								</span>
							}
						>
							<FacultyEditForm />
						</CurrentEntityLazyModalEdit>
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
							Users
						</div>
						<DataGrid entities="Person[faculty.id = $id]">
						<DataGridToolbar>
								<DataGridQueryFilter />
								<DataGridHasOneFilter field="countryOfUniversity" label="Home university country">
									<Field field="name" />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field="university" label="University">
									<Field field="name" />
								</DataGridHasOneFilter>
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-2">
											<Link to="userDetail(id: $entity.id)">
												<Button variant={'secondary'} size={'sm'}>
													Detail
												</Button>
											</Link>
											<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
												<Link to="userEdit(id: $entity.id)">
													<Button variant={'secondary'} size={'sm'}>
														Edit
													</Button>
												</Link>
											</HasRole>
										</div>
									</DataGridColumn>
									<DataGridTextColumn field="firstName" header="First name" />
									<DataGridTextColumn field="surname" header="Surname" />
									<DataGridTextColumn field="phoneNumber" header="Phone number" />
									<DataGridHasOneColumn field="tenantPerson" header="Email">
										<Field field="email" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="university" header="Home university">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridTextColumn field="esnCardId" header="Esn card id" />
									<DataGridTextColumn field="inSISusername" header="InSIS username" />
									<DataGridHasOneColumn field="countryOfUniversity" header="Country of home university">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="tenantPerson" header="Role">
										<Field field="roles" />
									</DataGridHasOneColumn>
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
