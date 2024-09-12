import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridBooleanColumn, DataGridColumn, DataGridDateColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { EntitySubTree, Field, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Study program detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="StudyProgram(id=$id)" isCreating={false}>
						<Slots.Actions>
							<Link to="studyProgramEdit(id: $entity.id)">
								<Button>
									Edit Study program
								</Button>
							</Link>
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
								</TableBody>
							</Table>
						</TableWrapper>
					</EntitySubTree>
					<div className="flex flex-col gap-4">
						<div className="text-lg font-bold">
							User
						</div>
						<DataGrid entities="Person[studyProgram.id = $id]">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="userDetail(id: $entity.id)">
												<a>
													Detail
												</a>
											</Link>
											<Link to="userEdit(id: $entity.id)">
												<a>
													Edit
												</a>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridTextColumn field="firstName" header="First name" />
									<DataGridTextColumn field="surname" header="Surname" />
									<DataGridDateColumn field="lastLoginDate" header="Last login date" />
									<DataGridTextColumn field="phoneNumber" header="Phone number" />
									<DataGridTextColumn field="xname" header="Xname" />
								</DataGridTable>
							</DataGridLoader>
							<DataGridPagination />
						</DataGrid>
					</div>
				</div>
			</Binding>
		</>
	)
}
