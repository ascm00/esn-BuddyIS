import { c } from '@contember/schema-definition'
import { Semester } from './Semester'
import { N2nHour } from './N2nHour'
import { coordinatorRole, czechBuddyRole, esnMemberRole, internationalStudentRole, ozsRole } from './acl'
import { Image } from './Image'

@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
	create: true,
	update: true ,
	delete: true,
})
@c.Allow([internationalStudentRole, czechBuddyRole, ozsRole], {
	read: true,
})
export class N2nParty {
	createdAt = c.dateTimeColumn().notNull().default('now')
	name = c.stringColumn().notNull()
	description = c.stringColumn()
	picture = c.manyHasOne(Image, 'partyPicture')
	date = c.dateTimeColumn().notNull()
	open = c.boolColumn()
	link = c.stringColumn()
	semester = c.manyHasOne(Semester, 'parties').setNullOnDelete()
	club = c.stringColumn()
	hours = c.oneHasMany(N2nHour, 'party')
}
