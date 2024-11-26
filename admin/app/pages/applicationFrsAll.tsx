import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridEnumColumn, DataGridEnumFilter, DataGridHasManyColumn, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, HasRole, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						All semesters - Foreign applications
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						{/* <Slots.Actions>
							<Link to="applicationFrCreate">
								<Button>
									Create application FR
								</Button>
							</Link>
						</Slots.Actions> */}
						<DataGrid entities="ApplicationFr">
							<DataGridToolbar>
								<DataGridQueryFilter />
								<DataGridHasOneFilter field="semester" label="Semester">
									<Field field="name" />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field={'person.studyProgram'} label={'Study program'}>
									<Field field={'name'} />
								</DataGridHasOneFilter>
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
											<div className="flex gap-4">
												<Link to="applicationFrEdit(id: $entity.id)">
													<Button variant={'secondary'} size={'sm'}>
														Edit
													</Button>
												</Link>
											</div>
										</DataGridColumn>
									</HasRole>
									<DataGridHasOneColumn field="semester" header="Semester">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="person" header="Name" >
										<Field field="firstName" /> {' '} <Field field="surname" />
									</DataGridHasOneColumn>
									<DataGridTextColumn field="person.studyProgram.name" header="Study program" />
									<DataGridTextColumn field="person.countryOfUniversity.name" header="Home university country" />
									<DataGridHasManyColumn field="person.languages" header="Languages spoken">
										<Field field="name" />
									</DataGridHasManyColumn>
									<DataGridEnumColumn
										field="preferredBuddySex"
										header="Preferred buddy gender"
										options={{ man: 'man', woman: 'woman', dontCare: 'dontCare' }}
									/>
									<DataGridEnumColumn
										field="status"
										header="Status"
										options={{ toBePaired: 'To be paired', paired: 'Paired', notPaired: 'Not paired' }}
									/>
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
