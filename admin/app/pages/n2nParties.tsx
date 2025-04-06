import { N2nPartyForm } from '@app/components/forms/n2n-party-form'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { CreateEntityModalButton } from '@app/lib/buttons/createEntityModalButtons'
import { CurrentEntityLazyModalEdit } from '@app/lib/buttons/modalEdit'
import { DataGrid, DataGridBooleanColumn, DataGridColumn, DataGridDateColumn, DataGridHasManyColumn, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
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
						N2N parties 🎉
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<Slots.Actions>
							<SetCurrentSemesterByDefault keyParam='n2nParties__N2nParty-filters' /> 
							<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
								<CreateEntityModalButton
									entityName="N2nParty"
									buttonLabel="Create N2N party"
									button={<Button>{isMobile ? <PlusCircle /> : 'Create N2N party'}</Button>}
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
						<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
							<DataGrid entities="N2nParty">
								<DataGridToolbar>
									<DataGridQueryFilter />
									<DataGridHasOneFilter field={'semester'} label="Semester">
										<Field field={'name'} />
									</DataGridHasOneFilter>
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
						</HasRole>
						<HasRole role={roles => roles.has('czechBuddy') || roles.has('internationalStudent')}>
						<DataGrid entities="N2nParty[semester.isCurrent = true]">
								<DataGridToolbar>
									<DataGridQueryFilter />
									<DataGridHasOneFilter field={'semester'} label="Semester">
										<Field field={'name'} />
									</DataGridHasOneFilter>
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
						</HasRole>
					</>
				</div>
			</Binding>
		</>
	)
}
