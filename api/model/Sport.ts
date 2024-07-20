import { c } from '@contember/schema-definition'
import { internationalStudentRole, esnMemberRole, publicRole } from './acl'
import { ApplicationFr } from './ApplicationFr'


@c.Allow(internationalStudentRole, {
	create: true,
})
@c.Allow(esnMemberRole, {
	read: true,
})
@c.Allow(publicRole, {
	read: true,
})
export class Sport {
	createdAt = c.dateTimeColumn().notNull().default('now')
	name = c.stringColumn().notNull()
	applicationsFr = c.manyHasMany(ApplicationFr, 'sport')
}
