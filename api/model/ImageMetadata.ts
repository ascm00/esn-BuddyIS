import { c } from '@contember/schema-definition'
import { Image } from './Image'
import { coordinatorRole, czechBuddyRole, esnMemberRole, internationalStudentRole, ozsRole } from './acl'

@c.Allow([esnMemberRole, coordinatorRole, ozsRole, internationalStudentRole, czechBuddyRole], {
	read: true,
	create: true,
	update: true,
	delete: true,
})
export class ImageMetadata {
	createdAt = c.dateTimeColumn().notNull().default('now')
	image = c.oneHasOneInverse(Image, 'meta')
	fileName = c.stringColumn()
	lastModified = c.dateTimeColumn()
	fileSize = c.intColumn()
	fileType = c.stringColumn()
}
