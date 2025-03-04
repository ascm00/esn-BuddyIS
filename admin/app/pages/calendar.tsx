import { EventsCalendar } from '@app/lib/atoms/Calendar/EventCalendar'
import { Binding } from '@app/lib/binding'
import { Slots } from '@app/lib/layout'
import { useIsMobile } from '@app/lib/utils/use-mobile'

export default () => {
	const isMobile = useIsMobile()
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<EventsCalendar />
					{!isMobile && <Slots.Title>Calendar 📅</Slots.Title>}
				</div>
			</Binding>
		</>
	)
}