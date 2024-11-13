import { N2nPartyForm } from '@app/components/forms/n2n-party-form'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { CreateEntityModalButton } from '@app/lib/buttons/createEntityModalButtons'
import { CurrentEntityLazyModalEdit } from '@app/lib/buttons/modalEdit'
import { DataGrid, DataGridBooleanColumn, DataGridColumn, DataGridDateColumn, DataGridHasManyColumn, DataGridHasOneColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, HasRole, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						N2N parties
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
								<Link to="n2nPartiesAllSemesters">
									<Button>
										All semesters N2N parties
									</Button>
								</Link>
								<CreateEntityModalButton
									entityName="N2nParty"
									buttonLabel="Create N2N party"
									saveButtonLabel="Save data"
									refreshOnPersist
									createEntityForm={
									<>
										<N2nPartyForm />
									</>
									}
									dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
								/>
							</HasRole>
						</Slots.Actions>
						<DataGrid entities="N2nParty[semester.isCurrent=true]">
							<DataGridToolbar>
								<DataGridQueryFilter />
							</DataGridToolbar>
							<DataGridLoader>
								<DataGridTable>
									<DataGridColumn>
										<div className="flex gap-2">
											<Link to="n2nPartyDetail(id: $entity.id)">
												<Button variant={'secondary'} size={'sm'}>
													Detail
												</Button>
											</Link>
											<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('esnMember')}>
												<CurrentEntityLazyModalEdit
													dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
													buttonProps={{variant: 'secondary', size: 'sm'}}
													buttonContent={
														<span className="flex items-center">
															Edit
														</span>
													}
												>
													<N2nPartyForm />
												</CurrentEntityLazyModalEdit>
											</HasRole>
										</div>
									</DataGridColumn>
									<DataGridTextColumn field="name" header="Name" />
									<DataGridDateColumn field="date" header="Date" />
									{/* <DataGridBooleanColumn field="open" header="Open" /> */}
									<DataGridTextColumn field="club" header="Club" />
									<DataGridTextColumn field="link" header="Link" />
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
