import { c } from '@contember/schema-definition'
import { ApplicationFr } from './ApplicationFr'
import { coordinatorRole, czechBuddyRole, esnMemberRole, internationalStudentRole } from './acl'

@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
	create: true,
	update: true,
})

@c.Allow([internationalStudentRole, czechBuddyRole], {
	read: true,
})
export class Limitations {
	createdAt = c.dateTimeColumn().notNull().default('now')
	applicationFr = c.oneHasOneInverse(ApplicationFr, 'limitations')
}
