import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, publicRole } from './acl'
import { ApplicationFr } from './ApplicationFr'


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
	applicationsFr = c.oneHasMany(ApplicationFr, 'language')
	name = c.stringColumn().notNull()
}
