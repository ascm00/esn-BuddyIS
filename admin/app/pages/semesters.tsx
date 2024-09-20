import { PersistCheckbox } from '@app/components/PersistCheckbox'
import { Binding, PersistButton } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridHasManyColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { CheckboxField, SelectField } from '@app/lib/form'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Component, EntityListSubTree, EntitySubTree, Field, HasOne, Link, useEntity, useEntityListSubTree } from '@contember/interface'

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
							<Link to="semesterCreate">
								<Button>
									Create semester
								</Button>
							</Link>
						</Slots.Actions>
						<ShowCurrentSemester />
						<DataGrid entities="Semester">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="semesterDetail(id: $entity.id)">
												<Button>
													Set current
												</Button>
											</Link>
											<Link to="semesterEdit(id: $entity.id)">
												<Button>
													Edit
												</Button>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridTextColumn field="name" header="Name" />
									<DataGridDateColumn field="startDate" header="Start date" />
									<DataGridDateColumn field="endDate" header="End date" />
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

		return ( <h1 className='text-2xl font-bold'>Current semester: {currentSemester}</h1> )

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
