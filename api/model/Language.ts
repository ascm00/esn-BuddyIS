import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, coordinatorRole, czechBuddyRole, ozsRole } from './acl'
import { ApplicationFr } from './ApplicationFr'
import { Person } from './Person'
import { ApplicationCz } from './ApplicationCz'


@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
	create: true,
	update: true,
})

@c.Allow([internationalStudentRole, czechBuddyRole, ozsRole], {
	read: true,
	create: true,
	update: true,
})
export class Language {
	createdAt = c.dateTimeColumn().notNull().default('now')
	name = c.stringColumn().notNull()
	person = c.manyHasManyInverse(Person, 'languages')
	applicationsCz = c.manyHasManyInverse(ApplicationCz, 'preferredLanguages')
}
