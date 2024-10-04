import { c } from '@contember/schema-definition'

export const internationalStudentRole = c.createRole('internationalStudent', {  })
export const esnMemberRole = c.createRole('esnMember', {  })
export const ozsRole = c.createRole('ozsRole', {  })
export const czechBuddyRole = c.createRole('czechBuddy', {  })
export const coordinatorRole = c.createRole('coordinator', {  })

export const internationalStudentId = c.createPredefinedVariable('personId', 'personID', internationalStudentRole)
export const esnMemberId = c.createPredefinedVariable('personId', 'personID', esnMemberRole)
export const ozsId = c.createPredefinedVariable('personId', 'personID', ozsRole)
export const czechBuddyId = c.createPredefinedVariable('personId', 'personID', czechBuddyRole)