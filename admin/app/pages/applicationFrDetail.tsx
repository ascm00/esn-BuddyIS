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
						Application fr detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="ApplicationFr(id=$id)" isCreating={false}>
						<Slots.Actions>
							<Link to="applicationFrEdit(id: $entity.id)">
								<Button>
									Edit application fr
								</Button>
							</Link>
						</Slots.Actions>
						<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
							<Table>
								<TableBody>
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
											Rating
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="rating" />
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
											Preferred buddy sex
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="preferredBuddySex" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Email for information
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="emailForInformation" />
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
