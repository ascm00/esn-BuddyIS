import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, publicRole, czechBuddyRole } from './acl'
import { eventStatus } from './enum'
import { Section } from './Section'
import { Semester } from './Semester'
import { Image } from './Image'
import { Person } from './Person'


@c.Allow(internationalStudentRole, {
	read: ['createdAt', 'name', 'description', 'startDate', 'endDate', 'capacity', 'fee', 'participants', 'place', 'whatToBring', 'whatsappLink', 'registrationStartDate', 'registrationEndDate', 'waitingList', 'section', 'meetingPoint', 'status', 'contactPerson', 'semester', 'private'],
})
@c.Allow(esnMemberRole, {
	read: ['createdAt', 'name', 'description', 'startDate', 'endDate', 'capacity', 'fee', 'participants', 'place', 'whatToBring', 'whatsappLink', 'registrationStartDate', 'registrationEndDate', 'waitingList', 'section', 'meetingPoint', 'status', 'contactPerson', 'semester', 'private'],
	create: ['createdAt', 'name', 'description', 'startDate', 'endDate', 'capacity', 'fee', 'participants', 'place', 'whatToBring', 'whatsappLink', 'registrationStartDate', 'registrationEndDate', 'waitingList', 'section', 'meetingPoint', 'status', 'contactPerson', 'semester', 'private'],
	update: ['createdAt', 'name', 'description', 'startDate', 'endDate', 'capacity', 'fee', 'participants', 'place', 'whatToBring', 'whatsappLink', 'registrationStartDate', 'registrationEndDate', 'waitingList', 'section', 'meetingPoint', 'status', 'contactPerson', 'semester', 'private'],
	delete: true,
})
@c.Allow(publicRole, {
	read: ['createdAt', 'name', 'description', 'startDate', 'endDate', 'capacity', 'fee', 'participants', 'place', 'whatToBring', 'whatsappLink', 'registrationStartDate', 'registrationEndDate', 'waitingList', 'section', 'meetingPoint', 'status', 'contactPerson', 'semester', 'private'],
})
@c.Allow(czechBuddyRole, {
	read: ['createdAt', 'name', 'description', 'startDate', 'endDate', 'capacity', 'fee', 'participants', 'place', 'whatToBring', 'whatsappLink', 'registrationStartDate', 'registrationEndDate', 'waitingList', 'section', 'meetingPoint', 'status', 'contactPerson', 'semester', 'private'],
})
export class Event {
	createdAt = c.dateTimeColumn().notNull().default('now')
	name = c.stringColumn().notNull()
	description = c.stringColumn()
	startDate = c.dateTimeColumn().notNull()
	endDate = c.dateTimeColumn().notNull()
	capacity = c.intColumn()
	fee = c.doubleColumn()
	participants = c.manyHasMany(Person, 'participatedEvents')
	place = c.stringColumn()
	whatToBring = c.stringColumn()
	whatsappLink = c.stringColumn()
	registrationStartDate = c.dateTimeColumn()
	registrationEndDate = c.dateTimeColumn()
	waitingList = c.intColumn()
	section = c.manyHasOne(Section, 'events').setNullOnDelete()
	meetingPoint = c.stringColumn()
	status = c.enumColumn(eventStatus)
	contactPerson = c.oneHasOne(Person, 'organizedEvents')
	semester = c.manyHasOne(Semester, 'events').setNullOnDelete()
	private = c.boolColumn()
	allowRegistrationWithoutPayment = c.boolColumn()
	picture = c.manyHasOne(Image, 'eventPicture')
}
