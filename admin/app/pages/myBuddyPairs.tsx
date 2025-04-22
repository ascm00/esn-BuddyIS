import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridBooleanColumn, DataGridBooleanFilter, DataGridColumn, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { SetCurrentSemesterByDefault } from '@app/lib/datagrid/filters/sessionStorageSemesterFilter'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, Link, useIdentity } from '@contember/interface'

export default () => {

	const personId = useIdentity()?.person?.id

	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						My buddy pairs
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
						<SetCurrentSemesterByDefault keyParam={`myBuddyPairs__BuddyPair[coordinator.tenantPerson.id='${personId}']-filters`} /> 
						<DataGrid entities={`BuddyPair[coordinator.tenantPerson.id='${personId}']`}>
							<DataGridToolbar copyingMails="buddyPairs">
								<DataGridQueryFilter />
								<DataGridHasOneFilter field={'semester'} label="Semester">
									<Field field={'name'} />
								</DataGridHasOneFilter>
								<DataGridBooleanFilter field="tenPoints" label="10 points" noNullFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-4">
											<Link to="buddyPairDetail(id: $entity.id)">
												<Button variant={'secondary'} size={'sm'}>
													Detail
												</Button>
											</Link>
										</div>
									</DataGridColumn>
									<DataGridHasOneColumn field="czechStudent" header="Local buddy first name">
										<Field field="firstName" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="czechStudent" header="Local buddy surname">
										<Field field="surname" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="czechStudent" header="Local buddy InSIS username">
										<Field field="inSISusername" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="internationalStudent" header="Foreign buddy first name">
										<Field field="firstName" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="internationalStudent" header="Foreign buddy surname">
										<Field field="surname" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="internationalStudent" header="Foreign buddy InSIS username">
										<Field field="inSISusername" />
									</DataGridHasOneColumn>
									<DataGridBooleanColumn field="tenPoints" header="10 points" />
									<DataGridHasOneColumn field="czechStudent" header="Local buddy study program">
										<Field field="studyProgram.name" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="internationalStudent" header="Foreign buddy study program">
										<Field field="studyProgram.name" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="czechStudent" header="Local buddy email">
										<Field field="tenantPerson.email" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="internationalStudent" header="Foreign buddy email">
										<Field field="tenantPerson.email" />
									</DataGridHasOneColumn>
									<DataGridHasOneColumn field="internationalStudent" header="Foreign buddy home university country">
										<Field field="countryOfUniversity.name" />
									</DataGridHasOneColumn>
								</DataGridTable>
							</DataGridLoader>
							<DataGridPagination />
						</DataGrid>
				</div>
			</Binding>
		</>
	)
}
