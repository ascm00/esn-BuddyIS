import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { DataGrid, DataGridColumn, DataGridEnumColumn, DataGridEnumFilter, DataGridHasManyColumn, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, HasRole, Link } from '@contember/interface'
import { TrashIcon } from 'lucide-react'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Current semester - Foreign applications 🤝
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<Link to="applicationFrsAll">
								<Button>
									All semesters applications
								</Button>
							</Link>
							{/* <Link to="applicationFrCreate">
								<Button>
									Create application FR
								</Button>
							</Link> */}
						</Slots.Actions>
						<DataGrid entities="ApplicationFr[semester.isCurrent=true]">
							<DataGridToolbar copyingMails="applications">
								<DataGridQueryFilter />
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
									<HasRole role={roles => roles.has('admin') || roles.has('coordinator')}>
										<DataGridColumn>
											<div className="flex gap-2">
												<HasRole role="admin">
													<DeleteEntityModalButton 
														message="Do you really want to delete?"
														deleteMessage="Delete"
														cancelTo={'applicationFrs'}
														afterPersistTo={'applicationFrs'}
													>
														<Button variant={'destructive'} size={'sm'}>
															<TrashIcon className='w-4' />
														</Button>
													</DeleteEntityModalButton>
													<Link to="applicationFrEdit(id: $entity.id)">
														<Button variant={'secondary'} size={'sm'}>
															Edit
														</Button>
													</Link>
												</HasRole>
											</div>
										</DataGridColumn>
									</HasRole>
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
