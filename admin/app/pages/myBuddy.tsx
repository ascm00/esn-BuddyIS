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
import { Component, EntityListSubTree, EntitySubTree, Field, HasMany, HasOne, HasRole, identityEnvironmentExtension, If, Link, useEntity, useEntitySubTree, useIdentity } from '@contember/interface'
import { useCallback, useState } from 'react'

export default () => {

	//Musím checknout zda mám v aktuálním semestru buddyho, následně zobrazit stránku jeho/její buddy paru
	const myId = useIdentity()?.person?.id
	console.log(myId)


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

					{/* Czech buddy view */}
					<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('czechBuddy')}>
						<EntitySubTree entity={`BuddyPair(czechStudent.tenantPerson.id='${myId}')`} isCreating={false}>
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
													<TableCell className="font-semibold">
														<Field field="coordinator.firstName" /> {' '} <Field field="coordinator.surname" />
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														Email
													</TableCell>
													<TableCell className="font-semibold">
														<Field field="coordinator.tenantPerson.email" />
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														Phone number
													</TableCell>
													<TableCell className="font-semibold">
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
														<TableCell className="font-semibold">
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
										<CzechStudentTasks />

									</div>
							</div>
						</EntitySubTree>
					</HasRole>
					{/* End of Czech buddy view */}

					{/* International student view */}
					<HasRole role={'internationalStudent'}>
						<EntitySubTree entity={`BuddyPair(internationalStudent.tenantPerson.id='${myId}')`} isCreating={false}>
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
													<TableCell className="font-semibold">
														<Field field="coordinator.firstName" /> {' '} <Field field="coordinator.surname" />
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														Email
													</TableCell>
													<TableCell className="font-semibold">
														<Field field="coordinator.tenantPerson.email" />
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														Phone number
													</TableCell>
													<TableCell className="font-semibold">
														<Field field="coordinator.phoneNumber" />
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
															<Field field="czechStudent.firstName" /> {' '} <Field field="internationalStudent.surname" />
														</TableCell>
													</TableRow>
													<TableRow>
														<TableCell>
															Email
														</TableCell>
														<TableCell className="font-semibold">
															<Field field="czechStudent.tenantPerson.email" />
														</TableCell>
														</TableRow>
													<TableRow>
														<TableCell>
															Phone number
														</TableCell>
														<TableCell className="font-semibold">
															<Field field="czechStudent.phoneNumber" />
														</TableCell>
													</TableRow>
													<TableRow>
														<TableCell>
															Nationality
														</TableCell>
														<TableCell className="font-semibold">
															<Field field="czechStudent.country.name" />
														</TableCell>
													</TableRow>
												</TableBody>
											</Table>
										</TableWrapper>

										<InternationalStudentTasks />
									</div>
								</div>
						</EntitySubTree>
					</HasRole>
					{/* End of International student view */}

				</div>
			</Binding>
		</>
	)
}

const CzechStudentTasks = Component(
	() => {
		const entityId = useEntity().id

		return (
			<div className="flex flex-col gap-4">
				<div className="text-lg font-bold">
					Tasks
				</div>
					<DataGrid entities={`BuddyTask[buddyPair.id='${entityId}']`}>
						<DataGridLoader>
							<DataGridTable>
								<DataGridTextColumn field="description" header="Description" />
								{/* <DataGridBooleanColumn field="done" header="Done" /> */}
								<DataGridColumn header="Done">
									<PersistCheckbox field="done" />
								</DataGridColumn>
								<DataGridBooleanColumn field="confirmed" header="Confirmed" >
								</DataGridBooleanColumn>
							</DataGridTable>
						</DataGridLoader>
					</DataGrid>
				</div>
		)
	}, () => (
		<>
			<Field field="id" />
			<HasMany field="tasks">
				<Field field="id" />
				<Field field="description" />
				<Field field="done" />
				<Field field="confirmed" />
			</HasMany>
		</>
	)
)

const InternationalStudentTasks = Component(
	() => {
		const entityId = useEntity().id

		return (
			<div className="flex flex-col gap-4">
				<div className="text-lg font-bold">
					Tasks
				</div>
					<DataGrid entities={`BuddyTask[buddyPair.id='${entityId}']`}>
						<DataGridLoader>
							<DataGridTable>
								<DataGridTextColumn field="description" header="Description" />
								{/* <DataGridBooleanColumn field="done" header="Done" /> */}
								<DataGridBooleanColumn field="done" header="Done" />
								<DataGridColumn header="Confirmed">
									<PersistCheckbox field="confirmed" />
								</DataGridColumn>
							</DataGridTable>
						</DataGridLoader>
					</DataGrid>
				</div>
		)
	}, () => (
		<>
			<Field field="id" />
			<HasMany field="tasks">
				<Field field="id" />
				<Field field="description" />
				<Field field="done" />
				<Field field="confirmed" />
			</HasMany>
		</>
	)
)