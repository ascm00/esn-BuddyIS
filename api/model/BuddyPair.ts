import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, coordinatorRole } from './acl'
import { BuddyTask } from './BuddyTask'
import { Person } from './Person'
import { Note } from './Note'
import { Image } from './Image'


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
	coordinator = c.manyHasOne(Person, 'coordinatingBuddyPairs').setNullOnDelete()
	czechStudent = c.oneHasOne(Person, 'czechBuddyPair').setNullOnDelete()
	internationalStudent = c.oneHasOne(Person, 'internationalBuddyPair').setNullOnDelete()
	notes = c.oneHasMany(Note, 'buddyPair')
	tasks = c.oneHasMany(BuddyTask, 'buddyPair')
	tenPoints = c.boolColumn().notNull().default(false)
	picture = c.oneHasOne(Image, 'buddyPair')
	arrival = c.dateColumn()
}
