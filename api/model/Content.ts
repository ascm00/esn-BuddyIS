import { c } from '@contember/schema-definition'
import { Event } from './Event'
import { ContentReference } from './ContentReference'

export class Content {
	createdAt = c.dateTimeColumn().notNull().default('now')
	data = c.jsonColumn()
    references = c.oneHasMany(ContentReference, 'content')
	eventDescription = c.oneHasOneInverse(Event, 'description')
}