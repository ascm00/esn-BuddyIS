import { c } from '@contember/schema-definition'
import { N2nParty } from './N2nParty'

export class Club {
	createdAt = c.dateTimeColumn().notNull().default('now')
	parties = c.oneHasMany(N2nParty, 'club')
	name = c.stringColumn().notNull()
}
