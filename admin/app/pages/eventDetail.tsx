import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { Component, EntitySubTree, Field, HasMany, HasOne, HasRole, If, Link, useEntity, useIdentity } from '@contember/interface'
import { formatDateTime } from '@app/lib/utils/formatting'
import { Todo } from '@app/lib/dev'
import { RichTextRendererField } from '@app/lib/plugins/rich-text/renderer/RichTextRendererField'
import { renderElement, renderLeaf } from '@app/lib/plugins/rich-text/renderer/renderers'
import { DataGrid, DataGridColumn, DataGridHasManyColumn, DataGridHasManyFilter, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridTextFilter, DataGridToolbar } from '@app/lib/datagrid'
import { CreateEntityModalButton } from '@app/lib/buttons/createEntityModalButtons'
import { RegistrationCreateForm } from '@app/components/forms/registration-create-form'
import { DollarSign } from 'lucide-react'

const RegistrationNow = Component( () => {
	const identity = useIdentity()
	const entity = useEntity()
	const registrationStartDateValueString = entity.getField('registrationStartDate').value?.toString()
	const formattedRegistrationStartDate = registrationStartDateValueString && new Date(registrationStartDateValueString).toLocaleString()
	const registrationStartDateValue = registrationStartDateValueString && new Date(registrationStartDateValueString)
	const registrationEndDateValueString = entity.getField('registrationEndDate').value?.toString()
	const formattedRegistrationEndDate = registrationEndDateValueString && new Date(registrationEndDateValueString).toLocaleString()
	const registrationEndDateValue = registrationEndDateValueString && new Date(registrationEndDateValueString)
	
	const registrationList = entity.getEntityList('registrations') ?? undefined

	const registeredCount = entity.getField('registeredCount').value ?? undefined
	const fee = entity.getField('fee').value ?? undefined
	const capacity = entity.getField('capacity').value ?? undefined
	const waitingList = entity.getField('waitingList').value ?? 0

	//Checks if fee is bigger than 0 -> event is paid
	const isPaid = typeof fee === 'number' && (fee > 0)
	
	// Checks if the registration is open
	const registrationNow = (registrationStartDateValue && registrationEndDateValue) && ((registrationStartDateValue < new Date()) && (registrationEndDateValue > new Date()))

	// checks if the event is full
	const isNotFull = (typeof registeredCount === 'number' && typeof capacity === 'number') && (registeredCount < capacity)
	const isOnWaitingList = (typeof registeredCount === 'number' && typeof capacity === 'number' && typeof waitingList === 'number') && (registeredCount >= capacity && registeredCount < capacity + waitingList)
	
	const registered = () => { 
		if(identity?.person?.id) {
			for (const registration of registrationList) {
				let id = registration.getField('person.tenantPerson.id').value
				if(identity.person.id === id){
					return true
				}
			}
		}
		return false
	}

	if (registered()) {
		return (
			<div className='bg-blue-200 p-4 rounded-md'>
				<div className='text-500'>You are already registered for this event. If you want to cancel your registration, contact us.</div>
			</div>
		)
	} else {
		if (registrationNow) {
			if (isNotFull) {
				if(isPaid) {
					return (
						//if event is not full and is paid
						<>
							<div className='flex gap-6 flex-col md:flex-row'>
								<CreateEntityModalButton
									entityName="EventRegistration"
									buttonLabel="Register & Pay"
									saveButtonLabel="Continue to payment"
									refreshOnPersist
									createEntityForm={
									<>
										<RegistrationCreateForm />
									</>
									}
									dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
								/>
							</div> 
						</>
					)
				} else {
					// If event is for free
					return (
						<>
							<div className='flex gap-6 flex-col md:flex-row'>
								<CreateEntityModalButton
									entityName="EventRegistration"
									buttonLabel="Register"
									saveButtonLabel="Register"
									refreshOnPersist
									createEntityForm={
									<>
										<RegistrationCreateForm />
									</>
									}
									dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
								/>
							</div> 
						</>
					)
				}
			} else if (isOnWaitingList) {
				return (
					<>
						<div className='bg-blue-200 p-4 rounded-md'>
							<div className='text-500'>Event is full, but you can join waiting list.</div>
						</div>
						<div className='flex gap-6 flex-col md:flex-row'>
							<CreateEntityModalButton
								entityName="EventRegistration"
								buttonLabel="Join waiting list"
								saveButtonLabel="Join waiting list"
								refreshOnPersist
								createEntityForm={
								<>
									<RegistrationCreateForm />
								</>
								}
								dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
							/>
						</div> 
					</>
				)
			} else {
				return (
					<div className='bg-blue-200 p-4 rounded-md'>
						<div className='text-500'>Event is full.</div>
					</div>
				)
			}
		} else {
			return (
				<div className='bg-blue-200 p-4 rounded-md'>
					<div className='text-500'>Registration for this event is not open now. It is open from {formattedRegistrationStartDate} to {formattedRegistrationEndDate}.</div>
				</div>
			)
		}
	}

}, () => (
	<>
	<Field field="registrationStartDate" />
	<Field field="registrationEndDate" />
	<Field field="capacity" />
	<Field field="registeredCount" />
	<Field field="waitingList" />
	<Field field="fee" />
	<HasMany field="registrations">
		<Field field="person.tenantPerson.id" />
	</HasMany>
	</>
))

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
												Contact person
											</TableCell>
											<TableCell className="font-semibold">
												<Field field="contactPerson.firstName" /> {' '} <Field field="contactPerson.surname" /> <br></br> <Field field="contactPerson.tenantPerson.email" /> <br></br> <Field field="contactPerson.phoneNumber" />
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
												<Field field="fee" /> {' CZK'}
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
										{/* <TableRow>
											<TableCell>
												Status
											</TableCell>
											<TableCell className="font-semibold">
												<Field field="status" />
											</TableCell>
										</TableRow> */}
									</TableBody>
								</Table>
							</TableWrapper>
							</div>

							<div className="w-full flex flex-col gap-4">
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
								<Todo>We have to set default refund policy, which will be added to database as default when user doesn't enter anything. Or put it in form as default value</Todo>
								<TableWrapper className="bg-gray-50/50 h-fit border rounded-md">
									<Table>
										<TableRow>
											<TableCell>
												Description
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="font-semibold">
												{/* <HasOne field="description">
													<Field field="data" />
												</HasOne> */}
												<RichTextRendererField sourceField={'description.data'} renderElement={renderElement} renderLeaf={renderLeaf} />
											</TableCell>
										</TableRow>
									</Table>
								</TableWrapper>
								<RegistrationNow />
								<Todo>Make the buttons functional. Comgate integration. Naformátovat text</Todo>
							</div>
						</div>
						<HasRole role={roles => roles.has('admin') || roles.has('esnMemberRole')}>
							<div className="flex flex-col gap-4">
								<div className="flex justify-between">
									<div className="text-xl font-bold">Participants</div>
								</div>
								<DataGrid entities="EventRegistration[event.id = $id]" filteringStateStorage={'session'}>
									<DataGridToolbar>
										<DataGridQueryFilter />
										<DataGridHasOneFilter field="person" label="User">
											<Field field="firstName" /> {' '} <Field field="surname" />
										</DataGridHasOneFilter>
										<DataGridHasManyFilter field="allergies" label="Allergies">
											<Field field="name" />
										</DataGridHasManyFilter>
										<DataGridHasManyFilter field="dietaryRestrictions" label="Dietary Restrictions">
											<Field field="name" />
										</DataGridHasManyFilter>
									</DataGridToolbar>
									<DataGridLoader>
										<DataGridTable>
											<DataGridColumn>
												<div className="flex gap-4">
													<Link to="userDetail(id: $entity.id)">
														<Button>Detail</Button>
													</Link>
												</div>
											</DataGridColumn>
											<DataGridHasOneColumn field="person" header="Name">
												<Field field="firstName" /> {' '} <Field field="surname" />
											</DataGridHasOneColumn>
											<DataGridTextColumn field="person.tenantPerson.email" header="Email" />
											<DataGridTextColumn field="person.phoneNumber" header="Phone number" />
											<DataGridTextColumn field="person.xname" header="Xname" />
											<DataGridTextColumn field="person.esnCardId" header="ESN Card ID" />
											<DataGridHasManyColumn field="allergies" header="Allergies">
												<Field field="name" />
											</DataGridHasManyColumn>
											<DataGridHasManyColumn field="dietaryRestrictions" header="Dietary Restrictions">
												<Field field="name" />
											</DataGridHasManyColumn>
											<DataGridTextColumn field="note" header="Note" />
										</DataGridTable>
									</DataGridLoader>
								</DataGrid>
							</div>
						</HasRole>
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
