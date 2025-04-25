import { ApplicationCzEditForm } from '@app/components/forms/application-cz-edit-form'
import { Navigation } from '@app/components/navigation'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { DataGrid, DataGridBooleanColumn, DataGridBooleanFilter, DataGridBooleanFilterSelect, DataGridColumn, DataGridEnumColumn, DataGridEnumFilter, DataGridHasManyColumn, DataGridHasManyFilter, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridNumberColumn, DataGridNumberFilter, DataGridNumberFilterSelect, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { SetCurrentSemesterByDefault } from '@app/lib/datagrid/filters/sessionStorageSemesterFilter'
import { UDDropdown } from '@app/lib/datagrid/UDDropdown'
import { formatBoolean, formatBooleanIcon, formatBooleanPair } from '@app/lib/formatting'
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
		<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('ozsRole')}>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Current semester - Local applications
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<SetCurrentSemesterByDefault keyParam='applicationCzs__ApplicationCz-filters' /> 
							<Link to="applicationCzCreateAdmin">
								<Button>
									{isMobile ? <PlusCircle /> : 'Create application'}
								</Button>
							</Link>
							{/* <Link to="applicationCzAdminCreate">
								<Button>
									Create application CZ
								</Button>
							</Link> */}
						</Slots.Actions>
						<DataGrid entities="ApplicationCz">
							<DataGridToolbar copyingMails="applications">
								<DataGridQueryFilter />
								<DataGridHasOneFilter field={'semester'} label="Semester">
									<Field field={'name'} />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field={'person.studyProgram'} label="Study Program">
									<Field field={'name'} />
								</DataGridHasOneFilter>
								{/* <DataGridNumberFilter field={'howManyBuddiesAssigned.number'} label="Buddies assigned" /> */}
								<DataGridBooleanFilter field='hasPair.isPaired' label="Paired" />
								<DataGridHasManyFilter field={'person.languages'} label="Languages spoken">
									<Field field={'name'} />
								</DataGridHasManyFilter>
								<DataGridHasManyFilter field={'preferredLanguages'} label="Preferred languages">
									<Field field={'name'} />
								</DataGridHasManyFilter>
								<DataGridEnumFilter field={'preferredSex'} label="Preferred gender" options={{ man: 'Man', woman: 'Woman', dontCare: 'Not preferred' }} />
								<DataGridBooleanFilter field="notPair" label="DO NOT pair" noNullFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<HasRole role={roles => roles.has('admin') || roles.has('coordinator')}>
										<DataGridColumn>
											<div className="flex gap-2">
												<HasRole role={roles => roles.has('admin') || roles.has('coordinator')}>
													<Link to="applicationDetail(id: $entity.id)">
														<Button variant={'secondary'} size={'sm'}>
															Detail
														</Button>
													</Link>
												</HasRole>
											</div>
										</DataGridColumn>
									</HasRole>
									<DataGridBooleanColumn field='read' header='Read' children={<Field field={'read'} format={formatBooleanIcon} />} />
									<DataGridHasOneColumn field="person" header="Name" >
										<Field field="firstName" />{' '}<Field field="surname" />{' ('}<Field field="inSISusername" />{') '}
									</DataGridHasOneColumn>
									<DataGridTextColumn field="person.studyProgram.name" header="Study program" />
									<DataGridHasManyColumn field="person.languages" header="Languages spoken">
										<Field field="name" />
									</DataGridHasManyColumn>
									<DataGridHasManyColumn field="preferredLanguages" header="Preferred languages">
										<Field field="name" />
									</DataGridHasManyColumn>
									<DataGridEnumColumn
										field="preferredSex"
										header="Preferred gender"
										options={{ man: 'Man', woman: 'Woman', dontCare: 'Not preferred' }}
									/>
									{/* <DataGridEnumColumn field="result" header="Result" options={{ accepted: 'accepted', declined: 'declined' }} /> */}
									<DataGridNumberColumn header="Buddies assigned" field='howManyBuddiesAssigned.number' />
									<DataGridNumberColumn header="Max buddies" field='howManyBuddies' />
									<DataGridBooleanColumn field='notPair' header='Ready to pair' children={<Field field={'notPair'} format={formatBooleanPair} />} />
									<DataGridEnumColumn header="Application status" field='status.status' options={{ toBePaired: 'To be paired', paired: 'Paired', notPaired: 'Not paired' }} />
									<DataGridTextColumn header="Email" field='person.tenantPerson.email' />
									<HasRole role={roles => roles.has('admin') || roles.has('coordinator')}>
										<DataGridColumn>
											<div className='flex justify-end'>
											<UDDropdown
												editFormRedirect={
													<>
													<Link to="applicationCzEdit(id: $entity.id)">
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
														cancelTo={'applicationCzs'}
														afterPersistTo={'applicationCzs'}
													>
														<DropdownMenuItem className='w-[150px]' onSelect={e => e.preventDefault()}>
															<TrashIcon className="w-4 mr-2" color='red' />
															<span>Delete</span>
														</DropdownMenuItem>
													</DeleteEntityModalButton>
													</div>
												}
											/>
											</div>
										</DataGridColumn>
									</HasRole>
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
