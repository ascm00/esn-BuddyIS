import { c } from '@contember/schema-definition'
import { esnMemberRole, publicRole } from './acl'
import { User } from './User'


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
	users = c.oneHasMany(User, 'faculty')
	name = c.stringColumn().notNull()
}
