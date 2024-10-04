import { c } from '@contember/schema-definition'
import { TenantPerson } from './TenantPerson'
import { Image } from './Image'
import { N2nHour } from './N2nHour'
import { ApplicationFr } from './ApplicationFr'
import { ApplicationCz } from './ApplicationCz'
import { BuddyPair } from './BuddyPair'
import { Event } from './Event'
import { Country } from './Country'
import { Faculty } from './Faculty'
import { University } from './University'
import { EventRegistration } from './EventRegistration'
import { StudyProgram } from './StudyProgram'
import { sex } from './enum'
import { Note } from './Note'
import { Language } from './Language'
import { coordinatorRole, czechBuddyId, czechBuddyRole, esnMemberRole, internationalStudentId, internationalStudentRole, ozsRole } from './acl'

@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
	create: true,
	update: true,
	delete: true,
})
@c.Allow([internationalStudentRole], {
	when: {personId: internationalStudentId},
	read: true,
	update: true,
})
@c.Allow([czechBuddyRole], {
	when: {personId: czechBuddyId},
	read: true,
	update: true,
})
@c.Allow(ozsRole, {read: true,})
export class Person {
	createdAt = c.dateTimeColumn().notNull().default('now')
	personId = c.uuidColumn().notNull()
	tenantPerson = c.oneHasOneInverse(TenantPerson, 'person')
	gender = c.enumColumn(sex)
	registrationDate = c.dateTimeColumn()
	lastLoginDate = c.dateTimeColumn()
	phoneNumber = c.stringColumn()
	university = c.manyHasOne(University, 'users').setNullOnDelete()
	emailForInfo = c.stringColumn()
	esnCardId = c.stringColumn()
	surname = c.stringColumn()
	xname = c.stringColumn()
	active = c.boolColumn()
	faculty = c.manyHasOne(Faculty, 'users').setNullOnDelete()
	studyProgram = c.manyHasOne(StudyProgram, 'users').setNullOnDelete()
	countryOfUniversity = c.manyHasOne(Country, 'users').setNullOnDelete()
	firstName = c.stringColumn()
	organizedEvents = c.oneHasOneInverse(Event, 'contactPerson')
	czechBuddyPair = c.oneHasMany(BuddyPair, 'czechStudent')
	internationalBuddyPair = c.oneHasOneInverse(BuddyPair, 'internationalStudent')
	applications = c.oneHasMany(ApplicationCz, 'person')
	applicationsFr = c.oneHasOneInverse(ApplicationFr, 'person')
	n2nHours = c.manyHasManyInverse(N2nHour, 'person')
	profilePicture = c.manyHasOne(Image, 'userProfilePicture')
	coordinatingBuddyPairs = c.oneHasMany(BuddyPair, 'coordinator')

	registrations = c.oneHasMany(EventRegistration, 'person')
	notes = c.oneHasMany(Note, 'author')
	languages = c.manyHasMany(Language, 'person')
}