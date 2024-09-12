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
export class StudyProgram {
	createdAt = c.dateTimeColumn().notNull().default('now')
	users = c.oneHasMany(Person, 'studyProgram')
	name = c.stringColumn().notNull()
}