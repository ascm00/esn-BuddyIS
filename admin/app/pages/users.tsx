import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridBooleanColumn, DataGridColumn, DataGridDateColumn, DataGridEnumFilter, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Users
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
						<Link to="personCreate">
								<Button>
									Create user
								</Button>
							</Link>
						</Slots.Actions>
						<DataGrid entities="Person">
							<DataGridToolbar>
								<DataGridQueryFilter />
								<DataGridHasOneFilter field="country" label="Country">
									<Field field="name" />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field="university" label="University">
									<Field field="name" />
								</DataGridHasOneFilter>
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="userDetail(id: $entity.id)">
												<Button>
													Detail
												</Button>
											</Link>
											<Link to="userEdit(id: $entity.id)">
												<Button>
													Edit
												</Button>
											</Link>
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
									<DataGridTextColumn field="xname" header="Xname" />
									<DataGridHasOneColumn field="country" header="Home country">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="tenantPerson" header="Role">
										<Field field="roles" />
									</DataGridHasOneColumn>
								</DataGridTable>
							</DataGridLoader>
							<DataGridPagination />
						</DataGrid>
					</>
				</div>
			</Binding>
		</>
	)
}
