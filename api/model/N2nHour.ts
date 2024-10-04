import { c } from '@contember/schema-definition'
import { N2nParty } from './N2nParty'
import { Person } from './Person'
import { coordinatorRole, czechBuddyRole, esnMemberRole, internationalStudentRole } from './acl'

@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
	create: true,
	update: true,
	delete: true,
})

@c.Allow([internationalStudentRole, czechBuddyRole], {
	read: true,
})
export class N2nHour {
	createdAt = c.dateTimeColumn().notNull().default('now')
	from = c.dateTimeColumn().notNull()
	to = c.dateTimeColumn().notNull()
	party = c.manyHasOne(N2nParty, 'hours').cascadeOnDelete()
	person = c.manyHasMany(Person, 'n2nHours')
}
