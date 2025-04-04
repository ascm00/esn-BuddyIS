import { c } from '@contember/schema-definition'
import { Person } from './Person'
import { coordinatorRole, czechBuddyId, czechBuddyRole, emailCheckRole, esnMemberRole, internationalStudentId, internationalStudentRole, ozsRole } from './acl'

@c.View(`
	SELECT
		tenant_person.id,
		tenant_person.email,
		tenant_person.name,
		tenant_person.identity_id,
		content_person.id AS person_id,
		STRING_AGG(DISTINCT project_membership.role, ', ') AS roles
	FROM person AS content_person
		FULL OUTER JOIN tenant.person AS tenant_person ON tenant_person.id = content_person.person_id
		LEFT JOIN tenant.identity AS tenant_identity ON tenant_person.identity_id = tenant_identity.id
		LEFT JOIN tenant.project_membership AS project_membership ON tenant_identity.id = project_membership.identity_id
	WHERE tenant_person.id IS NOT NULL
	GROUP BY tenant_person.id, content_person.id
`)
@c.Allow([esnMemberRole, coordinatorRole], {
	read: true,
	create: true,
	update: true,
})
// @c.Allow([emailCheckRole], {
// 	read: ['email', 'id'],
// })
@c.Allow([internationalStudentRole, czechBuddyRole], {
	create: true,
})
@c.Allow([internationalStudentRole], {
	when: {identityId: internationalStudentId},
	update: true,
	read: true,
})
@c.Allow([czechBuddyRole], {
	when: {identityId: czechBuddyId},
	update: true,
	read: true,
})
@c.Allow(ozsRole, {read: true,})
export class TenantPerson {
	createdAt = c.dateTimeColumn().notNull().default('now')
	identityId = c.uuidColumn().notNull()
	email = c.stringColumn().unique()
	name = c.stringColumn()
	otpUri = c.stringColumn()
	otpActivatedAt = c.stringColumn()
	idpOnly = c.stringColumn()
	roles = c.stringColumn()
	person = c.oneHasOne(Person, 'tenantPerson')
}
