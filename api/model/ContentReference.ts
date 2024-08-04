import { c } from '@contember/schema-definition'
import { contentReferenceTypeEnum } from './enum'
import { Content } from './Content'

export class ContentReference {
	createdAt = c.dateTimeColumn().notNull().default('now')
	type = c.enumColumn(contentReferenceTypeEnum)
	content = c.manyHasOne(Content, 'references')
}