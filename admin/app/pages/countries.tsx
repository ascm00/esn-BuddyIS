import { CountryCreateForm } from '@app/components/forms/country-create-form'
import { CountryEditForm } from '@app/components/forms/country-edit-form'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { CreateEntityModalButton } from '@app/lib/buttons/createEntityModalButtons'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { CurrentEntityLazyModalEdit } from '@app/lib/buttons/modalEdit'
import { DataGrid, DataGridColumn, DataGridHasManyColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
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
								<HasRole role="admin">
									<DataGridColumn>
										<div className="flex gap-4">
											<CurrentEntityLazyModalEdit
												dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
												buttonContent={
													<span className="flex items-center">
														Edit
													</span>
												}
											>
												<CountryEditForm />
											</CurrentEntityLazyModalEdit>
											<DeleteEntityModalButton 
												message="Do you really want to delete?"
												deleteMessage="Delete"
												cancelTo={'countries'}
												afterPersistTo={'countries'}
											>
												<Button variant={'destructive'}>
													<TrashIcon />
												</Button>
											</DeleteEntityModalButton>
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
