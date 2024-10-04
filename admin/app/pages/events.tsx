import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridEnumColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Component, Field, HasRole, Link, useEntity, useIdentity } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Events
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<HasRole role={roles => roles.has('admin') || roles.has('esnMemberRole') || roles.has('coordinator')}>
							<Slots.Actions>
								<Link to="eventCreate">
									<Button>
										Create event
									</Button>
								</Link>
							</Slots.Actions>
						</HasRole>
						<DataGrid entities="Event">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="eventDetail(id: $entity.id)">
												<Button>
													Detail
												</Button>
											</Link>
											<HasRole role={'admin'}>
												<Link to="eventEdit(id: $entity.id)">
													<Button>
														Edit
													</Button>
												</Link>
											</HasRole>
										</div>
									</DataGridColumn>
									<DataGridTextColumn field="name" header="Name" />
									<DataGridTextColumn field="place" header="Place" />
									{/* Capacity musí být kolik zbývá volných míst z kolika */}
									<DataGridNumberColumn field="capacity" header="Capacity" />
									<DataGridNumberColumn field="registeredCount" header="Registered" />
									<DataGridNumberColumn field="fee" header="Entrance fee">
										<Field field="fee" /> {' CZK'}
									</DataGridNumberColumn>
									<DataGridDateColumn field="startDate" header="Event starts" />
									<DataGridDateColumn field="endDate" header="Event ends" />
									<DataGridDateColumn field="registrationStartDate" header="Registration starts" />
									<DataGridDateColumn field="registrationEndDate" header="Registration ends" />
									<DataGridTextColumn field="whatsappLink" header="Whatsapp link" />
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
