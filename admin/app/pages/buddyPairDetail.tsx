import { NoteCard } from '@app/components/noteCard'
import { PersistCheckbox } from '@app/components/PersistCheckbox'
import { Binding, usePersistWithFeedback } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridBooleanColumn, DataGridColumn, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { DataGridNotes } from '@app/lib/datagrid/note'
import { ImageField } from '@app/lib/form'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { TextareaAutosize } from '@app/lib/ui/textarea'
import { ImageFieldView } from '@app/components/fieldViews/ImageFieldView'
import { Component, EntityAccessor, EntitySubTree, Field, HasMany, HasOne, HasRole, identityEnvironmentExtension, Link, RedirectOnPersist, useCurrentRequest, useEntity, useEntityBeforePersist, useEntityPersistSuccess, useEntitySubTree, useRedirect } from '@contember/interface'
import { useCallback, useState } from 'react'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { CurrentEntityLazyModalEdit } from '@app/lib/buttons/modalEdit'
import { BuddyPairEditForm } from '@app/components/forms/buddy-pair-edit-form'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Buddy pair detail 🤝
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="BuddyPair(id=$id)" isCreating={false}>
						<Slots.Actions>
							<HasRole role={roles => roles.has('admin') || roles.has('coordinator')}>
								<UnpairButton />
								<CurrentEntityLazyModalEdit
									redirectOnSuccess={'buddyPairDetail(id: $entity.id)'}
									dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
									buttonContent={
										<span className="flex items-center">
											Edit buddy pair
										</span>
									}
								>
									<BuddyPairEditForm />
								</CurrentEntityLazyModalEdit>
							</HasRole>
						</Slots.Actions>
						<div className="flex gap-8 flex-col md:flex-row">
							<div className="w-full gap-8 flex flex-col">
							<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
								<Table>
									<TableBody>
										<TableRow>
											<TableCell className="text-2xl font-bold">
												Local buddy
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												Name
											</TableCell>
											<TableCell className="font-semibold">
												<Field field="czechStudent.firstName" /> {' '} <Field field="czechStudent.surname" />
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
									</TableBody>
								</Table>
							</TableWrapper>
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
							<HasRole role={roles => roles.has('admin') || roles.has('coordinator')}>
								<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
									<Table>
										<TableBody>
											<TableRow>
												<TableCell>
													10 points
												</TableCell>
												<TableCell className="text-2xl font-semibold">
													<PersistCheckbox field={'tenPoints'} />
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													Arrival
												</TableCell>
												<TableCell className="text-2xl font-semibold">
													<Field field="arrival" />
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableWrapper>
							</HasRole>
								<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
									<Table>
									<TableBody>
										<TableRow>
											<TableCell className="text-2xl font-bold">
												Image
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="text-2xl font-bold">
												<ImageFieldView width={100} height={100} />
											</TableCell>
										</TableRow>
									</TableBody>
									</Table>
								</TableWrapper>
							</div>

							<div className="w-full gap-8 flex flex-col">
								<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
									<Table>
									<TableBody>
										<TableRow>
											<TableCell className="text-2xl font-bold">
												Foreign buddy
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
											Home university country
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="internationalStudent.countryOfUniversity.name" />
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
													<div className="flex gap-2">
														<HasRole role={roles => roles.has('admin') || roles.has('coordinator')}>
															<Link to="buddyTaskEdit(id: $entity.id)">
																<Button variant={'secondary'} size={'sm'}>
																	Edit
																</Button>
															</Link>
														</HasRole>
													</div>
												</DataGridColumn>
												<DataGridTextColumn field="description" header="Description" />
												<DataGridBooleanColumn field="done" header="Done" />
												<DataGridBooleanColumn field="confirmed" header="Confirmed" />
											</DataGridTable>
										</DataGridLoader>
									</DataGrid>
								</div>

								<div className="bg-gray-50/50 h-fit border rounded-md p-4">
									<AddNoteArea />
								</div>
							</div>


						</div>
					</EntitySubTree>
					<div className="flex flex-col gap-4">
							<div className="flex justify-between">
								<div className="text-lg font-bold">Notes</div>
							</div>
							<DataGrid
								entities="Note[buddyPair.id = $id]"
								filteringStateStorage={'session'}
								initialSorting={{ createdAt: 'desc' }}
							>
								{/* <DataGridToolbar>
									<DataGridQueryFilter />
								</DataGridToolbar> */}
								<DataGridLoader>
									<DataGridNotes>
										<NoteCard />
									</DataGridNotes>
								</DataGridLoader>
							</DataGrid>
						</div>
				</div>
			</Binding>
		</>
	)
}

