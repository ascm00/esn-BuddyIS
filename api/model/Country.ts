import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, ozsRole, czechBuddyRole, coordinatorRole } from './acl'
import { University } from './University'
import { ApplicationCz } from './ApplicationCz'
import { Person } from './Person'


@c.Allow([internationalStudentRole, czechBuddyRole], {
	read: true,
	create: true,
})
@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
	create: true,
	update: true,
	delete: true,
})
@c.Allow(ozsRole, {
	read: true,
})
export class Country {
	createdAt = c.dateTimeColumn().notNull().default('now')
	users = c.oneHasMany(Person, 'countryOfUniversity')
	universities = c.oneHasMany(University, 'country')
	name = c.stringColumn().notNull()
	preferredApplicationsCz = c.oneHasMany(ApplicationCz, 'preferredCountry')
}
