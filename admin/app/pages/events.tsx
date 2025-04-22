import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridDateFilter, DataGridEnumColumn, DataGridHasOneFilter, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { SetCurrentSemesterByDefault } from '@app/lib/datagrid/filters/sessionStorageSemesterFilter'
import { UDDropdown } from '@app/lib/datagrid/UDDropdown'
import { Slots } from '@app/lib/layout'
import { AlertDialogHeader } from '@app/lib/ui/alert-dialog'
import { Button } from '@app/lib/ui/button'
import { WhatsappLink } from '@app/lib/utils/link'
import { useIsMobile } from '@app/lib/utils/use-mobile'
import { Component, EntityListSubTree, Field, HasRole, Link, useEntity, useEntityList, useEntityListSubTree, useIdentity, useProjectUserRoles } from '@contember/interface'
import { Edit, EditIcon, Eye, File, FileText, History, PlusCircle, PlusCircleIcon } from 'lucide-react'
import EventCreate from './eventCreate'
import { EventCreateForm } from '@app/components/forms/event-create-form'
import { DropdownMenuItem } from '@app/lib/ui/dropdown'

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
							<SetCurrentSemesterByDefault keyParam='events__Event-filters' /> 
							<Slots.Actions>
								<Link to="eventCreate">
									<Button>
										{!isMobile && 'Create event'}
										{isMobile && <PlusCircle />}
									</Button>
								</Link>
							</Slots.Actions>
						</HasRole>
						<div className='-mt-12'>
							<PersonalizedDataGrid />
						</div>
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
			<div className='flex flex-col gap-12'>
			<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('esnMember')}>
				<DataGrid entities="Event">
					<DataGridToolbar>
						<DataGridQueryFilter />
						<DataGridHasOneFilter field="semester" label="Semester">
							<Field field="name" />
						</DataGridHasOneFilter>
						<DataGridDateFilter field="startDate" label="Event date" />
					</DataGridToolbar>
					<DataGridLoader>
						<DataGridTable>
							<DataGridColumn>
								<div className="flex gap-2 -mr-3">
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
							<DataGridColumn>
								<UDDropdown
										editFormRedirect={
											<>
											<Link to="eventEdit(id: $entity.id)">
												<DropdownMenuItem className="hover:bg-accent" onSelect={e => e.preventDefault()}>
													<EditIcon className="w-4 mr-2" />
													<span>Edit</span>
												</DropdownMenuItem>
											</Link>
											</>
										}
									/>
							</DataGridColumn>
						</DataGridTable>
					</DataGridLoader>
					<DataGridPagination entity='events' />
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
					<DataGridPagination entity='events' />
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
					<DataGridPagination entity='events' />
				</DataGrid>
			</HasRole>
			</div>
		</>
		)
	}
)
