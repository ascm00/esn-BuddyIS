import { c } from '@contember/schema-definition'
import { coordinatorRole, czechBuddyRole, esnMemberRole, internationalStudentRole, ozsRole } from './acl'
import { Event } from './Event'
import { ApplicationCz } from './ApplicationCz'
import { ApplicationFr } from './ApplicationFr'
import { N2nParty } from './N2nParty'
import { BuddyPair } from './BuddyPair'


@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
})

@c.Allow([ozsRole, internationalStudentRole, czechBuddyRole], {
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
	buddyPairs = c.oneHasMany(BuddyPair, 'semester')
	parties = c.oneHasMany(N2nParty, 'semester')
	isCurrent = c.boolColumn().notNull().default(false)
	openForCzechBuddyRegistrationsDate = c.dateTimeColumn().notNull()
	closeBuddyRegistrations = c.dateTimeColumn().notNull()
}
