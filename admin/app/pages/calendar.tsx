import { EventsCalendar } from '@app/lib/atoms/Calendar/EventCalendar'
import { Binding } from '@app/lib/binding'
import { Slots } from '@app/lib/layout'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<EventsCalendar />
					<Slots.Title>Events calendar</Slots.Title>
				</div>
			</Binding>
		</>
	)
}