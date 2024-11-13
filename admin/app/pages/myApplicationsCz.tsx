import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { DataGrid, DataGridBooleanColumn, DataGridBooleanFilter, DataGridColumn, DataGridEnumColumn, DataGridHasManyColumn, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { TrashIcon } from 'lucide-react'
import { Field, Link, useIdentity } from '@contember/interface'

export default () => {

	const personId = useIdentity()?.person?.id

	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						My buddy applications
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
						<DataGrid entities={`ApplicationCz[person.tenantPerson.id='${personId}']`}>
							<DataGridToolbar>
								<DataGridQueryFilter />
                                <DataGridHasOneFilter field="semester" label="Semester">
                                    <Field field="name" />
                                </DataGridHasOneFilter>
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-2">
											{/* <Link to="applicationCzEdit(id: $entity.id)">
												<Button>
													Edit
												</Button>
											</Link> */}
                                            <DeleteEntityModalButton 
												message="Are you completely sure to delete your buddy application? If you are already assigned to a buddy, it won't delete your buddy pair. In case you want to cancel your buddy pair, please contact us at 'helpdesk@esnvseprague.cz'."
												deleteMessage="Delete"
												cancelTo={'myApplicationsCz'}
												afterPersistTo={'myApplicationsCz'}
											>
												<Button variant={'destructive'} size={'sm'}>
													<TrashIcon className='w-4'/>
												</Button>
											</DeleteEntityModalButton>
										</div>
									</DataGridColumn>
									<DataGridHasOneColumn field="semester" header="Semester">
										<Field field="name" />
									</DataGridHasOneColumn>
									<DataGridEnumColumn field="preferredSex" header="Preferred gender of buddy" options={{man: 'Man', woman: 'Woman', dontCare: 'Not preferred'}} />
									<DataGridHasOneColumn field="preferredCountry" header="Preferred country of university">
										<Field field="name" />
									</DataGridHasOneColumn>
                                    <DataGridHasManyColumn field="preferredLanguages" header="Preferred languages">
                                        <Field field="name" />
                                    </DataGridHasManyColumn>
                                    <DataGridNumberColumn field="howManyBuddiesAssigned" header="Number of buddies assigned" />
                                    <DataGridNumberColumn field="howManyBuddies" header="Maximum number of buddies" />
								</DataGridTable>
							</DataGridLoader>
							<DataGridPagination />
						</DataGrid>
				</div>
			</Binding>
		</>
	)
}
