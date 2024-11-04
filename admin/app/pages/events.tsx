import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridEnumColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Component, Field, HasRole, Link, useEntity, useIdentity, useProjectUserRoles } from '@contember/interface'

export default () => {

	const roles = useProjectUserRoles()

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
						<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
							<Slots.Actions>
								<Link to="eventsAllSemesters">
									<Button>
										All semesters events
									</Button>
								</Link>
								<Link to="eventCreate">
									<Button>
										Create event
									</Button>
								</Link>
							</Slots.Actions>
						</HasRole>
						<PersonalizedDataGrid />
					</>
				</div>
			</Binding>
		</>
	)
}

const PersonalizedDataGrid = Component(
	() => {
		return(
			<>
			<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('esnMember')}>
				<DataGrid entities="Event[semester.isCurrent=true]">
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
									<Link to="eventEdit(id: $entity.id)">
										<Button>
											Edit
										</Button>
									</Link>
								</div>
							</DataGridColumn>
							<DataGridTextColumn field="name" header="Name" />
							<DataGridTextColumn field="place" header="Place" />
							{/* Capacity musí být kolik zbývá volných míst z kolika */}
							<DataGridNumberColumn field="capacity" header="Capacity" />
							<DataGridNumberColumn field="registeredCount.registered_count" header="Registered" />
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
			</HasRole>
			<HasRole role={roles => roles.has('czechBuddy')}>
				<DataGrid entities="Event[semester.isCurrent=true && isForCzechBuddies=true]">
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
								</div>
							</DataGridColumn>
							<DataGridTextColumn field="name" header="Name" />
							<DataGridTextColumn field="place" header="Place" />
							{/* Capacity musí být kolik zbývá volných míst z kolika */}
							<DataGridNumberColumn field="capacity" header="Capacity" />
							<DataGridNumberColumn field="registeredCount.registered_count" header="Registered" />
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
			</HasRole>
			<HasRole role={roles => roles.has('internationalStudent')}>
				<DataGrid entities="Event[semester.isCurrent=true && isForInternationalStudents=true]">
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
								</div>
							</DataGridColumn>
							<DataGridTextColumn field="name" header="Name" />
							<DataGridTextColumn field="place" header="Place" />
							{/* Capacity musí být kolik zbývá volných míst z kolika */}
							<DataGridNumberColumn field="capacity" header="Capacity" />
							<DataGridNumberColumn field="registeredCount.registered_count" header="Registered" />
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
			</HasRole>
		</>
		)
	}
)
