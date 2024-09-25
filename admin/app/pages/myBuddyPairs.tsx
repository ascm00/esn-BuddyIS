import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridBooleanColumn, DataGridBooleanFilter, DataGridColumn, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, Link, useIdentity } from '@contember/interface'

export default () => {

	const personId = useIdentity()?.person?.id

	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						My buddy pairs
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						{/* <DataGrid entities="BuddyPair[semester.isCurrent=true]"> */}
						<DataGrid entities={`BuddyPair[coordinator.tenantPerson.id = '${personId}' && semester.isCurrent=true]`}>
							<DataGridToolbar>
								<DataGridQueryFilter />
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
									<DataGridHasOneColumn field="czechStudent" header="Czech student first name">
										<Field field="firstName" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="czechStudent" header="Czech student surname">
										<Field field="surname" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="czechStudent" header="Czech student xname">
										<Field field="xname" />
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
