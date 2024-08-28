import { c } from '@contember/schema-definition'
import { Event } from './Event'
import { Allergy } from './Allergy'
import { DietaryRestrictions } from './DietaryRestrictions'
import { Person } from './Person'

export class EventRegistration {
	createdAt = c.dateTimeColumn().notNull().default('now')
    paid = c.boolColumn()
    note = c.stringColumn()
    event = c.manyHasOne(Event, 'registrations')
    isWaitingList = c.boolColumn().default(false)
    
    person = c.manyHasOne(Person, 'registrations')
    allergies = c.manyHasMany(Allergy, 'registrations')
    dietaryRestrictions = c.manyHasMany(DietaryRestrictions, 'registrations')
}