import { c } from '@contember/schema-definition'
import { EventRegistration } from './EventRegistration'

export class DietaryRestrictions {
	createdAt = c.dateTimeColumn().notNull().default('now')
    name = c.stringColumn()
    registrations = c.manyHasManyInverse(EventRegistration, 'dietaryRestrictions')

}