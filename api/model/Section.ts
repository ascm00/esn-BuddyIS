import { c } from '@contember/schema-definition'
import { coordinatorRole, czechBuddyRole, esnMemberRole, internationalStudentRole } from './acl'
import { Event } from './Event'


@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
	create: true,
	update: true,
})

@c.Allow([internationalStudentRole, czechBuddyRole], {
	read: true,
})
export class Section {
	createdAt = c.dateTimeColumn().notNull().default('now')
	events = c.oneHasMany(Event, 'section')
	name = c.stringColumn().notNull()
	description = c.stringColumn()
}
