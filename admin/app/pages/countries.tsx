import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridHasManyColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Countries
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<Link to="countryCreate">
								<Button>
									Create country
								</Button>
							</Link>
						</Slots.Actions>
						<DataGrid entities="Country">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="countryDetail(id: $entity.id)">
												<a>
													Detail
												</a>
											</Link>
											<Link to="countryEdit(id: $entity.id)">
												<a>
													Edit
												</a>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridHasManyColumn field="universities" header="Universities">
										<Field field="name" />
									</DataGridHasManyColumn>
									<DataGridTextColumn field="name" header="Name" />
									<DataGridHasManyColumn field="preferredApplicationsCz" header="Preferred applications czs">
										<Field field="id" />
									</DataGridHasManyColumn>
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
