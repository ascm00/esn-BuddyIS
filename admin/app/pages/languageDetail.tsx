import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridEnumColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { EntitySubTree, Field, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Language detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Language(id=$id)" isCreating={false}>
						<Slots.Actions>
							<Link to="languageEdit(id: $entity.id)">
								<Button>
									Edit language
								</Button>
							</Link>
						</Slots.Actions>
						<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>
											Name
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="name" />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableWrapper>
					</EntitySubTree>
					<div className="flex flex-col gap-4">
						<div className="text-lg font-bold">
							Application fr
						</div>
						<Slots.Actions>
							<Link to="applicationFrCreate">
								<Button>
									Create application fr
								</Button>
							</Link>
						</Slots.Actions>
						<DataGrid entities="ApplicationFr[language.id = $id]">
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
									<DataGridEnumColumn
										field="status"
										header="Status"
										options={{ enabled: 'enabled', disabled: 'disabled', cancelled: 'cancelled' }}
									/>
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
								</DataGridTable>
							</DataGridLoader>
							<DataGridPagination />
						</DataGrid>
					</div>
				</div>
			</Binding>
		</>
	)
}
