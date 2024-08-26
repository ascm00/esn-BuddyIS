import { c } from '@contember/schema-definition'
import { EventRegistration } from './EventRegistration'

export class Allergy {
	createdAt = c.dateTimeColumn().notNull().default('now')
    name = c.stringColumn()

    registrations = c.manyHasManyInverse(EventRegistration, 'allergies')
}