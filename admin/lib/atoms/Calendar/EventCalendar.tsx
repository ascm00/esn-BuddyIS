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

export const EventsCalendar = Component<{ entities?: string }>(
	() => {
		const triggerPersist = usePersist()
		const roles = useProjectUserRoles()
		const redirect = useRedirect()
		const req = useCurrentRequest()
		const eventList = useEntityListSubTree('events')
		const buddyEvents = Array.from(eventList)

		const [selectedEvent, setSelectedEvent] = React.useState<EntityAccessor | null>(null)
		const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false)

		const handleSelectEvent = (event: Event) => {
			const buddyEvent = buddyEvents[event.id]
			setSelectedEvent(buddyEvent)
		}

		const handleSelectedReservationUpdate = () => {
			if (!selectedEvent) return
			setUpdateDialogOpen(true)
		}

		const events: Event[] = buddyEvents.map((buddyEvent, index) => ({
			id: index,
			title: `${buddyEvent.getField('name').value}`,
			start: new Date(buddyEvent.getField<string>('startDate').value!),
			end: new Date(buddyEvent.getField<string>('endDate').value!),
		}))

		return (
			<>
                <HasRole role="admin">
                    <Slots.Actions>
                        <div className="flex gap-2 items-center">
                            <Button
                                className="flex gap-2 items-center"
                                variant="secondary"
                                disabled={!selectedEvent}
                                onClick={() => handleSelectedReservationUpdate()}
                            >
                                <EditIcon className="w-4" />
                                Edit event
                            </Button>
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
                <HasRole role="esnMember">
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
			</>
		)
	},
	({ entities = 'Event' }) => (
		<>
			<EntityListSubTree entities={entities} alias="events">
                <Field field="name" />
                <Field field="startDate" />
                <Field field="endDate" />
				{/* <HasOne field="client">
					<Field field="name" />
				</HasOne>
				<HasOne field="program">
					<Field field="name" />
				</HasOne>
				<Field field="startTime" />
				<Field field="endTime" /> */}
			</EntityListSubTree>
		</>
	),
)