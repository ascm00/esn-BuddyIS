import { Component } from '@contember/interface'
import React from 'react'
import { Calendar as BigCalendar, Views, luxonLocalizer } from 'react-big-calendar'
import './styles/react-big-calendar.css'
import { DateTime, Settings } from 'luxon'

Settings.defaultLocale = 'en'
const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 })
const lang = {
	cs: {
		week: 'Week',
		work_week: 'Work week',
		day: 'Day',
		month: 'Month',
		previous: 'Previous',
		next: 'Next',
		today: 'Today',
		agenda: 'Agenda',
		date: 'Date',
		time: 'Time',
		event: 'Event',

		showMore: (total: number) => `+${total} další`,
	},
}

const ColoredDateCellWrapper = ({ children }: { children: React.ReactNode }) =>
	React.cloneElement(React.Children.only(children) as React.ReactElement<any>, {
		style: {},
	})

export type Event = {
	id: number
	title: string
	start: Date
	end: Date
}

type CalendarProps = {
	events: Event[]
	onSelectEvent: (event: Event) => void
}

export const Calendar = Component<CalendarProps>(
	({ events, onSelectEvent }) => {
		const { components, defaultDate, views } = React.useMemo(
			() => ({
				components: {
					timeSlotWrapper: ColoredDateCellWrapper as React.ComponentType<Record<never, never>>,
				},
				defaultDate: new Date(),
				views: Object.keys(Views).map(k => Views[k as keyof typeof Views]),
			}),
			[],
		)

		return (
			<div className="flex flex-col min-h-[600px] w-full">
				<BigCalendar
					components={components}
					defaultDate={defaultDate}
					events={events}
					culture="en"
					localizer={localizer}
					messages={lang.cs}
					onSelectEvent={onSelectEvent}
					step={60}
					views={views}
				/>
			</div>
		)
	},
	() => <></>,
)