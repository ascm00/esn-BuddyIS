import { SemesterForm } from '@app/components/forms/semester-create-form'
import { PersistCheckbox } from '@app/components/PersistCheckbox'
import { Binding, PersistButton } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { CreateEntityModalButton } from '@app/lib/buttons/createEntityModalButtons'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { CurrentEntityLazyModalEdit } from '@app/lib/buttons/modalEdit'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridHasManyColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { CheckboxField, SelectField } from '@app/lib/form'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { TrashIcon } from 'lucide-react'
import { Component, EntityListSubTree, EntitySubTree, Field, HasOne, HasRole, Link, useEntity, useEntityListSubTree } from '@contember/interface'
import { UDDropdown } from '@app/lib/datagrid/UDDropdown'
import { DropdownMenuItem } from '@app/lib/ui/dropdown'

export default () => {
	return (
		<>
			<HasRole role={roles => roles.has('admin')}>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Semesters
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
							<Slots.Actions>
								<CreateEntityModalButton
										entityName="Semester"
										buttonLabel="Create semester"
										saveButtonLabel="Save data"
										refreshOnPersist
										createEntityForm={
										<>
											<SemesterForm />
										</>
										}
										dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
								/>
							</Slots.Actions>
						<DataGrid entities="Semester">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<ShowCurrentSemester />
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<Link to="semesterDetail(id: $entity.id)">
											<Button variant={'secondary'} size={'sm'}>
												Set current
											</Button>
										</Link>
									</DataGridColumn>
									<DataGridTextColumn field="name" header="Name" />
									<DataGridDateColumn field="startDate" header="Start date" />
									<DataGridDateColumn field="endDate" header="End date" />
									<DataGridDateColumn field='openForCzechBuddyRegistrationsDate' header="Open buddy registration" />
									<DataGridDateColumn field='closeBuddyRegistrations' header="Close buddy Registration" />
									<DataGridColumn>
										<div className='flex justify-end'>
										<UDDropdown
											editForm={
												<>
													<SemesterForm />
												</>
											}
											deleteForm={
												<div className='w-full'>
												<DeleteEntityModalButton 
													message="Do you really want to delete?"
													deleteMessage="Delete"
													cancelTo={'semesters'}
													afterPersistTo={'semesters'}
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

const ShowCurrentSemester = Component(
	// turns of semester that was current before this was made current
	() => {
		const entityList = useEntityListSubTree('currentSemester')

		let currentSemester


		for (const entity of entityList) {
			currentSemester = entity?.getField('name')?.value?.toString()
		}

		return ( <div>
			<h1 className='text-2xl font-bold'>Current semester: {currentSemester}</h1> 
			</div>)

}, () => (
		<>
			<Binding>
				<EntityListSubTree
				entities="Semester[isCurrent=true]"
				alias={'currentSemester'}
				>
					<Field field={'isCurrent'} />
					<Field field={'name'} />
				</EntityListSubTree>
			</Binding>
		</>
	)
)
