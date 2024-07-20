import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridEnumColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
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
						Section detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Section(id=$id)" isCreating={false}>
						<Slots.Actions>
							<Link to="sectionEdit(id: $entity.id)">
								<Button>
									Edit section
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
											Description
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="description" />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableWrapper>
					</EntitySubTree>
					<div className="flex flex-col gap-4">
						<div className="text-lg font-bold">
							Event
						</div>
						<Slots.Actions>
							<Link to="eventCreate">
								<Button>
									Create event
								</Button>
							</Link>
						</Slots.Actions>
						<DataGrid entities="Event[section.id = $id]">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="eventDetail(id: $entity.id)">
												<a>
													Detail
												</a>
											</Link>
											<Link to="eventEdit(id: $entity.id)">
												<a>
													Edit
												</a>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridTextColumn field="name" header="Name" />
									<DataGridDateColumn field="startDate" header="Start date" />
									<DataGridDateColumn field="endDate" header="End date" />
									<DataGridNumberColumn field="capacity" header="Capacity" />
									<DataGridNumberColumn field="fee" header="Fee" />
									<DataGridTextColumn field="place" header="Place" />
									<DataGridTextColumn field="whatsappLink" header="Whatsapp link" />
									<DataGridDateColumn field="registrationStartDate" header="Registration start date" />
									<DataGridDateColumn field="registrationEndDate" header="Registration end date" />
									<DataGridEnumColumn
										field="status"
										header="Status"
										options={{ open: 'open', cancelled: 'cancelled', hidden: 'hidden' }}
									/>
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
