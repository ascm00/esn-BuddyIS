import { Binding, DeleteEntityDialog } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { Component, DeleteEntityTrigger, EntitySubTree, Environment, Field, HasMany, HasOne, HasRole, If, Link, useEntity, useIdentity, usePersist, useProjectUserRoles } from '@contember/interface'
import { formatDateTime, formatDateTimeShort } from '@app/lib/utils/formatting'
import { Todo } from '@app/lib/dev'
import { RichTextRendererField } from '@app/lib/plugins/rich-text/renderer/RichTextRendererField'
import { renderElement, renderLeaf } from '@app/lib/plugins/rich-text/renderer/renderers'
import { DataGrid, DataGridActionColumn, DataGridColumn, DataGridDateColumn, DataGridEnumColumn, DataGridEnumFilter, DataGridHasManyColumn, DataGridHasManyFilter, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridNumberColumn, DataGridNumberFilter, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridTextFilter, DataGridToolbar } from '@app/lib/datagrid'
import { CreateEntityModalButton } from '@app/lib/buttons/createEntityModalButtons'
import { RegistrationAdminCreateForm, RegistrationCreateForm } from '@app/components/forms/registration-create-form'
import { Delete, DollarSign, Edit, History, PlusCircle, Trash, TrashIcon } from 'lucide-react'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { ImageFieldView, PersistButton } from '@contember/admin'
import config from '../../config'
import { Env } from '@app/lib/functions/types'
import { EventPictureFieldView, ProfilePictureFieldView } from '@app/components/fieldViews/ImageFieldView'
import { GoogleMapsLink, WhatsappLink } from '@app/lib/utils/link'
import { PlacesLeftTag } from '@app/lib/ui/event-status'
import { formatPaymentStatusTag } from '@app/lib/formatting/paymentStatus'
import { AddToRegisteredUsersButton, PaymentButton } from '@app/lib/components/registration'
import { useIsMobile } from '@app/lib/utils/use-mobile'

