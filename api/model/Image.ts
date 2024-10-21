import { c } from '@contember/schema-definition'
import { ImageMetadata } from './ImageMetadata'
import { Event } from './Event'
import { Person } from './Person'
import { BuddyPair } from './BuddyPair'
import { coordinatorRole, czechBuddyRole, esnMemberRole, internationalStudentRole, ozsRole } from './acl'
import { N2nParty } from './N2nParty'

@c.Allow([esnMemberRole, coordinatorRole, ozsRole, internationalStudentRole, czechBuddyRole], {
	read: true,
	create: true,
	update: true,
	delete: true,
})
export class Image {
	createdAt = c.dateTimeColumn().notNull().default('now')
	url = c.stringColumn().notNull()
	width = c.intColumn()
	height = c.intColumn()
	alt = c.stringColumn()
	meta = c.oneHasOne(ImageMetadata, 'image')
	userProfilePicture = c.oneHasMany(Person, 'profilePicture')
	eventPicture = c.oneHasMany(Event, 'picture')
	partyPicture = c.oneHasMany(N2nParty, 'picture')
	buddyPair = c.oneHasOneInverse(BuddyPair, 'picture')
}
