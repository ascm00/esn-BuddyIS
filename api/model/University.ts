import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, publicRole } from './acl'
import { Country } from './Country'
import { Person } from './Person'


@c.Allow(internationalStudentRole, {
	read: true,
	create: true,
})
@c.Allow(esnMemberRole, {
	read: true,
	create: true,
	update: true,
	delete: true,
})
@c.Allow(publicRole, {
	read: true,
})
export class University {
	createdAt = c.dateTimeColumn().notNull().default('now')
	users = c.oneHasMany(Person, 'university')
	name = c.stringColumn().notNull()
	country = c.manyHasOne(Country, 'universities').setNullOnDelete()
}
