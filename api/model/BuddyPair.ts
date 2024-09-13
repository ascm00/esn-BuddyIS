import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, coordinatorRole } from './acl'
import { BuddyTask } from './BuddyTask'
import { Person } from './Person'


@c.Allow(internationalStudentRole, {
	read: true,
})
@c.Allow(esnMemberRole, {
	read: true,
	create: true,
	update: true,
	delete: true,
})
@c.Allow(coordinatorRole, {
	read: true,
})
export class BuddyPair {
	createdAt = c.dateTimeColumn().notNull().default('now')
	czechStudent = c.oneHasOne(Person, 'czechBuddyPair').setNullOnDelete()
	internationalStudent = c.oneHasOne(Person, 'internationalBuddyPair').setNullOnDelete()
	note = c.stringColumn()
	tasks = c.oneHasMany(BuddyTask, 'buddyPair')
}
