import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridBooleanColumn, DataGridBooleanFilter, DataGridColumn, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Historic buddy pairs
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<Link to="buddyPairCreate">
								<Button>
									Create buddy pair
								</Button>
							</Link>
						</Slots.Actions>
						<DataGrid entities="BuddyPair">
							<DataGridToolbar>
								<DataGridQueryFilter />
								<DataGridHasOneFilter field="semester" label="Semester">
									<Field field="name" />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field="coordinator" label="Coordinator">
									<Field field="firstName" /> {' '} <Field field="surname" />
								</DataGridHasOneFilter>
								<DataGridBooleanFilter field="tenPoints" label="10 points" />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="buddyPairDetail(id: $entity.id)">
												<Button>
													Detail
												</Button>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridHasOneColumn field="semester" header="Semester">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="coordinator" header="Coordinator">
										<Field field="firstName" /> {' '} <Field field="surname" /> {' ('} <Field field="xname" /> {') '}
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="czechStudent" header="Czech student">
										<Field field="firstName" /> {' '} <Field field="surname" /> {' ('} <Field field="xname" /> {') '}
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="internationalStudent" header="International student">
										<Field field="firstName" /> {' '} <Field field="surname" /> {' ('} <Field field="xname" /> {') '}
									</DataGridHasOneColumn>
									<DataGridBooleanColumn field="tenPoints" header="10 points" />
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
