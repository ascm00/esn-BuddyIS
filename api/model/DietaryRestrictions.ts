import { c } from '@contember/schema-definition'
import { EventRegistration } from './EventRegistration'
import { coordinatorRole, czechBuddyRole, esnMemberRole, internationalStudentRole, ozsRole } from './acl'

@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
	create: true,
	update: true,
	delete: true,
})

@c.Allow([internationalStudentRole, czechBuddyRole, ozsRole], {
	read: true,
})
export class DietaryRestrictions {
	createdAt = c.dateTimeColumn().notNull().default('now')
    name = c.stringColumn()
    registrations = c.manyHasManyInverse(EventRegistration, 'dietaryRestrictions')

}