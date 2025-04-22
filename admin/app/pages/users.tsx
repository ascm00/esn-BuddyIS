import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridBooleanColumn, DataGridColumn, DataGridDateColumn, DataGridEnumColumn, DataGridEnumFilter, DataGridHasManyColumn, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { UDDropdown } from '@app/lib/datagrid/UDDropdown'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { useIsMobile } from '@app/lib/utils/use-mobile'
import { Field, HasRole, Link } from '@contember/interface'
import { EditIcon, PlusCircle } from 'lucide-react'
import PersonEdit from './personEdit'
import { DropdownMenuItem } from '@app/lib/ui/dropdown'

export default () => {
	const isMobile = useIsMobile()
	return (
		<>
		<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('esnMember')}>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Users 👤
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('esnMember')}>
								<Link to="personCreate">
										<Button>
											{isMobile ? <PlusCircle /> : 'Create user'}
										</Button>
								</Link>
							</HasRole>
						</Slots.Actions>
						<DataGrid entities="Person">
							<DataGridToolbar copyingMails='person'>
								<DataGridQueryFilter />
								<DataGridHasOneFilter field="countryOfUniversity" label="Home university country">
									<Field field="name" />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field="studyProgram" label="Study program">
									<Field field="name" />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field="applicationsFr.semester" label="International students per semester">
									<Field field="name" />
								</DataGridHasOneFilter>
								<DataGridEnumFilter field='gender' options={{man: 'Man', woman: 'Woman', other: 'Other'}} label="Gender" />
								<DataGridEnumFilter field={'tenantPerson.roles'} options={{admin: 'Admin', coordinator: 'Coordinator', esnMember: 'ESN member', czechBuddy: 'Local buddy', internationalStudent: 'International student', ozsRole: 'OZS member'}} label="Role" />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-2">
											<Link to="userDetail(id: $entity.id)">
												<Button variant={'secondary'} size={'sm'}>
													Detail
												</Button>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridTextColumn field="firstName" header="First name" />
									<DataGridTextColumn field="surname" header="Surname" />
									<DataGridTextColumn field="phoneNumber" header="Phone number" />
									<DataGridTextColumn field="inSISusername" header="inSIS username" />
									<DataGridHasOneColumn field="tenantPerson" header="Email">
										<Field field="email" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="university" header="Home university">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridEnumColumn field='gender' options={{man: 'Man', woman: 'Woman', other: 'Other'}} header="Gender" />
									<DataGridHasOneColumn field="studyProgram" header="Study program">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridTextColumn field="esnCardId" header="ESNcard id" />
									<DataGridHasOneColumn field="countryOfUniversity" header="Country of home university">
										<Field field="name" />
									</DataGridHasOneColumn>
									{/* <DataGridHasManyColumn field="registrations" header="Event reigstrations">
										<Field field="event.name" />
									</DataGridHasManyColumn> */}
									{/* <DataGridHasOneColumn field="tenantPerson" header="Role">
										<Field field="roles" />
									</DataGridHasOneColumn> */}
									<DataGridEnumColumn field="tenantPerson.roles" header="Role" options={{admin: 'Admin', coordinator: 'Coordinator', esnMember: 'ESN member', czechBuddy: 'Local buddy', internationalStudent: 'International student', ozsRole: 'OZS member'}} />
									<DataGridColumn>
											<div className='flex justify-end'>
											<UDDropdown
												editFormRedirect={
													<>
													<Link to="personEdit(id: $entity.id)">
														<DropdownMenuItem className="hover:bg-accent" onSelect={e => e.preventDefault()}>
															<EditIcon className="w-4 mr-2" />
															<span>Edit</span>
														</DropdownMenuItem>
													</Link>
													</>
												}
											/>
											</div>
										</DataGridColumn>
								</DataGridTable>
							</DataGridLoader>
							<DataGridPagination />
						</DataGrid>
					</>
				</div>
			</Binding>
			</HasRole>
		</>
	)
}
