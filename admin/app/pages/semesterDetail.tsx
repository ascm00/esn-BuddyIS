import { PersistCheckbox } from '@app/components/PersistCheckbox'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridEnumColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { CheckboxField } from '@app/lib/form'
import { formatDateTime } from '@app/lib/formatting'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { PersistButton } from '@app/lib/binding'

import { Component, EntityList, EntityListSubTree, EntitySubTree, Field, Link, PersistTrigger, useEntity, useEntityBeforePersist, useEntityList, useEntityListSubTree, useEntitySubTree } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Semester detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Semester(id=$id)" isCreating={false}>
						<TurnOffCurrent />
						<Slots.Actions>
							<Link to="semesterEdit(id: $entity.id)">
								<Button>
									Edit semester
								</Button>
							</Link>
							<PersistButton label="Save current semester" />
						</Slots.Actions>
						<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>
											Name
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="name" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Start date
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="startDate" format={formatDateTime} />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											End date
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="endDate" format={formatDateTime} />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Current semester
										</TableCell>
										<TableCell className="font-semibold">
											<CheckboxField field={'isCurrent'} description="Afterwards you have to click 'Save current semester'. Are you sure about this action?" />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableWrapper>
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}



const TurnOffCurrent = Component(
	// turns of semester that was current before this was made current
	() => {
		const entityList = useEntityListSubTree('currentSemester')

		useEntityBeforePersist(() => {
			for (const entity of entityList) {
				entity.updateValues({ isCurrent: false })
			}
		})

		return ( null )

}, () => (
		<>
			<Binding>
				<EntityListSubTree
				entities="Semester[isCurrent=true]"
				alias={'currentSemester'}
				>
					<Field field={'isCurrent'} />
				</EntityListSubTree>
			</Binding>
		</>
	)
)