import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, czechBuddyRole, coordinatorRole } from './acl'
import { BuddyPair } from './BuddyPair'


@c.Allow(internationalStudentRole, {
	read: true,
	update: true,
})
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
@c.Allow(coordinatorRole, {
	read: true,
	update: true,
})
export class BuddyTask {
	createdAt = c.dateTimeColumn().notNull().default('now')
	description = c.stringColumn().notNull()
	buddyPair = c.manyHasOne(BuddyPair, 'tasks').cascadeOnDelete()
	done = c.boolColumn().notNull().default(false)
	confirmed = c.boolColumn().default(false)
}
