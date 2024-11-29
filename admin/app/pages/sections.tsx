import { SectionCreateForm } from '@app/components/forms/section-create-form'
import { SectionEditForm } from '@app/components/forms/section-edit-form'
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
						Processes 🔄
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
						<CreateEntityModalButton
								entityName="Section"
								buttonLabel="Create process"
								saveButtonLabel="Save data"
								refreshOnPersist
								createEntityForm={
								<>
									<SectionCreateForm />
								</>
								}
								dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
						/>
						</Slots.Actions>
						<DataGrid entities="Section">
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
													cancelTo={'sections'}
													afterPersistTo={'sections'}
												>
													<Button variant={'destructive'} size={'sm'}>
														<TrashIcon className='w-4'/>
													</Button>
												</DeleteEntityModalButton>
												<CurrentEntityLazyModalEdit
													dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
													buttonProps={{variant: 'secondary', size: 'sm'}}
													buttonContent={
														<span className="flex items-center">
															Edit
														</span>
													}
												>
													<SectionEditForm />
												</CurrentEntityLazyModalEdit>
											</div>
										</DataGridColumn>
									</HasRole>
									<DataGridTextColumn field="name" header="Name" />
									<DataGridTextColumn field="description" header="Description" />
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
