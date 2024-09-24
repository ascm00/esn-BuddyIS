import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, coordinatorRole } from './acl'
import { applicationFrStatus, rating, preferredSex } from './enum'
import { Semester } from './Semester'
import { Language } from './Language'
import { Hobby } from './Hobby'
import { Sport } from './Sport'
import { Limitations } from './Limitations'
import { Person } from './Person'


@c.Allow(internationalStudentRole, {
	read: ['createdAt', 'semester', 'status', 'hobbies', 'rating', 'rBuddy', 'rParty', 'rTravel', 'rSport', 'preferredBuddySex', 'emailForInformation', 'sport'],
	create: ['createdAt', 'semester', 'status', 'hobbies', 'rating', 'rBuddy', 'rParty', 'rTravel', 'rSport', 'preferredBuddySex', 'emailForInformation', 'sport'],
	update: ['createdAt', 'semester', 'status', 'hobbies', 'rating', 'rBuddy', 'rParty', 'rTravel', 'rSport', 'preferredBuddySex', 'emailForInformation', 'sport'],
	delete: true,
})
@c.Allow(esnMemberRole, {
	read: ['createdAt', 'semester', 'status', 'hobbies', 'rating', 'rBuddy', 'rParty', 'rTravel', 'rSport', 'preferredBuddySex', 'emailForInformation', 'sport'],
	create: ['createdAt', 'semester', 'status', 'hobbies', 'rating', 'rBuddy', 'rParty', 'rTravel', 'rSport', 'preferredBuddySex', 'emailForInformation', 'sport'],
	update: ['createdAt', 'semester', 'status', 'hobbies', 'rating', 'rBuddy', 'rParty', 'rTravel', 'rSport', 'preferredBuddySex', 'emailForInformation', 'sport'],
	delete: true,
})
@c.Allow(coordinatorRole, {
	read: ['createdAt', 'semester', 'status', 'hobbies', 'rating', 'rBuddy', 'rParty', 'rTravel', 'rSport', 'preferredBuddySex', 'emailForInformation', 'sport'],
	create: ['createdAt', 'semester', 'status', 'hobbies', 'rating', 'rBuddy', 'rParty', 'rTravel', 'rSport', 'preferredBuddySex', 'emailForInformation', 'sport'],
	update: ['createdAt', 'semester', 'status', 'hobbies', 'rating', 'rBuddy', 'rParty', 'rTravel', 'rSport', 'preferredBuddySex', 'emailForInformation', 'sport'],
})
export class ApplicationFr {
	createdAt = c.dateTimeColumn().notNull().default('now')
	semester = c.manyHasOne(Semester, 'applicationsFr').setNullOnDelete()
	person = c.oneHasOne(Person, 'applicationsFr')
	status = c.enumColumn(applicationFrStatus)
	hobbies = c.manyHasMany(Hobby, 'applicationsFr')
	rating = c.enumColumn(rating)
	rBuddy = c.intColumn()
	rParty = c.intColumn()
	rTravel = c.intColumn()
	rSport = c.intColumn()
	preferredBuddySex = c.enumColumn(preferredSex)
	emailForInformation = c.stringColumn()
	sport = c.manyHasManyInverse(Sport, 'applicationsFr')
	limitations = c.oneHasOne(Limitations, 'applicationFr').cascadeOnDelete()
}
