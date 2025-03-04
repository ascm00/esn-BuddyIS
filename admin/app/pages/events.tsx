import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridEnumColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { WhatsappLink } from '@app/lib/utils/link'
import { useIsMobile } from '@app/lib/utils/use-mobile'
import { Component, Field, HasRole, Link, useEntity, useIdentity, useProjectUserRoles } from '@contember/interface'
import { Edit, Eye, File, History, PlusCircle } from 'lucide-react'

export default () => {

	const roles = useProjectUserRoles()
	const isMobile = useIsMobile()

	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Events 🎈
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
							<Slots.Actions>
								<Link to="eventsAllSemesters">
									<Button>
										{isMobile ? <History /> : 'All semesters events'}
									</Button>
								</Link>
								<Link to="eventCreate">
									<Button>
										{!isMobile && 'Create event'}
										{isMobile && <PlusCircle />}
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
								<div className="flex gap-2">
									<Link to="eventDetail(id: $entity.id)">
										<Button variant={'secondary'} size={'sm'}>
											Detail
										</Button>
									</Link>
									<Link to="eventEdit(id: $entity.id)">
										<Button variant={'secondary'} size={'sm'}>
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
							<DataGridColumn header="Whatsapp link">
								<WhatsappLink />
							</DataGridColumn>
						</DataGridTable>
					</DataGridLoader>
					<DataGridPagination />
				</DataGrid>
			</HasRole>
			<HasRole role={roles => roles.has('czechBuddy')}>
				<DataGrid entities="Event[semester.isCurrent=true && isForCzechBuddies=true]">
					<DataGridToolbar noExport>
						<DataGridQueryFilter />
					</DataGridToolbar>
					<DataGridLoader>
						<DataGridTable>
							<DataGridColumn>
								<div className="flex gap-2">
									<Link to="eventDetail(id: $entity.id)">
										<Button variant={'secondary'} size={'sm'}>
											Detail
										</Button>
									</Link>
								</div>
							</DataGridColumn>
							<DataGridTextColumn field="name" header="Name" />
							<DataGridTextColumn field="place" header="Place" />
							{/* Capacity musí být kolik zbývá volných míst z kolika */}
							{/* <DataGridNumberColumn field="capacity" header="Capacity" />
							<DataGridNumberColumn field="registeredCount.registered_count" header="Registered" /> */}
							<DataGridNumberColumn field="fee" header="Entrance fee">
								<Field field="fee" /> {' CZK'}
							</DataGridNumberColumn>
							<DataGridDateColumn field="startDate" header="Event starts" />
							<DataGridDateColumn field="endDate" header="Event ends" />
							<DataGridDateColumn field="registrationStartDate" header="Registration starts" />
							<DataGridDateColumn field="registrationEndDate" header="Registration ends" />
							<DataGridColumn header="Whatsapp link">
								<WhatsappLink />
							</DataGridColumn>
						</DataGridTable>
					</DataGridLoader>
					<DataGridPagination />
				</DataGrid>
			</HasRole>
			<HasRole role={roles => roles.has('internationalStudent')}>
				<DataGrid entities="Event[semester.isCurrent=true && isForInternationalStudents=true]">
					<DataGridToolbar noExport>
						<DataGridQueryFilter />
					</DataGridToolbar>
					<DataGridLoader>
						<DataGridTable>
							<DataGridColumn>
								<div className="flex gap-2">
									<Link to="eventDetail(id: $entity.id)">
										<Button variant={'secondary'} size={'sm'}>
											Detail
										</Button>
									</Link>
								</div>
							</DataGridColumn>
							<DataGridTextColumn field="name" header="Name" />
							<DataGridTextColumn field="place" header="Place" />
							{/* Capacity musí být kolik zbývá volných míst z kolika */}
							{/* <DataGridNumberColumn field="capacity" header="Capacity" />
							<DataGridNumberColumn field="registeredCount.registered_count" header="Registered" /> */}
							<DataGridNumberColumn field="fee" header="Entrance fee">
								<Field field="fee" /> {' CZK'}
							</DataGridNumberColumn>
							<DataGridDateColumn field="startDate" header="Event starts" />
							<DataGridDateColumn field="endDate" header="Event ends" />
							<DataGridDateColumn field="registrationStartDate" header="Registration starts" />
							<DataGridDateColumn field="registrationEndDate" header="Registration ends" />
							<DataGridColumn header="Whatsapp link">
								<WhatsappLink />
							</DataGridColumn>
						</DataGridTable>
					</DataGridLoader>
					<DataGridPagination />
				</DataGrid>
			</HasRole>
		</>
		)
	}
)
