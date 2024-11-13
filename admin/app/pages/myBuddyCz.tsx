import { NoteCard } from '@app/components/noteCard'
import { PersistCheckbox } from '@app/components/PersistCheckbox'
import { Binding, PersistButton, usePersistWithFeedback } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridBooleanColumn, DataGridBooleanFilter, DataGridColumn, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { DataGridNotes } from '@app/lib/datagrid/note'
import { ImageField } from '@app/lib/form'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { TextareaAutosize } from '@app/lib/ui/textarea'
import { ImageFieldView } from '@app/components/fieldViews/ImageFieldView'
import { Component, EntityListSubTree, EntitySubTree, Field, HasMany, HasOne, HasRole, identityEnvironmentExtension, If, Link, useEntity, useEntityListSubTree, useEntitySubTree, useIdentity } from '@contember/interface'
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
					<MoreBuddiesView />
				</div>
			</Binding>
		</>
	)
}

const CzechStudentTasks = Component(
	() => {
		const entityId = useEntity().id

		return (
			<div className="max-w-lg">
					<DataGrid entities={`BuddyTask[buddyPair.id='${entityId}']`}>
					<div className="text-lg font-bold">
						Tasks
					</div>
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

const MoreBuddiesView = Component(
	() => {

		const myId = useIdentity()?.person?.id

		const buddyPairs = useEntityListSubTree('buddyPairs')
		let numberOfBuddies = 0
		let buddyPairID
		for (const buddyPair of buddyPairs) {
			numberOfBuddies++
			buddyPairID = buddyPair.getField('id').value
		}

		if(numberOfBuddies === 0){
			return (<div className='bg-blue-200 p-4 rounded-md'>
				<div className='text-500'>You currently don't have a buddy. If you haven't applied yet, do it!</div>
				<Slots.Actions>
					<Link to="applicationCzCreate">
						<Button>
							Apply for buddy
						</Button>
					</Link>
				</Slots.Actions></div>)
		} else if(numberOfBuddies === 1){
			return (
				<Binding>
					<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('czechBuddy') || roles.has('coordinator')}>
					<EntitySubTree entity={`BuddyPair(id = '${buddyPairID}')`} isCreating={false}>
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
								<div>
									<p className="text-2xl font-bold">You & your buddy</p>
									<p className="text-xs text-gray-500">Please upload picture of you & your buddy</p>
									<ImageField baseField={'picture'} urlField={'url'} />
									<div className='pl-6'>
										<PersistButton label="Save picture"/>
									</div>
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
														Home university country
													</TableCell>
													<TableCell className="font-semibold">
														<Field field="internationalStudent.countryOfUniversity.name" />
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
			</Binding>
			)
		} else if(numberOfBuddies > 1){
			return (
				<DataGrid entities={`BuddyPair[czechStudent.tenantPerson.id='${myId}']`}>
					<DataGridToolbar>
						<DataGridQueryFilter />
					</DataGridToolbar>
					<DataGridLoader>
						<DataGridTable>
							<DataGridColumn>
								<div className="flex gap-2">
									<Link to="buddyPairCzDetail(id: $entity.id)">
										<Button variant={'secondary'} size={'sm'}>
											Detail
										</Button>
									</Link>
								</div>
							</DataGridColumn>
							<DataGridHasOneColumn field="coordinator" header="Coordinator">
								<Field field="firstName" /> {' '} <Field field="surname" /> {' ('} <Field field="inSISusername" /> {') '}
							</DataGridHasOneColumn>
							<DataGridHasOneColumn field="internationalStudent" header="International student">
								<Field field="firstName" /> {' '} <Field field="surname" /> {' ('} <Field field="inSISusername" /> {') '}
							</DataGridHasOneColumn>
						</DataGridTable>
					</DataGridLoader>
					<DataGridPagination />
				</DataGrid>
			)
		}


	}, (_, env) => (
		<>
		<EntityListSubTree
			entities={`BuddyPair[czechStudent.tenantPerson.id='${env.getExtension(identityEnvironmentExtension).identity?.person?.id}']`}
			alias={'buddyPairs'}>
			<Field field="id" />
		</EntityListSubTree>

		</>
	)
)