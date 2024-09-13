import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { EntitySubTree, Field, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Application cz detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="ApplicationCz(id=$id)" isCreating={false}>
						<Slots.Actions>
							<Link to="applicationCzCreate(id: $entity.id)">
								<Button>
									Edit application cz
								</Button>
							</Link>
						</Slots.Actions>
						<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>
											Point
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="points" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Motivation
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="motivation" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Status
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="status" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Result
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="result" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											R buddy
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="rBuddy" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											R party
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="rParty" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											R travel
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="rTravel" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											R sport
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="rSport" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Preferred sex
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="preferredSex" />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableWrapper>
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
