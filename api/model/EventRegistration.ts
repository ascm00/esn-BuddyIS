import { c } from '@contember/schema-definition'
import { Event } from './Event'
import { Allergy } from './Allergy'
import { DietaryRestrictions } from './DietaryRestrictions'
import { Person } from './Person'
import { coordinatorRole, czechBuddyId, czechBuddyRole, esnMemberRole, internationalStudentId, internationalStudentRole, paymentGateRole } from './acl'
import { payment } from './enum'

@c.Allow(esnMemberRole, {
	read: true,
	create: true,
	update: true ,
	delete: true,
})
@c.Allow(paymentGateRole, {
	read: true,
	update: true,
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
    event = c.manyHasOne(Event, 'registrations').cascadeOnDelete()
    isWaitingList = c.boolColumn().default(false)
	personWhoMadeRegistration = c.manyHasOne(Person, 'registrationMadeByPerson')
	deletedByPerson = c.manyHasOne(Person, 'deleteMadeByPerson')
	accepted = c.boolColumn().default(true) // when user pays or joins waiting list - eventRegistration is accepted
    person = c.manyHasOne(Person, 'registrations')
    allergies = c.manyHasMany(Allergy, 'registrations')
    dietaryRestrictions = c.manyHasMany(DietaryRestrictions, 'registrations')
}