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
						Event detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Event(id=$id)" isCreating={false}>
						<Slots.Actions>
							<Link to="eventEdit(id: $entity.id)">
								<Button>
									Edit event
								</Button>
							</Link>
						</Slots.Actions>
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
											Description
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="description" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Start date
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="startDate" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											End date
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="endDate" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Capacity
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="capacity" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Fee
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="fee" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Place
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="place" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											What to bring
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="whatToBring" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Whatsapp link
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="whatsappLink" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Registration start date
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="registrationStartDate" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Registration end date
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="registrationEndDate" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Waiting list
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="waitingList" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Meeting point
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="meetingPoint" />
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
											Private
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="private" />
										</TableCell>
									</TableRow>
									<div data-field="picture" data-label="Picture" />
								</TableBody>
							</Table>
						</TableWrapper>
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
