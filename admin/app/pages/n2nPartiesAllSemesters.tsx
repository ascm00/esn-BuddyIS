import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridBooleanColumn, DataGridColumn, DataGridDateColumn, DataGridHasManyColumn, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, HasRole, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						N2N parties
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
								<Link to="n2nPartyCreate">
									<Button>
										Create N2N party
									</Button>
								</Link>
							</HasRole>
						</Slots.Actions>
						<DataGrid entities="N2nParty">
							<DataGridToolbar>
								<DataGridQueryFilter />
								<DataGridHasOneFilter field="semester" label="Semester" options={'Semester'}>
									<Field field="name" />
								</DataGridHasOneFilter>
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="n2nPartyDetail(id: $entity.id)">
												<a>
													Detail
												</a>
											</Link>
											<Link to="n2nPartyEdit(id: $entity.id)">
												<a>
													Edit
												</a>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridTextColumn field="name" header="Name" />
									<DataGridDateColumn field="date" header="Date" />
									{/* <DataGridBooleanColumn field="open" header="Open" /> */}
									<DataGridHasOneColumn field="semester" header="Semester">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridTextColumn field="club" header="Club" />
									<DataGridTextColumn field="link" header="Link" />
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
