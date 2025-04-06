import { BuddyPairCreateForm } from '@app/components/forms/buddy-pair-create-form'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { CreateEntityModalButton } from '@app/lib/buttons/createEntityModalButtons'
import { DataGrid, DataGridBooleanColumn, DataGridBooleanFilter, DataGridColumn, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { SetCurrentSemesterByDefault } from '@app/lib/datagrid/filters/sessionStorageSemesterFilter'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { useIsMobile } from '@app/lib/utils/use-mobile'
import { Field, HasRole, Link } from '@contember/interface'
import { History, PlusCircle } from 'lucide-react'

export default () => {
	const isMobile = useIsMobile()
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
							<SetCurrentSemesterByDefault keyParam='buddyPairs__BuddyPair-filters' /> 
							<HasRole role={roles => roles.has('admin')}>
								<CreateEntityModalButton
									entityName="BuddyPair"
									button={<Button>{isMobile ? <PlusCircle /> : 'Create buddy pair'}</Button>}
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
						<DataGrid entities="BuddyPair">
							<DataGridToolbar copyingMails="buddyPairs">
								<DataGridQueryFilter />
								<DataGridHasOneFilter field={'semester'} label="Semester">
									<Field field={'name'} />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field="coordinator" label="Coordinator" options={'Person[tenantPerson.roles = "coordinator"]'}>
									<Field field="firstName" /> {' '} <Field field="surname" />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field={'czechStudent.studyProgram'} label="Local buddy study program">
									<Field field={'name'} />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field={'internationalStudent.studyProgram'} label="Foreigner study program">
									<Field field={'name'} />
								</DataGridHasOneFilter>
								<DataGridHasOneFilter field={'internationalStudent.countryOfUniversity'} label="Foreigner university country">
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
									<DataGridHasOneColumn field="coordinator" header="Coordinator">
										<Field field="firstName" />{' '}<Field field="surname" />{' ('}<Field field="inSISusername" />{') '}
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
					</>
				</div>
			</Binding>
		</>
	)
}
