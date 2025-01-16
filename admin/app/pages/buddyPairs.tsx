import { BuddyPairCreateForm } from '@app/components/forms/buddy-pair-create-form'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { CreateEntityModalButton } from '@app/lib/buttons/createEntityModalButtons'
import { DataGrid, DataGridBooleanColumn, DataGridBooleanFilter, DataGridColumn, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, HasRole, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Current semester - Buddy pairs 🤝
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
						<Link to="buddyPairsHistoric">
								<Button>
									All semesters buddy pairs
								</Button>
							</Link>
							<HasRole role={roles => roles.has('admin')}>
								<CreateEntityModalButton
									entityName="BuddyPair"
									buttonLabel="Create buddy pair"
									saveButtonLabel="Save data"
									refreshOnPersist
									createEntityForm={
									<>
										<BuddyPairCreateForm />
									</>
									}
									dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
								/>
							</HasRole>
						</Slots.Actions>
						<DataGrid entities="BuddyPair[semester.isCurrent=true]">
							<DataGridToolbar>
								<DataGridQueryFilter />
								<DataGridHasOneFilter field="coordinator" label="Coordinator">
									<Field field="firstName" /> {' '} <Field field="surname" />
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
									<DataGridHasOneColumn field="coordinator" header="Coordinator">
										<Field field="firstName" /> {' '} <Field field="surname" /> {' ('} <Field field="inSISusername" /> {') '}
									</DataGridHasOneColumn>
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
