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
	status = c.oneHasOneInverse(ApplicationCzStatus, 'applicationCz')
	result = c.enumColumn(applicationCzResult)
	preferredCountry = c.manyHasOne(Country, 'preferredApplicationsCz').setNullOnDelete()
	preferredLanguages = c.manyHasMany(Language, 'applicationsCz')
	preferredSex = c.enumColumn(preferredSex)
	read = c.boolColumn().default(false)
	notPair = c.boolColumn().default(false)
}

@c.Allow(esnMemberRole, {
	read: true,
})
@c.Allow(coordinatorRole, {
	read: true,
})
@c.Allow(czechBuddyRole, {
	when: {applicationCz: {person: {personId: czechBuddyId}}},
	read: true,
})
@c.Allow(ozsRole, {read: true})
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

@c.Allow(esnMemberRole, {
	read: true,
})
@c.Allow(coordinatorRole, {
	read: true,
})
@c.Allow(czechBuddyRole, {
	when: {applicationCz: {person: {personId: czechBuddyId}}},
	read: true,
})
@c.Allow(ozsRole, {read: true})
@c.View(`
	SELECT
		gen_random_uuid() AS id,
		ac.id as application_cz_id,
		CASE 
			WHEN hba.number IS NULL OR hba.number < ac.how_many_buddies THEN 'toBePaired'
			WHEN hba.number >= ac.how_many_buddies THEN 'paired'
		END AS status
	FROM
		application_cz AS ac
	LEFT JOIN
		how_many_buddies_assigned AS hba ON hba.application_cz_id = ac.id
`)
export class ApplicationCzStatus {
	applicationCz = c.oneHasOne(ApplicationCz, 'status')
	status = c.enumColumn(applicationStatus).default('toBePaired')
}
