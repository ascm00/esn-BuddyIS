import { c } from '@contember/schema-definition'
import { ImageMetadata } from './ImageMetadata'
import { User } from './User'
import { Event } from './Event'

export class Image {
	createdAt = c.dateTimeColumn().notNull().default('now')
	url = c.stringColumn().notNull()
	width = c.intColumn()
	height = c.intColumn()
	alt = c.stringColumn()
	meta = c.oneHasOne(ImageMetadata, 'image')
	userProfilePicture = c.oneHasMany(User, 'profilePicture')
	eventPicture = c.oneHasMany(Event, 'picture')
}