/* The above code is a TypeScript React component called `RegistrationNow`. It is responsible for
rendering different UI elements based on various conditions related to event registration. Here is a
breakdown of what the code is doing: */
const RegistrationNow = Component( () => {
	const isMobile = useIsMobile()
	const identity = useIdentity()
	const entity = useEntity()
	const eventId = entity.getField('id').value
	const registrationStartDateValueString = entity.getField('registrationStartDate').value?.toString()
	const formattedRegistrationStartDate = registrationStartDateValueString && new Date(registrationStartDateValueString).toLocaleString()
	const registrationStartDateValue = registrationStartDateValueString && new Date(registrationStartDateValueString)
	const registrationEndDateValueString = entity.getField('registrationEndDate').value?.toString()
	const formattedRegistrationEndDate = registrationEndDateValueString && new Date(registrationEndDateValueString).toLocaleString()
	const registrationEndDateValue = registrationEndDateValueString && new Date(registrationEndDateValueString)
	const eventStartDateValue = entity.getField('startDate').value?.toString()
	const eventStartDate = eventStartDateValue && new Date(eventStartDateValue)
	
	
	const registrationList = entity.getEntityList('registrations') ?? undefined

	const registeredCount = entity.getField('registeredCount.registered_count').value ?? undefined
	const fee = entity.getField('fee').value ?? undefined
	const capacity = entity.getField('capacity').value ?? undefined
	const waitingList = entity.getField('waitingList').value ?? 0

	//Checks if fee is bigger than 0 -> event is paid
	const isPaid = typeof fee === 'number' && (fee > 0)
	
	// Checks if the registration is open
	const registrationNow = (registrationStartDateValue && registrationEndDateValue) && ((registrationStartDateValue < new Date()) && (registrationEndDateValue > new Date()))
	const eventAlreadyHappened = eventStartDate && (eventStartDate < new Date())

	// checks if the event is full
	const isNotFull = (typeof registeredCount === 'number' && typeof capacity === 'number') && (registeredCount < capacity)
	const isOnWaitingList = (typeof registeredCount === 'number' && typeof capacity === 'number' && typeof waitingList === 'number') && (registeredCount >= capacity && registeredCount < capacity + waitingList)
	
	const registered = () => { 
		if(identity?.person?.id) {
			for (const registration of registrationList) {
				let id = registration.getField('person.tenantPerson.id').value
				if((identity.person.id === id) && (registration.getField('accepted').value)){
					return true
				}
			}
		}
		return false
	}

	const registrationWaitingForPayment = () => { 
		if(identity?.person?.id) {
			for (const registration of registrationList) {
				let id = registration.getField('person.tenantPerson.id').value
				if((identity.person.id === id) && (registration.getField('accepted').value)){
					if(isPaid && registration.getField('payment').value === 'unpaid'){
						return registration
					}
				}
			}
		}
		return null
	}

	const registrationWaitingIsNotOnWaitingList = () => { 
		if(identity?.person?.id) {
			for (const registration of registrationList) {
				let id = registration.getField('person.tenantPerson.id').value
				if((identity.person.id === id) && (registration.getField('accepted').value)){
					if(isPaid && registration.getField('payment').value === 'unpaid' && registration.getField('isWaitingList').value === true){
						return registration
					}
				}
			}
		}
		return null
	}

	// Checks if the user is allowed to register for the event
	let notForMe = false
	const isForCzechBuddies = entity.getField('isForCzechBuddies').value ?? false
	const isForESNmembers = entity.getField('isForESNmembers').value ?? false
	const isForInternationalStudents = entity.getField('isForInternationalStudents').value ?? false
	const roles = useProjectUserRoles()
	roles.forEach(role => {
		if(role === 'czechBuddy') {
			notForMe = !isForCzechBuddies
		} else if(role === 'esnMember') {
			notForMe = !isForESNmembers
		} else if(role === 'internationalStudent') {
			notForMe = !isForInternationalStudents
		}
	})

	if (eventAlreadyHappened) {
		return (
			<div className='bg-blue-200 p-4 rounded-md max-w-md'>
				<div className='text-500'>This event has already happened. ✔️</div>
			</div>
		)
	} else if (registered()) {
		if(registrationWaitingForPayment()){
			return (
				<>
				<div className='bg-blue-200 p-4 rounded-md max-w-md'>
					<div className='text-500'>‼️ You are already registered for this event, but the registration is not paid. If you want to pay, click the button below.</div>
				</div>

				{registrationWaitingIsNotOnWaitingList() 
				? <div className='max-w-md'>
					<PaymentButton registration={registrationWaitingForPayment()} />
				</div> 
				: <div className='bg-blue-200 p-4 rounded-md max-w-md'>
					<div className='text-500'>You are already registered for this event, but you are on waiting list. We will contact you if a place becomes available.</div>
				</div>}
				</>
			)
		} else {
			return (
				<div className='bg-blue-200 p-4 rounded-md max-w-md'>
					<div className='text-500'>You are already registered for this event. If you want to cancel your registration, contact us via email. ✔️</div>
				</div>
			)
		}
	} else {
		if(notForMe) {
			return (
				<div className='bg-blue-200 p-4 rounded-md max-w-md'>
					<div className='text-500'>Unfortunately this event is not for your user role. 🫠</div>
				</div>
			)
		}
		else if (registrationNow) {
			if (isNotFull) {
				if(isPaid) {
					return (
						//if event is not full and is paid
						<>
							<div className='flex gap-6 flex-col md:flex-row'>
									<Link to={"registrationPayCreate(id: $entity.id)"}>
										<Button>
											Register & Pay
										</Button>
									</Link>
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
						<div className='bg-blue-200 p-4 rounded-md max-w-md'>
							<div className='text-500'>Event is full, but you can join waiting list. 📄</div>
						</div>
						<div className='flex gap-6 flex-col md:flex-row'>
							<CreateEntityModalButton
								entityName="EventRegistration"
								buttonLabel="Join waiting list"
								saveButtonLabel="Join waiting list"
								refreshOnPersist
								createEntityForm={
								<>
									<RegistrationCreateForm isOnWaitingList={true} />
								</>
								}
								dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
							/>
						</div> 
					</>
				)
			} else {
				return (
					<div className='bg-blue-200 p-4 rounded-md max-w-md'>
						<div className='text-500'>Event is full. 🫠</div>
					</div>
				)
			}
		} else {

			return (
				<div className='bg-blue-200 p-4 rounded-md max-w-md'>
					<div className='text-500'>Registration for this event is not open now. 🛑 It is open from {formattedRegistrationStartDate} to {formattedRegistrationEndDate}. 📅</div>
				</div>
			)
		}
	}

}, () => (
	<>
	<Field field="registrationStartDate" />
	<Field field="isForCzechBuddies" />
	<Field field="isForInternationalStudents" />
	<Field field="isForESNmembers" />
	<Field field="registrationEndDate" />
	<Field field="startDate" />
	<Field field="capacity" />
	<HasOne field="registeredCount">
		<Field field="registered_count" />
	</HasOne>
	<Field field="waitingList" />
	<Field field="fee" />
	<HasMany field="registrations">
		<HasOne field={'person'}>
			<Field field="tenantPerson.id" />
			<Field field="tenantPerson.email" />
			<Field field="firstName" />
			<Field field="surname" />
			<Field field="phoneNumber" />
		</HasOne>
		<Field field="accepted" />
		<Field field="payment" />
		<HasOne field={'event'}>
			<Field field="fee" />
			<Field field="id" />
		</HasOne>
	</HasMany>
	</>
))

const RegistrationAdminCreate = Component(
	() => {
		const entity = useEntity()
		const fee = entity.getField('fee').value ?? undefined
		const isPaid = typeof fee === 'number' && (fee > 0)
		const isMobile = useIsMobile()

		const eventStartDateValue = entity.getField('startDate').value?.toString()
		const eventStartDate = eventStartDateValue && new Date(eventStartDateValue)

		const registeredCount = entity.getField('registeredCount.registered_count').value ?? undefined
		const capacity = entity.getField('capacity').value ?? undefined
		const waitingList = entity.getField('waitingList').value ?? 0

		const isNotFull = (typeof registeredCount === 'number' && typeof capacity === 'number') && (registeredCount < capacity)
		const isOnWaitingList = (typeof registeredCount === 'number' && typeof capacity === 'number' && typeof waitingList === 'number') && (registeredCount >= capacity && registeredCount < (capacity + waitingList))


		if (eventStartDate && eventStartDate < new Date()) {
			return null
		} else if (isNotFull){
			if (isPaid) {
				return (
					<CreateEntityModalButton
						entityName="EventRegistration"
						buttonLabel={"Register user"}
						button={<Button>{isMobile ? <PlusCircle /> : 'Register user'}</Button>}
						saveButtonLabel="Register user"
						refreshOnPersist
						createEntityForm={
						<>
							<RegistrationAdminCreateForm isPaid={true} />
						</>
						}
						dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
					/>
				)
			} else {
				return (
					<CreateEntityModalButton
						entityName="EventRegistration"
						button={<Button>{isMobile ? <PlusCircle /> : 'Register user'}</Button>}
						saveButtonLabel="Register user"
						refreshOnPersist
						createEntityForm={
						<>
							<RegistrationAdminCreateForm isPaid={false} />
						</>
						}
						dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
					/>
				)
			}

		} else if (isOnWaitingList) {
			return (
				<CreateEntityModalButton
					entityName="EventRegistration"
					button={<Button>{isMobile ? <PlusCircle /> : 'Register user'}</Button>}
					saveButtonLabel="Put user on a waiting list"
					refreshOnPersist
					createEntityForm={
					<>
						<div className='bg-blue-200 p-4 rounded-md'><div className='text-500'>Capacity is full, but you can put user on a waiting list. You can also increase the capacity on Edit event page. ✏️</div></div>
						<RegistrationAdminCreateForm isPaid={false} isOnWaitingList={true} />
					</>
					}
					dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
				/>
			)
		}
	}, () => (
		<>
			<Field field="fee" />
			<Field field="startDate" />
			<HasOne field="registeredCount">
				<Field field="registered_count" />
			</HasOne>
			<Field field="capacity" />
			<Field field="waitingList" />
		</>
	))

export default () => {
	const identity = useIdentity()
	const isMobile = useIsMobile()
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Event(id=$id)" isCreating={false}>
						<Slots.Title>
							<div className='flex flex-row gap-3'><div className='mt-1'>Event detail</div><PlacesLeftTag /></div>
						</Slots.Title>
						<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
							<Slots.Actions>
								<RegistrationAdminCreate />
								<If condition={`[contactPerson.tenantPerson.id = "${identity?.person?.id}" && contactPerson.tenantPerson.roles != "admin"]`}>
									<Link to="eventEdit(id: $entity.id)">
										<Button>
											{isMobile ? <Edit /> : 'Edit event'}
										</Button>
									</Link>
									<Link to="registrationsLogs(id: $entity.id)">
										<Button>
											{isMobile ? <History /> : 'Registration history'}
										</Button>
									</Link>
								</If>
								<HasRole role={roles => roles.has('admin')}>
									<Link to="eventEdit(id: $entity.id)">
										<Button>
											{isMobile ? <Edit /> : 'Edit event'}
										</Button>
									</Link>
									<Link to="registrationsLogs(id: $entity.id)">
										<Button>
											{isMobile ? <History /> : 'Registration history'}
										</Button>
									</Link>
								</HasRole>
								<If condition={`[contactPerson.tenantPerson.id = "${identity?.person?.id}" && contactPerson.tenantPerson.roles != "admin"]`}>
									<div className=''>
										<DeleteEntityModalButton 
											message="Do you really want to delete?"
											deleteMessage="Delete"
											cancelTo={'events'}
											afterPersistTo={'events'}
										>
											<Button variant={'destructive'}>
												<TrashIcon />
											</Button>
										</DeleteEntityModalButton>
									</div>
								</If>
								<HasRole role={roles => roles.has('admin')}>
									<div className=''>
										<DeleteEntityModalButton 
											message="Do you really want to delete?"
											deleteMessage="Delete"
											cancelTo={'events'}
											afterPersistTo={'events'}
										>
											<Button variant={'destructive'}>
												<TrashIcon />
											</Button>
										</DeleteEntityModalButton>
									</div>
								</HasRole>
							</Slots.Actions>
						</HasRole>
						<div className="flex justify-between gap-24 flex-col md:flex-row">
							<div className="w-full gap-4 flex flex-col">
							<TableWrapper className="bg-gray-50/50 max-w-xl border rounded-md">
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
												Place
											</TableCell>
											<TableCell className="font-semibold">
											<GoogleMapsLink />
											</TableCell>
										</TableRow>
										<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
											<TableRow>
												<TableCell>
													Registered + on waiting list
												</TableCell>
												<TableCell className="font-semibold">
													<Field field="registeredCount.registered_count" />
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
										</HasRole>
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
												<WhatsappLink />
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableWrapper>
							<TableWrapper className="bg-gray-50/50 max-w-xl h-fit border rounded-md">
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
							<TableWrapper className="bg-gray-50/50 max-w-xl h-fit border rounded-md">
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
							</div>

							<div className="w-full flex flex-col gap-4 pb-12">
								<EventPictureFieldView />
								<TableWrapper className="bg-gray-50/50 max-w-md border rounded-md">
									<Table>
										<TableRow>
											<TableCell>
												Event
											</TableCell>
											<TableCell className="font-semibold">
												From: <Field field="startDate" format={formatDateTimeShort} /><br />
												To: <Field field="endDate" format={formatDateTimeShort} />
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												Registration
											</TableCell>
											<TableCell className="font-semibold">
												From: <Field field="registrationStartDate" format={formatDateTimeShort} /><br />
												To: <Field field="registrationEndDate" format={formatDateTimeShort} />
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
									</Table>
								</TableWrapper>
								<RegistrationNow />
							</div>
						</div>
						<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
							<div className="flex flex-col gap-4">
								<div className="flex justify-between">
									<div className="text-xl font-bold">Registered users</div>
								</div>
								<DataGrid entities="EventRegistration[(isWaitingList != true) && (event.id = $id) && (accepted = true)]" filteringStateStorage={'session'}>
									<DataGridToolbar copyingMails="eventDetail">
										<DataGridQueryFilter />
										<DataGridHasOneFilter field="person" label="User" options={'Person[registrations[event.id = $id && accepted=true && isWaitingList=false]]'}>
											<Field field="firstName" /> {' '} <Field field="surname" />
										</DataGridHasOneFilter>
										<DataGridHasManyFilter field="allergies" label="Allergies">
											<Field field="name" />
										</DataGridHasManyFilter>
										<DataGridHasManyFilter field="dietaryRestrictions" label="Dietary Restrictions">
											<Field field="name" />
										</DataGridHasManyFilter>
										<DataGridNumberFilter field={'person.ageView.age'} label="Age" />
										<DataGridEnumFilter field="payment" options={{ paid: 'Paid', cancelled: 'Cancelled', pending: 'Pending', unpaid: 'Unpaid' }} label="Payment status" />
										<DataGridHasOneFilter field="personWhoMadeRegistration" label="Manually registered by">
											<Field field="firstName" /> {' '} <Field field="surname" />
										</DataGridHasOneFilter>
									</DataGridToolbar>
									<DataGridLoader>
										<DataGridTable>
											<DataGridColumn>
												<div className="flex gap-2">
													<Link to="registrationDetail(id: $entity.id)">
														<Button variant={'secondary'} size={'sm'}>Detail</Button>
													</Link>
												</div>
											</DataGridColumn>
											<DataGridHasOneColumn field="person" header="Name">
												<Link to="userDetail(id: $entity.id)">
													<a>
														<Field field="firstName" /> {' '} <Field field="surname" />
													</a>
												</Link>
											</DataGridHasOneColumn>
											<DataGridColumn header="Payment">
												<Field field={'payment'} format={formatPaymentStatusTag} />
											</DataGridColumn>
											<DataGridTextColumn field="person.tenantPerson.email" header="Email" />
											<DataGridTextColumn field="person.phoneNumber" header="Phone number" />
											<DataGridTextColumn field="person.inSISusername" header="InSIS username" />
											<DataGridTextColumn field="person.esnCardId" header="ESNcard ID" />
											<DataGridNumberColumn field="person.ageView.age" header="Age" />
											<DataGridHasManyColumn field="allergies" header="Allergies">
												<Field field="name" />
											</DataGridHasManyColumn>
											<DataGridHasManyColumn field="dietaryRestrictions" header="Dietary Restrictions">
												<Field field="name" />
											</DataGridHasManyColumn>
											<DataGridTextColumn field="note" header="Note" />
											<DataGridDateColumn field="createdAt" header="Registered At" children={<Field field="createdAt" format={formatDateTime} />}/>
											<DataGridNumberColumn field="paymentId" header="Payment ID" />
											<DataGridHasOneColumn field="personWhoMadeRegistration" header="Manually registered by">
												<Field field="firstName" /> {' '} <Field field="surname" />
											</DataGridHasOneColumn>
										</DataGridTable>
									</DataGridLoader>
									<DataGridPagination entity='registered users' />
								</DataGrid>
							</div>
							<div className="flex flex-col gap-4">
								<div className="flex justify-between">
									<div className="text-xl font-bold">Waiting list</div>
								</div>
								<DataGrid entities="EventRegistration[isWaitingList = true && event.id = $id && accepted = true]" filteringStateStorage={'session'}>
									<DataGridToolbar>
										<DataGridQueryFilter />
										<DataGridHasOneFilter field="person" label="User" options={'Person[registrations[event.id = $id && accepted=true && isWaitingList=true]]'}>
											<Field field="firstName" /> {' '} <Field field="surname" />
										</DataGridHasOneFilter>
										<DataGridHasManyFilter field="allergies" label="Allergies">
											<Field field="name" />
										</DataGridHasManyFilter>
										<DataGridHasManyFilter field="dietaryRestrictions" label="Dietary Restrictions">
											<Field field="name" />
										</DataGridHasManyFilter>
										<DataGridNumberFilter field={'person.ageView.age'} label="Age" />
										<DataGridHasOneFilter field="personWhoMadeRegistration" label="Manually registered by">
											<Field field="firstName" /> {' '} <Field field="surname" />
										</DataGridHasOneFilter>
									</DataGridToolbar>
									<DataGridLoader>
										<DataGridTable>
											<DataGridColumn>
												<div className="flex gap-2">
													<AddToRegisteredUsersButton />
													<Link to="registrationDetail(id: $entity.id)">
														<Button variant={'secondary'} size={'sm'}>Detail</Button>
													</Link>
												</div>
											</DataGridColumn>
											<DataGridDateColumn field="createdAt" header="Registered At" children={<Field field="createdAt" format={formatDateTime} />}/>
											<DataGridHasOneColumn field="person" header="Name">
												<Link to="userDetail(id: $entity.id)">
													<a>
														<Field field="firstName" /> {' '} <Field field="surname" />
													</a>
												</Link>
											</DataGridHasOneColumn>
											<DataGridTextColumn field="person.tenantPerson.email" header="Email" />
											<DataGridTextColumn field="person.phoneNumber" header="Phone number" />
											<DataGridTextColumn field="person.inSISusername" header="InSIS username" />
											<DataGridTextColumn field="person.esnCardId" header="ESNcard ID" />
											<DataGridNumberColumn field="person.ageView.age" header="Age" />
											<DataGridHasManyColumn field="allergies" header="Allergies">
												<Field field="name" />
											</DataGridHasManyColumn>
											<DataGridHasManyColumn field="dietaryRestrictions" header="Dietary Restrictions">
												<Field field="name" />
											</DataGridHasManyColumn>
											<DataGridTextColumn field="note" header="Note" />
											<DataGridHasOneColumn field="personWhoMadeRegistration" header="Manually registered by">
												<Field field="firstName" /> {' '} <Field field="surname" />
											</DataGridHasOneColumn>
										</DataGridTable>
									</DataGridLoader>
									<DataGridPagination entity='users on waiting list' />
								</DataGrid>
							</div>
						</HasRole>
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}


