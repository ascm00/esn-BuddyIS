import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, czechBuddyRole, coordinatorRole, internationalStudentId, czechBuddyId, ozsRole } from './acl'
import { BuddyPair } from './BuddyPair'


@c.Allow(internationalStudentRole, {
	when: {buddyPair: {internationalStudent: {personId: internationalStudentId}}},
	read: true,
	update: true,
})
@c.Allow(czechBuddyRole, {
	when: {buddyPair: {czechStudent: {personId: czechBuddyId}}},
	read: true,
	update: true,
})
@c.Allow([esnMemberRole, ozsRole], {
	read: true,
	create: true,
	update: true,
})
@c.Allow(coordinatorRole, {
	read: true,
	create: true,
	update: true,
	delete: true,
})
export class BuddyTask {
	createdAt = c.dateTimeColumn().notNull().default('now')
	description = c.stringColumn().notNull()
	buddyPair = c.manyHasOne(BuddyPair, 'tasks').cascadeOnDelete()
	done = c.boolColumn().notNull().default(false)
	confirmed = c.boolColumn().default(false)
}
