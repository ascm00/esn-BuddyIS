import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, coordinatorRole, czechBuddyRole, internationalStudentId, czechBuddyId, ozsRole } from './acl'
import { BuddyTask } from './BuddyTask'
import { Person } from './Person'
import { Note } from './Note'
import { Image } from './Image'
import { Semester } from './Semester'


@c.Allow(internationalStudentRole, {
	when: {internationalStudent: {personId: internationalStudentId}},
	read: true,
	update: true,
	create: true,
})
@c.Allow(czechBuddyRole, {
	when: {czechStudent: {personId: czechBuddyId}},
	read: true,
	update: true,
	create: true,
})
@c.Allow(esnMemberRole, {
	read: true,
	create: true,
	update: true,
	delete: true,
})
@c.Allow(coordinatorRole, {
	read: true,
	create: true,
	update: true,
	delete: true,
})
@c.Allow(ozsRole, {read: true, update: true, create: true})
export class BuddyPair {
	createdAt = c.dateTimeColumn().notNull().default('now')
	coordinator = c.manyHasOne(Person, 'coordinatingBuddyPairs').setNullOnDelete()
	czechStudent = c.manyHasOne(Person, 'czechBuddyPair').setNullOnDelete()
	internationalStudent = c.oneHasOne(Person, 'internationalBuddyPair').setNullOnDelete()
	semester = c.manyHasOne(Semester, 'buddyPairs').notNull()
	notes = c.oneHasMany(Note, 'buddyPair')
	tasks = c.oneHasMany(BuddyTask, 'buddyPair')
	tenPoints = c.boolColumn().notNull().default(false)
	picture = c.oneHasOne(Image, 'buddyPair')
	arrival = c.dateColumn()
}
