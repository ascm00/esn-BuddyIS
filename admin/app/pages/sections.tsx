import { SectionCreateForm } from '@app/components/forms/section-create-form'
import { SectionEditForm } from '@app/components/forms/section-edit-form'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { CreateEntityModalButton } from '@app/lib/buttons/createEntityModalButtons'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { CurrentEntityLazyModalEdit } from '@app/lib/buttons/modalEdit'
import { DataGrid, DataGridColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { UDDropdown } from '@app/lib/datagrid/UDDropdown'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { DropdownMenuItem } from '@app/lib/ui/dropdown'
import { HasRole, Link } from '@contember/interface'
import { TrashIcon } from 'lucide-react'

export default () => {
	return (
		<>
		<HasRole role="admin">
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Processes
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
									<DataGridTextColumn field="name" header="Name" />
									<DataGridTextColumn field="description" header="Description" />
									<DataGridColumn>
										<div className='flex justify-end'>
										<UDDropdown
											editForm={
												<>
													<SectionEditForm />
												</>
											}
											deleteForm={
												<div className='w-full'>
												<DeleteEntityModalButton 
													message="Do you really want to delete?"
													deleteMessage="Delete"
													cancelTo={'sections'}
													afterPersistTo={'sections'}
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
