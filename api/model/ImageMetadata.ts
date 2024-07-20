import { c } from '@contember/schema-definition'
import { Image } from './Image'

export class ImageMetadata {
	createdAt = c.dateTimeColumn().notNull().default('now')
	image = c.oneHasOneInverse(Image, 'meta')
	fileName = c.stringColumn()
	lastModified = c.dateTimeColumn()
	fileSize = c.intColumn()
	fileType = c.stringColumn()
}
