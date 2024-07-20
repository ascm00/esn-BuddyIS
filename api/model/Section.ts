import { c } from '@contember/schema-definition'
import { esnMemberRole } from './acl'
import { Event } from './Event'


@c.Allow(esnMemberRole, {
	read: true,
})
export class Section {
	createdAt = c.dateTimeColumn().notNull().default('now')
	events = c.oneHasMany(Event, 'section')
	name = c.stringColumn().notNull()
	description = c.stringColumn()
}
