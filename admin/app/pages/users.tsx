import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridBooleanColumn, DataGridColumn, DataGridDateColumn, DataGridHasOneColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
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
							<Link to="userCreate">
								<Button>
									Create user
								</Button>
							</Link>
						</Slots.Actions>
						<DataGrid entities="User">
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
									<DataGridHasOneColumn field="university" header="University">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridTextColumn field="esnCardId" header="Esn card id" />
									<DataGridTextColumn field="surname" header="Surname" />
									<DataGridTextColumn field="xname" header="Xname" />
									<DataGridBooleanColumn field="active" header="Active" />
									<DataGridHasOneColumn field="country" header="Country">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridTextColumn field="firstName" header="First name" />
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
