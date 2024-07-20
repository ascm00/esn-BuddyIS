import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridHasOneColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						N2n hours
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<Link to="n2nHourCreate">
								<Button>
									Create n2n hour
								</Button>
							</Link>
						</Slots.Actions>
						<DataGrid entities="N2nHour">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="n2nHourDetail(id: $entity.id)">
												<a>
													Detail
												</a>
											</Link>
											<Link to="n2nHourEdit(id: $entity.id)">
												<a>
													Edit
												</a>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridDateColumn field="from" header="From" />
									<DataGridDateColumn field="to" header="To" />
									<DataGridHasOneColumn field="party" header="Party">
										<Field field="name" />
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
