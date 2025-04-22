import { StudyProgramForm } from '@app/components/forms/study-program-form'
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
			<HasRole role={roles => roles.has('admin')}>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Study programs
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
						<CreateEntityModalButton
									entityName="StudyProgram"
									buttonLabel="Create study program"
									saveButtonLabel="Save data"
									refreshOnPersist
									createEntityForm={
									<>
										<StudyProgramForm />
									</>
									}
									dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
							/>
						</Slots.Actions>
						<DataGrid entities="StudyProgram">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<Link to="studyProgramDetail(id: $entity.id)">
											<Button variant={'secondary'} size={'sm'}>
												Detail
											</Button>
										</Link>
									</DataGridColumn>
									<DataGridTextColumn field="name" header="Name" />
									<DataGridColumn>
										<div className='flex justify-end'>
										<UDDropdown
											editForm={
												<>
													<StudyProgramForm />
												</>
											}
											deleteForm={
												<div className='w-full'>
												<DeleteEntityModalButton 
													message="Do you really want to delete?"
													deleteMessage="Delete"
													cancelTo={'studyPrograms'}
													afterPersistTo={'studyPrograms'}
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
