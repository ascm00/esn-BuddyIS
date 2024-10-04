import { c } from '@contember/schema-definition'
import { N2nParty } from './N2nParty'
import { coordinatorRole, czechBuddyRole, esnMemberRole, internationalStudentRole, ozsRole } from './acl'

@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
	create: true,
	update: true,
	delete: true,
})

@c.Allow([internationalStudentRole, czechBuddyRole, ozsRole], {
	read: true,
})
export class Club {
	createdAt = c.dateTimeColumn().notNull().default('now')
	parties = c.oneHasMany(N2nParty, 'club')
	name = c.stringColumn().notNull()
}
