import { c } from '@contember/schema-definition'
import { coordinatorRole, czechBuddyRole, esnMemberRole, internationalStudentRole, ozsRole } from './acl'
import { Person } from './Person'


@c.Allow([esnMemberRole, coordinatorRole, ozsRole], {
	read: true,
	create: true,
	update: true,
})
@c.Allow([czechBuddyRole, internationalStudentRole], {
	read: true,
})
export class StudyProgram {
	createdAt = c.dateTimeColumn().notNull().default('now')
	users = c.oneHasMany(Person, 'studyProgram')
	name = c.stringColumn().notNull()
}