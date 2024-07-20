import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, czechStudentRole } from './acl'
import { Person } from './Person'
import { University } from './University'
import { Faculty } from './Faculty'
import { Country } from './Country'
import { Event } from './Event'
import { BuddyPair } from './BuddyPair'
import { ApplicationCz } from './ApplicationCz'
import { ApplicationFr } from './ApplicationFr'
import { N2nHour } from './N2nHour'
import { Image } from './Image'

@c.Allow(internationalStudentRole, {
	read: ['createdAt', 'registrationDate', 'lastLoginDate', 'phoneNumber', 'target', 'university', 'esnCardId', 'surname', 'xname', 'active', 'faculty', 'country', 'firstName', 'participatedEvents', 'organizedEvents', 'czechBuddyPair', 'internationalBuddyPair', 'applications', 'applicationsFr', 'n2nHours'],
	create: ['createdAt', 'registrationDate', 'lastLoginDate', 'phoneNumber', 'target', 'university', 'esnCardId', 'surname', 'xname', 'active', 'faculty', 'country', 'firstName', 'participatedEvents', 'organizedEvents', 'czechBuddyPair', 'internationalBuddyPair', 'applications', 'applicationsFr', 'n2nHours'],
	update: ['createdAt', 'registrationDate', 'lastLoginDate', 'phoneNumber', 'target', 'university', 'esnCardId', 'surname', 'xname', 'active', 'faculty', 'country', 'firstName', 'participatedEvents', 'organizedEvents', 'czechBuddyPair', 'internationalBuddyPair', 'applications', 'applicationsFr', 'n2nHours'],
})
@c.Allow(esnMemberRole, {
	read: ['createdAt', 'registrationDate', 'lastLoginDate', 'phoneNumber', 'target', 'university', 'esnCardId', 'surname', 'xname', 'active', 'faculty', 'country', 'firstName', 'participatedEvents', 'organizedEvents', 'czechBuddyPair', 'internationalBuddyPair', 'applications', 'applicationsFr', 'n2nHours'],
	create: ['createdAt', 'registrationDate', 'lastLoginDate', 'phoneNumber', 'target', 'university', 'esnCardId', 'surname', 'xname', 'active', 'faculty', 'country', 'firstName', 'participatedEvents', 'organizedEvents', 'czechBuddyPair', 'internationalBuddyPair', 'applications', 'applicationsFr', 'n2nHours'],
	update: ['createdAt', 'registrationDate', 'lastLoginDate', 'phoneNumber', 'target', 'university', 'esnCardId', 'surname', 'xname', 'active', 'faculty', 'country', 'firstName', 'participatedEvents', 'organizedEvents', 'czechBuddyPair', 'internationalBuddyPair', 'applications', 'applicationsFr', 'n2nHours'],
	delete: true,
})
@c.Allow(czechStudentRole, {
	read: ['createdAt', 'registrationDate', 'lastLoginDate', 'phoneNumber', 'target', 'university', 'esnCardId', 'surname', 'xname', 'active', 'faculty', 'country', 'firstName', 'participatedEvents', 'organizedEvents', 'czechBuddyPair', 'internationalBuddyPair', 'applications', 'applicationsFr', 'n2nHours'],
	create: ['createdAt', 'registrationDate', 'lastLoginDate', 'phoneNumber', 'target', 'university', 'esnCardId', 'surname', 'xname', 'active', 'faculty', 'country', 'firstName', 'participatedEvents', 'organizedEvents', 'czechBuddyPair', 'internationalBuddyPair', 'applications', 'applicationsFr', 'n2nHours'],
	update: ['createdAt', 'registrationDate', 'lastLoginDate', 'phoneNumber', 'target', 'university', 'esnCardId', 'surname', 'xname', 'active', 'faculty', 'country', 'firstName', 'participatedEvents', 'organizedEvents', 'czechBuddyPair', 'internationalBuddyPair', 'applications', 'applicationsFr', 'n2nHours'],
})
export class User {
	createdAt = c.dateTimeColumn().notNull().default('now')
	registrationDate = c.dateTimeColumn().notNull()
	lastLoginDate = c.dateTimeColumn()
	phoneNumber = c.stringColumn()
	target = c.oneHasOne(Person, 'userUndefined')
	university = c.manyHasOne(University, 'users').setNullOnDelete()
	esnCardId = c.stringColumn()
	surname = c.stringColumn().notNull()
	xname = c.stringColumn()
	active = c.boolColumn()
	faculty = c.manyHasOne(Faculty, 'users').setNullOnDelete()
	country = c.manyHasOne(Country, 'users').setNullOnDelete()
	firstName = c.stringColumn().notNull()
	participatedEvents = c.manyHasManyInverse(Event, 'participants')
	organizedEvents = c.oneHasOneInverse(Event, 'contactPerson')
	czechBuddyPair = c.oneHasOneInverse(BuddyPair, 'czechStudent')
	internationalBuddyPair = c.oneHasOneInverse(BuddyPair, 'internationalStudent')
	applications = c.oneHasMany(ApplicationCz, 'user')
	applicationsFr = c.oneHasOneInverse(ApplicationFr, 'user')
	n2nHours = c.manyHasManyInverse(N2nHour, 'user')
	profilePicture = c.manyHasOne(Image, 'userProfilePicture')
}
