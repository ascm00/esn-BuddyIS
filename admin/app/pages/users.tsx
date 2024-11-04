import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridBooleanColumn, DataGridColumn, DataGridDateColumn, DataGridEnumFilter, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, HasRole, Link } from '@contember/interface'

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
							<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('esnMember')}>
								<Link to="personCreate">
										<Button>
											Create user
										</Button>
								</Link>
							</HasRole>
						</Slots.Actions>
						<DataGrid entities="Person">
							<DataGridToolbar>
								<DataGridQueryFilter />
								<DataGridHasOneFilter field="countryOfUniversity" label="Home university country">
									<Field field="name" />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field="studyProgram" label="Study program">
									<Field field="name" />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field="applicationsFr.semester" label="All international students per semester">
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
											<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
												<Link to="userEdit(id: $entity.id)">
													<Button>
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
									<DataGridHasOneColumn field="studyProgram" header="Study program">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridTextColumn field="esnCardId" header="Esn card id" />
									<DataGridTextColumn field="xname" header="inSIS username" />
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
					</>
				</div>
			</Binding>
		</>
	)
}
