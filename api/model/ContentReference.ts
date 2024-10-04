import { c } from '@contember/schema-definition'
import { contentReferenceTypeEnum } from './enum'
import { Content } from './Content'
import { coordinatorRole, czechBuddyRole, esnMemberRole, internationalStudentRole, ozsRole } from './acl'

@c.Allow([esnMemberRole, coordinatorRole, ozsRole, internationalStudentRole, czechBuddyRole], {
	read: true,
	create: true,
	update: true,
	delete: true,
})
export class ContentReference {
	createdAt = c.dateTimeColumn().notNull().default('now')
	type = c.enumColumn(contentReferenceTypeEnum)
	content = c.manyHasOne(Content, 'references')
}