const UnpairButton = Component(() => {

	const czechStudent = useEntitySubTree('czechStudent')
	const internationalStudent = useEntitySubTree('internationalStudent')

	useEntityBeforePersist(() => {
		internationalStudent.getField('applicationsFr.status').updateValue('toBePaired')
		// Array.from(czechStudent.getEntityList('applications')).forEach(application => {
		// 	if(application.getEntity('semester').getField('isCurrent').value === true) {
		// 		application.getField('status').updateValue('toBePaired')

		// 	}
		// })
	})

	return (
		<DeleteEntityModalButton 
			message="Do you really want to unpair?"
			deleteMessage="Unpair"
			cancelTo={'buddyPairs'}
			afterPersistTo={'buddyPairs'}
		>
			<Button variant={'destructive'}>
				Unpair
			</Button>
		</DeleteEntityModalButton>

	)
}, () => (
	<>
		<EntitySubTree entity="Person(czechBuddyPair.id = $id)" alias={'czechStudent'}>
			<HasMany field="applications">
				<HasOne field="semester">
					<Field field="isCurrent" />
				</HasOne>
				<Field field="status.status" />
				<Field field="howManyBuddies" />
				<Field field="howManyBuddiesAssigned.number" />
			</HasMany>
		</EntitySubTree>
		<EntitySubTree entity="Person(internationalBuddyPair.id = $id)" alias={'internationalStudent'}>
			<HasOne field="applicationsFr">
				<HasOne field="semester">
					<Field field="isCurrent" />
				</HasOne>
				<Field field="status" />
			</HasOne>
		</EntitySubTree>

	</>
))


const AddNoteArea = Component(
	() => {
		const persist = usePersistWithFeedback()
		const req = useCurrentRequest()
		const entity = useEntity()
		const notesList = entity.getEntityList('notes')
		const currentUser = useEntitySubTree('currentUser')
		const [noteContent, setNoteContent] = useState('')

		const handleAddNote = useCallback(() => {
			notesList.createNewEntity(getAccessor => {
				const note = getAccessor()
				note.connectEntityAtField('buddyPair', entity)
				note.getField('content').updateValue(noteContent)
				note.connectEntityAtField('author', currentUser)
			})
			persist()
		}, [notesList, entity, currentUser, noteContent, persist])

		return (
			<div className="flex flex-col gap-2">
				<div className="flex justify-between items-center">
					<div className="text-lg font-bold">New note</div>
					<Button size="sm" disabled={noteContent === ''} onClick={handleAddNote}>
						Add
					</Button>
				</div>
				<TextareaAutosize className="h-28" value={noteContent} onChange={e => setNoteContent(e.target.value)} />
				<RedirectOnPersist to={req} />
			</div>
		)
	},
	(_, environment) => (
		<>
			<EntitySubTree
				entity={{ entityName: 'Person', where: `(tenantPerson.id='${environment.getExtension(identityEnvironmentExtension).identity?.person?.id}')` }}
				alias="currentUser"
			/>
			<HasMany field="notes">
				<Field field="content" />
				<HasOne field="author">
				</HasOne>
				<HasOne field="buddyPair" />
			</HasMany>
		</>
	),
)
