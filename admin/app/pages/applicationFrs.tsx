import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { DataGrid, DataGridColumn, DataGridEnumColumn, DataGridEnumFilter, DataGridHasManyColumn, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { SetCurrentSemesterByDefault } from '@app/lib/datagrid/filters/sessionStorageSemesterFilter'
import { UDDropdown } from '@app/lib/datagrid/UDDropdown'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { DropdownMenuItem } from '@app/lib/ui/dropdown'
import { useIsMobile } from '@app/lib/utils/use-mobile'
import { Field, HasRole, Link } from '@contember/interface'
import { EditIcon, History, PlusCircle, TrashIcon } from 'lucide-react'

export default () => {
	const isMobile = useIsMobile()
	return (
		<>
			<Binding>
			<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('ozsRole')}>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Current semester - Foreign applications
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
								<SetCurrentSemesterByDefault keyParam='applicationFrs__ApplicationFr-filters' /> 
								<Link to="applicationFrCreateAdmin">
									<Button>
										{isMobile ? <PlusCircle /> : 'Create application'}
									</Button>
								</Link>
							{/* <Link to="applicationFrCreate">
								<Button>
									Create application FR
								</Button>
							</Link> */}
						</Slots.Actions>
						<DataGrid entities="ApplicationFr">
							<DataGridToolbar copyingMails="applications">
								<DataGridQueryFilter />
								<DataGridHasOneFilter field={'semester'} label="Semester">
									<Field field={'name'} />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field={'person.studyProgram'} label={'Study program'}>
									<Field field={'name'} />
								</DataGridHasOneFilter>
								<DataGridEnumFilter field={'status'} options={{ toBePaired: 'No', paired: 'Yes' }} label="Paired" />
								<DataGridHasOneFilter field={'person.countryOfUniversity'} label={'Country of University'}>
									<Field field={'name'} />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field={'person.languages'} label="Languages spoken">
									<Field field={'name'} />
								</DataGridHasOneFilter>
								<DataGridEnumFilter field="preferredBuddySex"
										label="Preferred buddy gender"
										options={{ man: 'Man', woman: 'Woman', dontCare: 'Not preferred' }}
								/>
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridHasOneColumn field="person" header="Name" >
										<Field field="firstName" />{' '}<Field field="surname" />{' ('}<Field field="inSISusername" />{') '}
									</DataGridHasOneColumn>
									<DataGridTextColumn field="person.studyProgram.name" header="Study program" />
									<DataGridTextColumn field="person.countryOfUniversity.name" header="Home university country" />
									<DataGridHasManyColumn field="person.languages" header="Languages spoken">
										<Field field="name" />
									</DataGridHasManyColumn>
									<DataGridEnumColumn
										field="preferredBuddySex"
										header="Preferred buddy gender"
										options={{ man: 'Man', woman: 'Woman', dontCare: 'Not preferred' }}
									/>
									<DataGridEnumColumn
										field="status"
										header="Status"
										options={{ toBePaired: 'To be paired', paired: 'Paired', notPaired: 'Not paired' }}
									/>
									<DataGridHasOneColumn field="person" header="Email" >
										<Field field="tenantPerson.email" />
									</DataGridHasOneColumn>
									<HasRole role={roles => roles.has('admin') || roles.has('coordinator')}>
										<DataGridColumn>
											<UDDropdown
												editFormRedirect={
													<>
													<Link to="applicationFrEdit(id: $entity.id)">
														<DropdownMenuItem className="hover:bg-accent" onSelect={e => e.preventDefault()}>
															<EditIcon className="w-4 mr-2" />
															<span>Edit</span>
														</DropdownMenuItem>
													</Link>
													</>
												}
												deleteForm={
													<div className='w-full'>
													<DeleteEntityModalButton 
														message="Do you really want to delete?"
														deleteMessage="Delete"
														cancelTo={'applicationFrs'}
														afterPersistTo={'applicationFrs'}
													>
														<DropdownMenuItem className='w-[150px]' onSelect={e => e.preventDefault()}>
															<TrashIcon className="w-4 mr-2" color='red' />
															<span>Delete</span>
														</DropdownMenuItem>
													</DeleteEntityModalButton>
													</div>
												}
											/>
										</DataGridColumn>
									</HasRole>
								</DataGridTable>
							</DataGridLoader>
							<DataGridPagination />
						</DataGrid>
					</>
				</div>
				</HasRole>
			</Binding>
		</>
	)
}
