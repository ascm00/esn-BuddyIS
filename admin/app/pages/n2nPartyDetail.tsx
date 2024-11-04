import { EventPictureFieldView } from '@app/components/fieldViews/ImageFieldView'
import { N2nPartyForm } from '@app/components/forms/n2n-party-form'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { CurrentEntityLazyModalEdit } from '@app/lib/buttons/modalEdit'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridToolbar } from '@app/lib/datagrid'
import { formatDateTime } from '@app/lib/formatting'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { GetN2NLink } from '@app/lib/utils/link'
import { EntitySubTree, Field, HasRole, Link, Component, useEntity } from '@contember/interface'
import { TrashIcon } from 'lucide-react'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						N2N party detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="N2nParty(id=$id)" isCreating={false}>
						<Slots.Actions>
							<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('esnMember')}>
								<CurrentEntityLazyModalEdit
									dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
									redirectOnSuccess={`n2nPartyDetail(id: $id)`}
									buttonContent={
										<span className="flex items-center">
											Edit N2N party
										</span>
									}
								>
									<N2nPartyForm />
								</CurrentEntityLazyModalEdit>
							</HasRole>
							<HasRole role="admin">
								<DeleteEntityModalButton 
									message="Do you really want to delete?"
									deleteMessage="Delete"
									cancelTo={'n2nParties'}
									afterPersistTo={'n2nParties'}
								>
									<Button variant={'destructive'}>
										<TrashIcon />
									</Button>
								</DeleteEntityModalButton>
							</HasRole>
						</Slots.Actions>
						<div className="flex gap-8 flex-col md:flex-row">
							<div className="w-full gap-8 flex flex-col">
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
													Start
												</TableCell>
												<TableCell className="font-semibold">
													<Field field="date" format={formatDateTime} />
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													Club
												</TableCell>
												<TableCell className="font-semibold">
													<Field field="club" />
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													BOOM events link
												</TableCell>
												<TableCell className="font-semibold">
													<GetN2NLink />
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableWrapper>
								<TableWrapper className="bg-gray-50/50 h-fit border rounded-md max-w-lg">
									<Table>
										<TableRow>
											<TableCell>
												Description
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="font-semibold">
												<Field field="description" />
											</TableCell>
										</TableRow>
									</Table>
								</TableWrapper>
							</div>
							<div className="w-full gap-8 flex flex-col">
								<TableWrapper className="bg-gray-50/50 border rounded-md">
									<Table>
									<TableBody>
										<TableRow>
											<TableCell className="text-2xl font-bold">
												<EventPictureFieldView srcField="picture.url" width={100} height={100} />
											</TableCell>
										</TableRow>
									</TableBody>
									</Table>
								</TableWrapper>
							</div>
						</div>
					</EntitySubTree>
					<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('esnMember')}>
						<div className="flex flex-col gap-4">
							<div className="text-lg font-bold">
								N2N hours
							</div>
							<DataGrid entities="N2nHour[party.id = $id]">
								<DataGridToolbar>
									<DataGridQueryFilter />
								</DataGridToolbar>
								<DataGridLoader>
									<DataGridTable>
										<DataGridColumn>
											<div className="flex gap-4">
												<Link to="n2nHourDetail(id: $entity.id)">
													<a>
														Detail
													</a>
												</Link>
												<Link to="n2nHourEdit(id: $entity.id)">
													<a>
														Edit
													</a>
												</Link>
											</div>
										</DataGridColumn>
										<DataGridDateColumn field="from" header="From" />
										<DataGridDateColumn field="to" header="To" />
									</DataGridTable>
								</DataGridLoader>
								<DataGridPagination />
							</DataGrid>
						</div>
					</HasRole>
				</div>
			</Binding>
		</>
	)
}

