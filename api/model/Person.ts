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

export class Person {
	createdAt = c.dateTimeColumn().notNull().default('now')
	personId = c.uuidColumn().notNull()
	tenantPerson = c.oneHasOneInverse(TenantPerson, 'person')

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
	country = c.manyHasOne(Country, 'users').setNullOnDelete()
	firstName = c.stringColumn()
	organizedEvents = c.oneHasOneInverse(Event, 'contactPerson')
	czechBuddyPair = c.oneHasOneInverse(BuddyPair, 'czechStudent')
	internationalBuddyPair = c.oneHasOneInverse(BuddyPair, 'internationalStudent')
	applications = c.oneHasMany(ApplicationCz, 'person')
	applicationsFr = c.oneHasOneInverse(ApplicationFr, 'person')
	n2nHours = c.manyHasManyInverse(N2nHour, 'person')
	profilePicture = c.manyHasOne(Image, 'userProfilePicture')

	registrations = c.oneHasMany(EventRegistration, 'person')
}