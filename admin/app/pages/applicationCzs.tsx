import { Navigation } from '@app/components/navigation'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { DataGrid, DataGridColumn, DataGridEnumColumn, DataGridHasManyColumn, DataGridHasOneColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
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
						Current semester - Local applications
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
						<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('ozsRole')}>
							<Link to="applicationCzsAll">
								<Button>
									All semesters applications
								</Button>
							</Link>
							{/* <Link to="applicationCzAdminCreate">
								<Button>
									Create application CZ
								</Button>
							</Link> */}
						</HasRole>
						</Slots.Actions>
						<DataGrid entities="ApplicationCz[semester.isCurrent=true]">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<HasRole role={roles => roles.has('admin') || roles.has('coordinator')}>
										<DataGridColumn>
											<div className="flex gap-4">
												<Link to="applicationCzEdit(id: $entity.id)">
													<Button>
														Edit
													</Button>
												</Link>
												<HasRole role="admin">
													<DeleteEntityModalButton 
														message="Do you really want to delete?"
														deleteMessage="Delete"
														cancelTo={'applicationCzs'}
														afterPersistTo={'applicationCzs'}
													>
														<Button variant={'destructive'}>
															<TrashIcon />
														</Button>
													</DeleteEntityModalButton>
												</HasRole>
											</div>
										</DataGridColumn>
									</HasRole>
									<DataGridHasOneColumn field="person" header="Name" >
										<Field field="firstName" /> {' '} <Field field="surname" /> {' ('} <Field field="inSISusername" /> {') '}
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
