import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { RadioEnumField } from '@app/lib/form'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { EnumCell } from '@contember/admin'
import { Component, EntitySubTree, Field, HasRole, Link, useEntity } from '@contember/interface'
import { TrashIcon } from 'lucide-react'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { PersistCheckbox } from '@app/components/PersistCheckbox'
import { formatBooleanPairDetail } from '@app/lib/formatting'
export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Application detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="ApplicationCz(id=$id)" isCreating={false}>
						<Slots.Actions>
							<Link to="applicationCzCreate(id: $entity.id)">
								<Button>
									Edit application
								</Button>
							</Link>
						</Slots.Actions>
						<div className="flex justify-between gap-24 flex-col md:flex-row">
							<div className="w-full gap-4 flex flex-col">
								<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
									<Table>
										<TableBody>
											<TableRow>
												<TableCell>
													Name
												</TableCell>
												<TableCell className="font-semibold">
													<Field field="person.firstName" /> {' '} <Field field="person.surname" />
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													Semester
												</TableCell>
												<TableCell className="font-semibold">
													<Field field="semester.name" />
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													Preferred buddy gender
												</TableCell>
												<TableCell className="font-semibold">
													<PreferredSexCell />
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													Preferred country of university
												</TableCell>
												<TableCell className="font-semibold">
													<Field field="preferredCountry.name" />
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell>
													How many buddies max
												</TableCell>
												<TableCell className="font-semibold">
													<Field field="howManyBuddies" />
												</TableCell>
											</TableRow>
										</TableBody>
									</Table>
								</TableWrapper>
							</div>
							<div className="w-full gap-4 flex flex-col">
								<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
									<Table>
										<TableBody>
											<TableRow>
												<TableCell>
													Motivation
												</TableCell>
											</TableRow>
											<TableRow>
												<TableCell className="font-semibold">
													<Field field="motivation" />
												</TableCell>
											</TableRow>
											<HasRole role={roles => roles.has('admin') || roles.has('coordinator')}>
												<TableRow>
													<TableCell>
														Read
													</TableCell>
													<TableCell className="font-semibold">
														<PersistCheckbox field={'read'} />
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														Do NOT pair
													</TableCell>
													<TableCell className="font-semibold">
														<PersistCheckbox field={'notPair'} description='If you check this button. Student will not be paired.' />
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>
														Will be paired?
													</TableCell>
													<TableCell className="font-semibold">
														<Field field={'notPair'} format={formatBooleanPairDetail} />
													</TableCell>
												</TableRow>
											</HasRole>
										</TableBody>
									</Table>
								</TableWrapper>
							</div>
						</div>
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}

const PreferredSexCell = Component(() => {
	const entity = useEntity()
	const preferredSex = entity.getField('preferredSex').value

	if(preferredSex === 'dontCare') {
		return 'Not preferred'
	} else if (preferredSex === 'man') {
		return 'Man'
	} else if (preferredSex === 'woman') {
		return 'Woman'
	}
	return null
}, () => (
	<>
		<Field field="preferredSex" />
	</>
))