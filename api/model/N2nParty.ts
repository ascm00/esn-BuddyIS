import { c } from '@contember/schema-definition'
import { Semester } from './Semester'
import { Club } from './Club'
import { N2nHour } from './N2nHour'

export class N2nParty {
	createdAt = c.dateTimeColumn().notNull().default('now')
	name = c.stringColumn().notNull()
	date = c.dateTimeColumn().notNull()
	open = c.boolColumn()
	semester = c.manyHasOne(Semester, 'parties').setNullOnDelete()
	club = c.manyHasOne(Club, 'parties').setNullOnDelete()
	hours = c.oneHasMany(N2nHour, 'party')
}
