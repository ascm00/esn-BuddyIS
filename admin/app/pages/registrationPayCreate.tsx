import { EventCreateForm } from '@app/components/forms/event-create-form'
import { RegistrationCreateForm } from '@app/components/forms/registration-create-form'
import { Binding, PersistButton } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { formatDateTime } from '@app/lib/formatting'
import { Slots } from '@app/lib/layout'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { GoogleMapsLink } from '@app/lib/utils/link'
import { Component, EntitySubTree, Field, HasOne, RedirectOnPersist, useEntity, useEntitySubTree } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Registration
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="EventRegistration" isCreating>
						{/* <Slots.Actions>
							<PersistButton label={`Pay ${fee} CZK`}/>
						</Slots.Actions> */}
						{/* <RegistrationCreateForm isPaid={false}/> */}
						<SumUp />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}

const SumUp = Component(
	() => {

	return (
		<>
			<Slots.Actions>
				<PersistButton label={`Register & Pay`}/>
			</Slots.Actions>
		<div className="flex gap-8 flex-col md:flex-row">
			<div className="w-full gap-8 flex flex-col">
				<RegistrationCreateForm isPaid={true} />
			</div>
			<div className="w-full gap-8 flex flex-col">
				<EntitySubTree entity={`Event(id=$id)`} isCreating={false}>
				<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="text-2xl font-bold">
									Event summary
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									Event
								</TableCell>
								<TableCell className="font-semibold">
									<Field field={'name'} />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									Price
								</TableCell>
								<TableCell className="font-semibold">
									<Field field="fee" /> {' CZK'}
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
									Event ends
								</TableCell>
								<TableCell className="font-semibold">
									<Field field="endDate" format={formatDateTime} />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									Place
								</TableCell>
								<TableCell className="font-semibold">
									<GoogleMapsLink />
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
						</TableBody>
					</Table>
				</TableWrapper>
				<TableWrapper className="bg-gray-50/50 h-fit border rounded-md">
					<Table>
						<TableRow>
							<TableCell>
								Refund policy
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-semibold">
								<Field field={'refundPolicy'} />
							</TableCell>
						</TableRow>
					</Table>
				</TableWrapper>
				</EntitySubTree>
			</div>
		</div>
		</>
	)
},
)

