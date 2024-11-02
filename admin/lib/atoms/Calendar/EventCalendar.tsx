import { CreateEntityModalButton } from '@app/lib/buttons/createEntityModalButtons'
import { Binding, PersistButton } from '@app/lib/binding'
import { SelectField } from '@app/lib/form'
import { Slots } from '@app/lib/layout'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTrigger } from '@app/lib/ui/alert-dialog'
import { Button } from '@app/lib/ui/button'
import {
	Component,
	EntityAccessor,
	EntityListSubTree,
	EntitySubTree,
	Field,
	HasOne,
	HasRole,
	useCurrentRequest,
	useEntityListSubTree,
	usePersist,
	useProjectUserRoles,
	useRedirect,
} from '@contember/interface'
import { EditIcon } from 'lucide-react'
import React from 'react'
import { Calendar, Event } from '../Calendar'
import { EventCreateForm } from '@app/components/forms/event-create-form'
import { N2nPartyForm } from '@app/components/forms/n2n-party-form'

export const EventsCalendar = Component<{ entities?: string }>(
	() => {
		const triggerPersist = usePersist()
		const roles = useProjectUserRoles()
		const redirect = useRedirect()
		const req = useCurrentRequest()
		const eventList = useEntityListSubTree('events')
		const buddyEvents = Array.from(eventList)
		const partyList = useEntityListSubTree('parties')
		const parties = Array.from(partyList)

		const [selectedEvent, setSelectedEvent] = React.useState<EntityAccessor | null>(null)
		const [selectedParty, setSelectedParty] = React.useState<EntityAccessor | null>(null)
		const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false)
		const [updatePartyDialogOpen, setUpdatePartyDialogOpen] = React.useState(false)
		
		const handleSelectEvent = (event: Event) => {
			let buddyEvent: EntityAccessor | null = null
			if (event.color === '#9b2be6') {
				console.log('party')
				buddyEvent = parties[event.id]
				setSelectedParty(buddyEvent)
				setSelectedEvent(null)
			} else {
				buddyEvent = buddyEvents[event.id]
				setSelectedEvent(buddyEvent)
				setSelectedParty(null)
			}
		}

		const handleUpdateEvent = () => {
			if (!selectedEvent) return
			setUpdateDialogOpen(true)
		}

		const handleUpdateParty = () => {
			if (!selectedParty) return
			setUpdatePartyDialogOpen(true)
		}

		const events: Event[] = buddyEvents.map((buddyEvent, index) => ({
			id: index,
			type: 'buddyEvent',
			title: `${buddyEvent.getField('name').value}`,
			start: new Date(buddyEvent.getField<string>('startDate').value!),
			end: new Date(buddyEvent.getField<string>('endDate').value!),
		}))
		events.push(...parties.map((party, index) => ({
			id: index,
			type: 'party',
			color: '#9b2be6',
			title: `N2N: ${party.getField('name').value}`,
			start: new Date(party.getField<string>('date').value!),
			end: new Date(party.getField<string>('date').value!),
		})))

		console.log(events)


		return (
			<>
                <HasRole role="admin">
                    <Slots.Actions>
                        <div className="flex gap-2 items-center">
                            <Button
                                className="flex gap-2 items-center"
                                variant="secondary"
                                disabled={!selectedParty}
                                onClick={() => handleUpdateParty()}
                            >
                                <EditIcon className="w-4" />
                                Edit party
                            </Button>
                            <Button
                                className="flex gap-2 items-center"
                                variant="secondary"
                                disabled={!selectedEvent}
                                onClick={() => handleUpdateEvent()}
                            >
                                <EditIcon className="w-4" />
                                Edit event
                            </Button>
							<CreateEntityModalButton
                                entityName="N2nParty"
                                buttonLabel="New N2N party"
                                refreshOnPersist
                                createEntityForm={
                                    <>
                                        <N2nPartyForm />
                                    </>
                                }
                                dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
                            />
                            <CreateEntityModalButton
                                entityName="Event"
                                buttonLabel="New event"
                                refreshOnPersist
                                createEntityForm={
                                    <>
                                        <EventCreateForm />
                                    </>
                                }
                                dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
                            />
                        </div>
                    </Slots.Actions>
                </HasRole>
                <HasRole role={roles => roles.has('esnMember') || roles.has('coordinator')}>
                <Slots.Actions>
                        <div className="flex gap-2 items-center">
                            <CreateEntityModalButton
                                entityName="Event"
                                buttonLabel="New event"
                                refreshOnPersist
                                createEntityForm={
                                    <>
                                        <EventCreateForm />
                                    </>
                                }
                                dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
                            />
                        </div>
                    </Slots.Actions>
                </HasRole>

				<div className="flex h-full w-full">
					<Calendar events={events} onSelectEvent={handleSelectEvent} />
				</div>

				<AlertDialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
					<AlertDialogContent className="overflow-y-auto max-h-screen">
						<Binding>
							<EntitySubTree entity={`Event(id = "${selectedEvent?.id}")`} isCreating={false} onPersistSuccess={() => redirect(req)}>
								<EventCreateForm />
								<AlertDialogFooter>
									<AlertDialogCancel>Zrušit</AlertDialogCancel>
									<AlertDialogTrigger>
										<PersistButton />
									</AlertDialogTrigger>
								</AlertDialogFooter>
							</EntitySubTree>
						</Binding>
					</AlertDialogContent>
				</AlertDialog>
				<AlertDialog open={updatePartyDialogOpen} onOpenChange={setUpdatePartyDialogOpen}>
					<AlertDialogContent className="overflow-y-auto max-h-screen">
						<Binding>
							<EntitySubTree entity={`N2nParty(id = "${selectedParty?.id}")`} isCreating={false} onPersistSuccess={() => redirect(req)}>
								<N2nPartyForm />
								<AlertDialogFooter>
									<AlertDialogCancel>Zrušit</AlertDialogCancel>
									<AlertDialogTrigger>
										<PersistButton />
									</AlertDialogTrigger>
								</AlertDialogFooter>
							</EntitySubTree>
						</Binding>
					</AlertDialogContent>
				</AlertDialog>
			</>
		)
	},
	({ entities = 'Event' }) => (
		<>
			<EntityListSubTree entities={entities} alias="events">
                <Field field="name" />
                <Field field="startDate" />
                <Field field="endDate" />
			</EntityListSubTree>
			<EntityListSubTree entities="N2nParty" alias="parties">
                <Field field="name" />
                <Field field="date" />
			</EntityListSubTree>
		</>
	),
)