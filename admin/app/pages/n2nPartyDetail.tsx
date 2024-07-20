import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridToolbar } from '@app/lib/datagrid'
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
						N2n party detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="N2nParty(id=$id)" isCreating={false}>
						<Slots.Actions>
							<Link to="n2nPartyEdit(id: $entity.id)">
								<Button>
									Edit n2n party
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
									<TableRow>
										<TableCell>
											Date
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="date" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Open
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="open" />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableWrapper>
					</EntitySubTree>
					<div className="flex flex-col gap-4">
						<div className="text-lg font-bold">
							N2n hour
						</div>
						<Slots.Actions>
							<Link to="n2nHourCreate">
								<Button>
									Create n2n hour
								</Button>
							</Link>
						</Slots.Actions>
						<DataGrid entities="N2nHour[party.id = $id]">
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
