import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, coordinatorRole, internationalStudentId } from './acl'
import { applicationFrStatus, rating, preferredSex, applicationStatus } from './enum'
import { Semester } from './Semester'
import { Language } from './Language'
import { Hobby } from './Hobby'
import { Sport } from './Sport'
import { Limitations } from './Limitations'
import { Person } from './Person'


@c.Allow(esnMemberRole, {
	read: true,
	create: true,
	update: true,
	delete: true,
})
@c.Allow(coordinatorRole, {
	read: true,
	create: true,
	update: true,
	delete: true,
})
@c.Allow(internationalStudentRole, {
	when: {person: {personId: internationalStudentId}},
	read: true,
	create: true,
	update: true,
})
export class ApplicationFr {
	createdAt = c.dateTimeColumn().notNull().default('now')
	semester = c.manyHasOne(Semester, 'applicationsFr').setNullOnDelete()
	person = c.oneHasOne(Person, 'applicationsFr')
	status = c.enumColumn(applicationStatus).default('toBePaired')
	hobbies = c.manyHasMany(Hobby, 'applicationsFr')
	rating = c.enumColumn(rating)
	preferredBuddySex = c.enumColumn(preferredSex)
	emailForInformation = c.stringColumn()
	sport = c.manyHasManyInverse(Sport, 'applicationsFr')
	limitations = c.oneHasOne(Limitations, 'applicationFr').cascadeOnDelete()
}
