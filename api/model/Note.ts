import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, ozsRole, coordinatorRole, czechBuddyRole } from './acl'
import { BuddyPair } from './BuddyPair'
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
export class Note {
	createdAt = c.dateTimeColumn().notNull().default('now')
	buddyPair = c.manyHasOne(BuddyPair, 'notes').cascadeOnDelete()
	content = c.stringColumn().notNull()
    author = c.manyHasOne(Person, 'notes')
}