import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridEnumColumn, DataGridHasOneColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Application frs
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<Link to="applicationFrCreate">
								<Button>
									Create application fr
								</Button>
							</Link>
						</Slots.Actions>
						<DataGrid entities="ApplicationFr">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="applicationFrDetail(id: $entity.id)">
												<a>
													Detail
												</a>
											</Link>
											<Link to="applicationFrEdit(id: $entity.id)">
												<a>
													Edit
												</a>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridHasOneColumn field="semester" header="Semester">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridEnumColumn
										field="status"
										header="Status"
										options={{ enabled: 'enabled', disabled: 'disabled', cancelled: 'cancelled' }}
									/>
									<DataGridHasOneColumn field="language" header="Language">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridEnumColumn
										field="rating"
										header="Rating"
										options={{ one: 'one', three: 'three', four: 'four', five: 'five', two: 'two' }}
									/>
									<DataGridNumberColumn field="rBuddy" header="R buddy" />
									<DataGridNumberColumn field="rParty" header="R party" />
									<DataGridNumberColumn field="rTravel" header="R travel" />
									<DataGridNumberColumn field="rSport" header="R sport" />
									<DataGridEnumColumn
										field="preferredBuddySex"
										header="Preferred buddy sex"
										options={{ man: 'man', woman: 'woman', dontCare: 'dontCare' }}
									/>
									<DataGridTextColumn field="emailForInformation" header="Email for information" />
									<DataGridHasOneColumn field="limitations" header="Limitation">
										<Field field="id" />
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
