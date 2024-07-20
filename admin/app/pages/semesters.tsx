import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridHasManyColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Semesters
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<Link to="semesterCreate">
								<Button>
									Create semester
								</Button>
							</Link>
						</Slots.Actions>
						<DataGrid entities="Semester">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="semesterDetail(id: $entity.id)">
												<a>
													Detail
												</a>
											</Link>
											<Link to="semesterEdit(id: $entity.id)">
												<a>
													Edit
												</a>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridTextColumn field="name" header="Name" />
									<DataGridDateColumn field="startDate" header="Start date" />
									<DataGridDateColumn field="endDate" header="End date" />
									<DataGridHasManyColumn field="applications" header="Applications">
										<Field field="id" />
									</DataGridHasManyColumn>
									<DataGridHasManyColumn field="applicationsFr" header="Applications frs">
										<Field field="id" />
									</DataGridHasManyColumn>
									<DataGridHasManyColumn field="parties" header="Parties">
										<Field field="name" />
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
