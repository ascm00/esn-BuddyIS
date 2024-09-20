import { c } from '@contember/schema-definition'
import { esnMemberRole, publicRole } from './acl'
import { Event } from './Event'
import { ApplicationCz } from './ApplicationCz'
import { ApplicationFr } from './ApplicationFr'
import { N2nParty } from './N2nParty'


@c.Allow(esnMemberRole, {
	read: true,
	update: true,
})
@c.Allow(publicRole, {
	read: true,
})

export class Semester {
	createdAt = c.dateTimeColumn().notNull().default('now')
	events = c.oneHasMany(Event, 'semester')
	name = c.stringColumn().notNull()
	startDate = c.dateTimeColumn().notNull()
	endDate = c.dateTimeColumn().notNull()
	applications = c.oneHasMany(ApplicationCz, 'semester')
	applicationsFr = c.oneHasMany(ApplicationFr, 'semester')
	parties = c.oneHasMany(N2nParty, 'semester')
	isCurrent = c.boolColumn().notNull().default(false)
}
