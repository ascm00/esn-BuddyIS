import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { EntitySubTree, Field, If, Link } from '@contember/interface'
import { formatDateTime } from '@app/lib/utils/formatting'
import { Todo } from '@app/lib/dev'

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
						<div className="flex gap-8 flex-col md:flex-row">
							<div className="w-full gap-8 flex flex-col">
							<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
								<Table>
									<TableBody>
										<TableRow>
											<TableCell>
												Name
											</TableCell>
											<TableCell className="text-2xl font-semibold">
												<Field field="name" />
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												Event starts
											</TableCell>
											<TableCell className="font-semibold">
												<Field field="startDate" format={formatDateTime} />
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												Event to
											</TableCell>
											<TableCell className="font-semibold">
												<Field field="endDate" format={formatDateTime} />
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												Registration starts
											</TableCell>
											<TableCell className="font-semibold">
												<Field field="registrationStartDate" format={formatDateTime} />
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												Registration ends
											</TableCell>
											<TableCell className="font-semibold">
												<Field field="registrationEndDate" format={formatDateTime} />
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
												Meeting point (if different from place)
											</TableCell>
											<TableCell className="font-semibold">
												<Field field="meetingPoint" />
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												Entrance fee
											</TableCell>
											<TableCell className="font-semibold">
												<Field field="fee" />
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
												Capacity
											</TableCell>
											<TableCell className="font-semibold">
												<Field field="capacity" />
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
									</TableBody>
								</Table>
							</TableWrapper>
							</div>

							<div className="w-full flex flex-col gap-4">
								<TableWrapper className="bg-gray-50/50 h-fit border rounded-md">
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
								<div className='flex gap-6 flex-col md:flex-row'>
									<Button>Register & pay</Button>
									<If condition="[allowRegistrationWithoutPayment=true]">
										<Button>Register without payment</Button>
									</If>
									<Todo>Make the buttons functional. Comgate integration</Todo>
								</div>
							</div>
						</div>
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
