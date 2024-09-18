import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridBooleanColumn, DataGridColumn, DataGridHasOneColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Buddy pairs
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
									<DataGridHasOneColumn field="coordinator" header="Coordinator">
										<Field field="firstName" /> {' '} <Field field="surname" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="czechStudent" header="Czech student">
										<Field field="firstName" /> {' '} <Field field="surname" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="internationalStudent" header="International student">
										<Field field="firstName" /> {' '} <Field field="surname" />
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
