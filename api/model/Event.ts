import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, ozsRole, czechBuddyRole, coordinatorRole } from './acl'
import { eventStatus } from './enum'
import { Section } from './Section'
import { Semester } from './Semester'
import { Image } from './Image'
import { Person } from './Person'
import { Content } from './Content'
import { EventRegistration } from './EventRegistration'


@c.Allow([internationalStudentRole, ozsRole, czechBuddyRole], {
	read: true,
})
@c.Allow(esnMemberRole, {
	read: true,
	create: true,
	update: true ,
	delete: true,
})
@c.Allow(coordinatorRole, {
	read: true,
	create: true,
	update: true ,
	delete: true,
})
export class Event {
	createdAt = c.dateTimeColumn().notNull().default('now')
	name = c.stringColumn().notNull()
	description = c.stringColumn()
	startDate = c.dateTimeColumn().notNull()
	endDate = c.dateTimeColumn().notNull()
	refundPolicy = c.stringColumn()
	mandatoryESNcard = c.boolColumn()
	dietaryRestrictions = c.boolColumn()
	allergies = c.boolColumn()
	capacity = c.intColumn()
	fee = c.doubleColumn()
	registrations = c.oneHasMany(EventRegistration, 'event')
	registeredCount = c.intColumn().default(0)
	
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
