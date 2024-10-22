import { SectionCreateForm } from '@app/components/forms/section-create-form'
import { SectionEditForm } from '@app/components/forms/section-edit-form'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { CreateEntityModalButton } from '@app/lib/buttons/createEntityModalButtons'
import { CurrentEntityLazyModalEdit } from '@app/lib/buttons/modalEdit'
import { DataGrid, DataGridColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Link } from '@contember/interface'

export default () => {
	return (
		<>
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
									<DataGridColumn>
										<CurrentEntityLazyModalEdit
											dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
											buttonContent={
												<span className="flex items-center">
													Edit
												</span>
											}
										>
											<SectionEditForm />
										</CurrentEntityLazyModalEdit>
									</DataGridColumn>
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
