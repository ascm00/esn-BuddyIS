import { c } from '@contember/schema-definition'
import { esnMemberRole, czechBuddyRole } from './acl'
import { applicationStatus, applicationCzResult, preferredSex } from './enum'
import { User } from './User'
import { Semester } from './Semester'
import { Country } from './Country'


@c.Allow(esnMemberRole, {
	read: true,
	create: true,
	update: true,
	delete: true,
})
@c.Allow(czechBuddyRole, {
	read: true,
	create: true,
	update: true,
})
export class ApplicationCz {
	createdAt = c.dateTimeColumn().notNull().default('now')
	points = c.intColumn()
	user = c.manyHasOne(User, 'applications').setNullOnDelete()
	semester = c.manyHasOne(Semester, 'applications').setNullOnDelete()
	motivation = c.stringColumn()
	status = c.enumColumn(applicationStatus)
	result = c.enumColumn(applicationCzResult)
	preferredCountry = c.manyHasOne(Country, 'preferredApplicationsCz').setNullOnDelete()
	rBuddy = c.intColumn()
	rParty = c.intColumn()
	rTravel = c.intColumn()
	rSport = c.intColumn()
	preferredSex = c.enumColumn(preferredSex)
}
