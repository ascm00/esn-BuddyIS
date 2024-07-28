import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridEnumColumn, DataGridHasOneColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Application czs
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<Link to="applicationCzCreate">
								<Button>
									Create application cz
								</Button>
							</Link>
						</Slots.Actions>
						<DataGrid entities="ApplicationCz">
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
									<DataGridHasOneColumn field="semester" header="Semester">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridEnumColumn
										field="status"
										header="Status"
										options={{ enabled: 'enabled', disabled: 'disabled', cancelled: 'cancelled' }}
									/>
									<DataGridHasOneColumn field="preferredCountry" header="Preferred country">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridEnumColumn
										field="preferredSex"
										header="Preferred sex"
										options={{ man: 'man', woman: 'woman', dontCare: 'dontCare' }}
									/>
									<DataGridHasOneColumn field="person" header="User">
										<Field field="firstName" /> <Field field="surname" />
									</DataGridHasOneColumn>
									<DataGridEnumColumn field="result" header="Result" options={{ accepted: 'accepted', declined: 'declined' }} />
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
