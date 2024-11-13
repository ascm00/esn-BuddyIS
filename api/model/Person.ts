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
})
@c.Allow([internationalStudentRole, czechBuddyRole], {
	read: true,
})
@c.Allow([internationalStudentRole], {
	when: {personId: internationalStudentId},
	update: true,
})
@c.Allow([czechBuddyRole], {
	when: {personId: czechBuddyId},
	update: true,
})
@c.Allow(ozsRole, {read: true,})

export class Person {
	createdAt = c.dateTimeColumn().notNull().default('now')
	personId = c.uuidColumn().notNull()
	birthdate = c.dateColumn()
	tenantPerson = c.oneHasOneInverse(TenantPerson, 'person')
	gender = c.enumColumn(sex)
	registrationDate = c.dateTimeColumn()
	lastLoginDate = c.dateTimeColumn()
	phoneNumber = c.stringColumn()
	university = c.manyHasOne(University, 'users').setNullOnDelete()
	emailForInfo = c.stringColumn()
	esnCardId = c.stringColumn()
	surname = c.stringColumn()
	inSISusername = c.stringColumn()
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
	registrationMadeByPerson = c.oneHasMany(EventRegistration, 'personWhoMadeRegistration')

	registrations = c.oneHasMany(EventRegistration, 'person')
	notes = c.oneHasMany(Note, 'author')
	languages = c.manyHasMany(Language, 'person')
	
	ageView = c.oneHasOneInverse(PersonAgeView, 'person')
}

@c.Allow([internationalStudentRole, czechBuddyRole, ozsRole, coordinatorRole, esnMemberRole], {
	read: true,
})
@c.View(`
	SELECT
		gen_random_uuid() AS id,
		p.id AS person_id,
		EXTRACT(YEAR FROM AGE(NOW(), p.birthdate)) AS age
	FROM
		person AS p
`, { dependencies: () => [Person], },)
export class PersonAgeView {
	age = c.intColumn()
	person = c.oneHasOne(Person, 'ageView')
}