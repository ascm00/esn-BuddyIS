import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridHasOneColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Universities
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<Link to="universityCreate">
								<Button>
									Create university
								</Button>
							</Link>
						</Slots.Actions>
						<DataGrid entities="University">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="universityDetail(id: $entity.id)">
												<a>
													Detail
												</a>
											</Link>
											<Link to="universityEdit(id: $entity.id)">
												<a>
													Edit
												</a>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridTextColumn field="name" header="Name" />
									<DataGridHasOneColumn field="country" header="Country">
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
