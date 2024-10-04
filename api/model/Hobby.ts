import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, ozsRole, coordinatorRole, czechBuddyRole } from './acl'
import { ApplicationFr } from './ApplicationFr'


@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
	create: true,
	update: true,
	delete: true,
})

@c.Allow([internationalStudentRole, czechBuddyRole, ozsRole], {
	read: true,
})
export class Hobby {
	createdAt = c.dateTimeColumn().notNull().default('now')
	applicationsFr = c.manyHasManyInverse(ApplicationFr, 'hobbies')
	name = c.stringColumn().notNull()
}
