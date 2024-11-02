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

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Semester
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
									redirectOnPersistTo="semesters"
									createEntityForm={
									<>
										<SemesterForm />
									</>
									}
									dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
							/>
						</Slots.Actions>
						<ShowCurrentSemester />
						<DataGrid entities="Semester">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<HasRole role="admin">
										<DataGridColumn>
											<div className="flex gap-4">
												<Link to="semesterDetail(id: $entity.id)">
													<Button>
														Set current
													</Button>
												</Link>
												<CurrentEntityLazyModalEdit
													dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
													buttonContent={
														<span className="flex items-center">
															Edit
														</span>
													}
												>
													<SemesterForm />
												</CurrentEntityLazyModalEdit>
												<DeleteEntityModalButton 
													message="Do you really want to delete?"
													deleteMessage="Delete"
													cancelTo={'semesters'}
													afterPersistTo={'semesters'}
												>
													<Button variant={'destructive'}>
														<TrashIcon />
													</Button>
												</DeleteEntityModalButton>
											</div>
										</DataGridColumn>
									</HasRole>
									<DataGridTextColumn field="name" header="Name" />
									<DataGridDateColumn field="startDate" header="Start date" />
									<DataGridDateColumn field="endDate" header="End date" />
									<DataGridDateColumn field='openForCzechBuddyRegistrationsDate' header="Open Czech buddies registration" />
									<DataGridDateColumn field='closeBuddyRegistrations' header="Close buddy Registration" />
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
