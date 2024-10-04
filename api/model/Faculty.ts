import { c } from '@contember/schema-definition'
import { coordinatorRole, czechBuddyRole, esnMemberRole, internationalStudentRole } from './acl'
import { Person } from './Person'


@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
	create: true,
	update: true,
	delete: true,
})

@c.Allow([internationalStudentRole, czechBuddyRole], {
	read: true,
})
export class Faculty {
	createdAt = c.dateTimeColumn().notNull().default('now')
	users = c.oneHasMany(Person, 'faculty')
	name = c.stringColumn().notNull()
}
