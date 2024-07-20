import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, czechStudentRole } from './acl'
import { User } from './User'
import { BuddyTask } from './BuddyTask'


@c.Allow(internationalStudentRole, {
	read: true,
})
@c.Allow(esnMemberRole, {
	read: true,
	create: true,
	update: true,
	delete: true,
})
@c.Allow(czechStudentRole, {
	read: true,
})
export class BuddyPair {
	createdAt = c.dateTimeColumn().notNull().default('now')
	czechStudent = c.oneHasOne(User, 'czechBuddyPair').setNullOnDelete()
	internationalStudent = c.oneHasOne(User, 'internationalBuddyPair').setNullOnDelete()
	note = c.stringColumn()
	tasks = c.oneHasMany(BuddyTask, 'buddyPair')
}
