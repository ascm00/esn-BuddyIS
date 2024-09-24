import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, publicRole } from './acl'
import { ApplicationFr } from './ApplicationFr'
import { Person } from './Person'
import { ApplicationCz } from './ApplicationCz'


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
export class Language {
	createdAt = c.dateTimeColumn().notNull().default('now')
	name = c.stringColumn().notNull()
	person = c.manyHasManyInverse(Person, 'languages')
	applicationsCz = c.manyHasManyInverse(ApplicationCz, 'preferredLanguages')
}
