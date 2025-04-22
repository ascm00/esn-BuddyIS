import { CountryCreateForm } from '@app/components/forms/country-create-form'
import { CountryEditForm } from '@app/components/forms/country-edit-form'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { CreateEntityModalButton } from '@app/lib/buttons/createEntityModalButtons'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { CurrentEntityLazyModalEdit } from '@app/lib/buttons/modalEdit'
import { DataGrid, DataGridColumn, DataGridHasManyColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { UDDropdown } from '@app/lib/datagrid/UDDropdown'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { DropdownMenuItem } from '@app/lib/ui/dropdown'
import { Field, HasRole, Link } from '@contember/interface'
import { TrashIcon } from 'lucide-react'

export default () => {
	return (
		<>
		<HasRole role="admin">
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Countries
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<CreateEntityModalButton
									entityName="Country"
									buttonLabel="Create country"
									saveButtonLabel="Save data"
									refreshOnPersist
									createEntityForm={
									<>
										<CountryCreateForm />
									</>
									}
									dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
							/>
						</Slots.Actions>
						<DataGrid entities="Country">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridTextColumn field="name" header="Name" />
									<DataGridColumn>
										<div className='flex justify-end'>
										<UDDropdown
											editForm={
												<>
													<CountryEditForm />
												</>
											}
											deleteForm={
												<div className='w-full'>
												<DeleteEntityModalButton 
													message="Do you really want to delete?"
													deleteMessage="Delete"
													cancelTo={'countries'}
													afterPersistTo={'countries'}
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
