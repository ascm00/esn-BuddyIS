import { NoteCard } from '@app/components/noteCard'
import { PersistCheckbox } from '@app/components/PersistCheckbox'
import { Binding, PersistButton, usePersistWithFeedback } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridBooleanColumn, DataGridColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { DataGridNotes } from '@app/lib/datagrid/note'
import { ImageField } from '@app/lib/form'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { TextareaAutosize } from '@app/lib/ui/textarea'
import { ImageFieldView } from '@app/components/fieldViews/ImageFieldView'
import { Component, EntitySubTree, Field, HasMany, HasOne, HasRole, identityEnvironmentExtension, Link, useEntity, useEntitySubTree } from '@contember/interface'
import { useCallback, useState } from 'react'

export default () => {

	//Musím checknout zda mám v aktuálním semestru buddyho, následně zobrazit stránku jeho/její buddy paru

	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						My buddy
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="BuddyPair(id=$id)" isCreating={false}>
						<div className="flex gap-8 flex-col md:flex-row">
							<div className="w-full gap-8 flex flex-col">
							<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
								<Table>
									<TableBody>
										<TableRow>
											<TableCell className="text-2xl font-bold">
												Coordinator
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												Name
											</TableCell>
											<TableCell className="text-2xl font-semibold">
												<Field field="coordinator.firstName" /> {' '} <Field field="coordinator.surname" />
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												Email
											</TableCell>
											<TableCell className="text-2xl font-semibold">
												<Field field="coordinator.tenantPerson.email" />
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												Phone number
											</TableCell>
											<TableCell className="text-2xl font-semibold">
												<Field field="coordinator.phoneNumber" /> {' '} <Field field="coordinator.surname" />
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableWrapper>
							<p className="text-2xl font-bold">You & your buddy</p>
							<div>
								<ImageField baseField={'picture'} urlField={'url'} />
								<PersistButton label="Save picture" />
							</div>
							</div>

							<div className="w-full gap-8 flex flex-col">
								<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
									<Table>
									<TableBody>
										<TableRow>
											<TableCell className="text-2xl font-bold">
												Your buddy
											</TableCell>
										</TableRow>
										<TableRow>
										<TableCell>
											Name
										</TableCell>
										<TableCell className="text-2xl font-semibold">
											<Field field="internationalStudent.firstName" /> {' '} <Field field="internationalStudent.surname" />
										</TableCell>
										</TableRow>
										<TableRow>
										<TableCell>
											Email
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="internationalStudent.tenantPerson.email" />
										</TableCell>
										</TableRow>
										<TableRow>
										<TableCell>
											Phone number
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="internationalStudent.phoneNumber" />
										</TableCell>
										</TableRow>
										<TableRow>
										<TableCell>
											Nationality
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="internationalStudent.country.name" />
										</TableCell>
										</TableRow>
									</TableBody>
									</Table>
								</TableWrapper>

								<div className="flex flex-col gap-4">
									<div className="text-lg font-bold">
										Tasks
									</div>
									<DataGrid entities="BuddyTask[buddyPair.id = $id]">
										<DataGridLoader>
											<DataGridTable>
												<DataGridColumn>
													<div className="flex gap-4">
														<Link to="buddyTaskDetail(id: $entity.id)">
															<a>
																Detail
															</a>
														</Link>
														<Link to="buddyTaskEdit(id: $entity.id)">
															<a>
																Edit
															</a>
														</Link>
													</div>
												</DataGridColumn>
												<DataGridTextColumn field="description" header="Description" />
												<DataGridBooleanColumn field="done" header="Done" />
												<DataGridBooleanColumn field="confirmed" header="Confirmed" />
											</DataGridTable>
										</DataGridLoader>
									</DataGrid>
								</div>
							</div>


						</div>
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
