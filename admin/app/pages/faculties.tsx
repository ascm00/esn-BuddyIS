import { FacultyCreateForm } from '@app/components/forms/faculty-create-form'
import { FacultyEditForm } from '@app/components/forms/faculty-edit-form'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { CreateEntityModalButton } from '@app/lib/buttons/createEntityModalButtons'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { CurrentEntityLazyModalEdit } from '@app/lib/buttons/modalEdit'
import { DataGrid, DataGridColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { HasRole, Link } from '@contember/interface'
import { TrashIcon } from 'lucide-react'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Faculties
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<CreateEntityModalButton
								entityName="Faculty"
								buttonLabel="Create faculty"
								saveButtonLabel="Save data"
								refreshOnPersist
								createEntityForm={
								<>
									<FacultyCreateForm />
								</>
								}
								dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
							/>
						</Slots.Actions>
						<DataGrid entities="Faculty">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<HasRole role="admin">
									<DataGridColumn>
										<div className="flex gap-2">
											<DeleteEntityModalButton 
												message="Do you really want to delete?"
												deleteMessage="Delete"
												cancelTo={'faculties'}
												afterPersistTo={'faculties'}
											>
												<Button variant={'destructive'} size={'sm'}>
													<TrashIcon className='w-4' />
												</Button>
											</DeleteEntityModalButton>
											<Link to="facultyDetail(id: $entity.id)">
												<Button variant={'secondary'} size={'sm'}>
													Detail
												</Button>
											</Link>
											<CurrentEntityLazyModalEdit
												dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
												buttonProps={{variant: 'secondary', size: 'sm'}}
												buttonContent={
													<span className="flex items-center">
														Edit
													</span>
												}
											>
												<FacultyEditForm />
											</CurrentEntityLazyModalEdit>
										</div>
										</DataGridColumn>
									</HasRole>
									<DataGridTextColumn field="name" header="Name" />
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
