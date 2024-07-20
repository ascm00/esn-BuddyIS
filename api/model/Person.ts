import { c } from '@contember/schema-definition'
import { User } from './User'
import { TenantPerson } from './TenantPerson'

export class Person {
	createdAt = c.dateTimeColumn().notNull().default('now')
	userUndefined = c.oneHasOneInverse(User, 'target')
	personId = c.uuidColumn().notNull()
	tenantPerson = c.oneHasOneInverse(TenantPerson, 'person')
}
