import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, ozsRole, coordinatorRole, czechBuddyRole } from './acl'
import { Country } from './Country'
import { Person } from './Person'


@c.Allow([internationalStudentRole], {
	read: true,
	create: true,
})
@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
	create: true,
	update: true,
})
@c.Allow([ozsRole, czechBuddyRole], {
	read: true,
})
export class University {
	createdAt = c.dateTimeColumn().notNull().default('now')
	users = c.oneHasMany(Person, 'university')
	name = c.stringColumn().notNull()
	country = c.manyHasOne(Country, 'universities').setNullOnDelete()
}
