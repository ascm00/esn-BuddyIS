import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, coordinatorRole, czechBuddyRole, ozsRole } from './acl'
import { ApplicationFr } from './ApplicationFr'


@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
	create: true,
	update: true,
})

@c.Allow([internationalStudentRole, czechBuddyRole, ozsRole], {
	read: true,
})
export class Sport {
	createdAt = c.dateTimeColumn().notNull().default('now')
	name = c.stringColumn().notNull()
	applicationsFr = c.manyHasMany(ApplicationFr, 'sport')
}
