import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, publicRole } from './acl'
import { BuddyPair } from './BuddyPair'
import { Person } from './Person'


@c.Allow(internationalStudentRole, {
	read: true,
	create: true,
})
@c.Allow(esnMemberRole, {
	read: true,
	create: true,
	update: true,
	delete: true,
})
@c.Allow(publicRole, {
	read: true,
})
export class Note {
	createdAt = c.dateTimeColumn().notNull().default('now')
	buddyPair = c.manyHasOne(BuddyPair, 'notes').cascadeOnDelete()
	content = c.stringColumn().notNull()
    author = c.manyHasOne(Person, 'notes')
}