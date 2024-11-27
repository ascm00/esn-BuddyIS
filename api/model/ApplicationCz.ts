import { c } from '@contember/schema-definition'
import { esnMemberRole, czechBuddyRole, coordinatorRole, czechBuddyId, ozsRole } from './acl'
import { applicationStatus, applicationCzResult, preferredSex } from './enum'
import { Semester } from './Semester'
import { Country } from './Country'
import { Person } from './Person'
import { Language } from './Language'
import { oneHasOne } from '@contember/schema-definition/dist/src/model/definition'


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
@c.Allow(czechBuddyRole, {
	when: {person: {personId: czechBuddyId}},
	read: true,
	create: true,
	update: true,
	delete: true,
})
@c.Allow(ozsRole, {read: true})
export class ApplicationCz {
	createdAt = c.dateTimeColumn().notNull().default('now')
	points = c.intColumn()
	person = c.manyHasOne(Person, 'applications').setNullOnDelete()
	semester = c.manyHasOne(Semester, 'applications').setNullOnDelete()
	motivation = c.stringColumn()
	howManyBuddies = c.intColumn()
	howManyBuddiesAssigned = c.oneHasOneInverse(howManyBuddiesAssigned, 'applicationCz')
	status = c.enumColumn(applicationStatus).default('toBePaired')
	result = c.enumColumn(applicationCzResult)
	preferredCountry = c.manyHasOne(Country, 'preferredApplicationsCz').setNullOnDelete()
	preferredLanguages = c.manyHasMany(Language, 'applicationsCz')
	preferredSex = c.enumColumn(preferredSex)
}

@c.View(`
	SELECT
		gen_random_uuid() AS id,
		ac.id as application_cz_id,
		COUNT(bp.id) AS number
	FROM
		application_cz AS ac
	JOIN
		buddy_pair AS bp ON bp.czech_student_id = ac.person_id
	WHERE
		ac.semester_id = bp.semester_id
	GROUP BY
		ac.id
`)
export class howManyBuddiesAssigned {
	applicationCz = c.oneHasOne(ApplicationCz, 'howManyBuddiesAssigned')
	number = c.intColumn()
}
