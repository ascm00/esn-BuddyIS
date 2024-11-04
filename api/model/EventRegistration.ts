import { c } from '@contember/schema-definition'
import { Event } from './Event'
import { Allergy } from './Allergy'
import { DietaryRestrictions } from './DietaryRestrictions'
import { Person } from './Person'
import { coordinatorRole, czechBuddyId, czechBuddyRole, esnMemberRole, internationalStudentId, internationalStudentRole } from './acl'
import { payment } from './enum'

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
@c.Allow(internationalStudentRole, {
	when: {person: {personId: internationalStudentId}},
	read: true,
	create: true,
	update: true,
})
@c.Allow(czechBuddyRole, {
	when: {person: {personId: czechBuddyId}},
	read: true,
	create: true,
	update: true,
})
export class EventRegistration {
	createdAt = c.dateTimeColumn().notNull().default('now')
    payment = c.enumColumn(payment).default('pending')
	paymentId = c.stringColumn().unique()
    note = c.stringColumn()
    event = c.manyHasOne(Event, 'registrations')
    isWaitingList = c.boolColumn().default(false)
	personWhoMadeRegistration = c.manyHasOne(Person, 'registrationMadeByPerson')
    person = c.manyHasOne(Person, 'registrations')
    allergies = c.manyHasMany(Allergy, 'registrations')
    dietaryRestrictions = c.manyHasMany(DietaryRestrictions, 'registrations')
}