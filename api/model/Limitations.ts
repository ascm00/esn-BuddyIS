import { c } from '@contember/schema-definition'
import { ApplicationFr } from './ApplicationFr'

export class Limitations {
	createdAt = c.dateTimeColumn().notNull().default('now')
	applicationFr = c.oneHasOneInverse(ApplicationFr, 'limitations')
}
