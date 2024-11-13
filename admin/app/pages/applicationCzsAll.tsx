import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridEnumColumn, DataGridHasManyColumn, DataGridHasOneColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, HasRole, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						All semesters - Local applications
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
											</div>
										</DataGridColumn>
									</HasRole>
									<DataGridHasOneColumn field="semester" header="Semester" >
										<Field field="name" />
									</DataGridHasOneColumn>
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
										options={{ man: 'man', woman: 'woman', dontCare: 'dontCare' }}
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
