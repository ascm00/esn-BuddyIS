import { c } from '@contember/schema-definition'
import { esnMemberRole, publicRole } from './acl'
import { Person } from './Person'


@c.Allow(esnMemberRole, {
	read: true,
	create: true,
	update: true,
	delete: true,
})
@c.Allow(publicRole, {
	read: true,
})
export class Faculty {
	createdAt = c.dateTimeColumn().notNull().default('now')
	users = c.oneHasMany(Person, 'faculty')
	name = c.stringColumn().notNull()
}
