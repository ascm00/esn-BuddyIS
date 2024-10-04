import { c } from '@contember/schema-definition'
import { Event } from './Event'
import { ContentReference } from './ContentReference'
import { coordinatorRole, czechBuddyRole, esnMemberRole, internationalStudentRole, ozsRole } from './acl'

@c.Allow([esnMemberRole, coordinatorRole, ozsRole, internationalStudentRole, czechBuddyRole], {
	read: true,
	create: true,
	update: true,
	delete: true,
})
export class Content {
	createdAt = c.dateTimeColumn().notNull().default('now')
	data = c.jsonColumn()
    references = c.oneHasMany(ContentReference, 'content')
}