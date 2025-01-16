import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridEnumColumn, DataGridEnumFilter, DataGridHasManyColumn, DataGridHasManyFilter, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, HasRole, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						All semesters - Local applications 🤝
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						{/* <Slots.Actions>
							<Link to="applicationCzCreate">
								<Button>
									Create application cz
								</Button>
							</Link>
						</Slots.Actions> */}
						<DataGrid entities="ApplicationCz">
							<DataGridToolbar>
								<DataGridQueryFilter />
								<DataGridHasOneFilter field={'person.studyProgram'} label="Study Program">
									<Field field={'name'} />
								</DataGridHasOneFilter>
								<DataGridHasManyFilter field={'person.languages'} label="Languages spoken">
									<Field field={'name'} />
								</DataGridHasManyFilter>
								<DataGridHasManyFilter field={'preferredLanguages'} label="Preferred languages">
									<Field field={'name'} />
								</DataGridHasManyFilter>
								<DataGridEnumFilter field={'preferredSex'} label="Preferred gender" options={{ man: 'Man', woman: 'Woman', dontCare: 'Not preferred' }} />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<HasRole role={roles => roles.has('admin') || roles.has('coordinator')}>
										<DataGridColumn>
											<div className="flex gap-2">
												<HasRole role="admin">
													<Link to="applicationCzEdit(id: $entity.id)">
														<Button variant={'secondary'} size={'sm'}>
															Edit
														</Button>
													</Link>
												</HasRole>
											</div>
										</DataGridColumn>
									</HasRole>
									<DataGridHasOneColumn field="semester" header="Semester" >
										<Field field="name" />
									</DataGridHasOneColumn>
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
										options={{ man: 'man', woman: 'woman', dontCare: 'Dont care' }}
									/>
									{/* <DataGridEnumColumn field="result" header="Result" options={{ accepted: 'accepted', declined: 'declined' }} /> */}
									<DataGridNumberColumn header="Buddies assigned" field='howManyBuddiesAssigned.number' />
									<DataGridNumberColumn header="Max buddies" field='howManyBuddies' />
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
