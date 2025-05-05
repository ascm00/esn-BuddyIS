import { c } from '@contember/schema-definition'

export const internationalStudentRole = c.createRole('internationalStudent', { stages: '*', s3: { '**': { upload: true, read: true } }, tenant: { invite: { czechBuddy: true, internationalStudent: true }}})
export const esnMemberRole = c.createRole('esnMember', { stages: '*', s3: { '**': { upload: true, read: true } } })
export const paymentGateRole = c.createRole('paymentGate', { stages: '*', s3: { '**': { upload: true, read: true } } })
export const ozsRole = c.createRole('ozsRole', { stages: '*', s3: { '**': { upload: true, read: true } } })
export const czechBuddyRole = c.createRole('czechBuddy', { stages: '*', s3: { '**': { upload: true, read: true } }, tenant: { invite: { czechBuddy: true, internationalStudent: true },} })
export const coordinatorRole = c.createRole('coordinator', { stages: '*', s3: { '**': { upload: true, read: true } } })
export const emailCheckRole = c.createRole('emailCheck', { stages: '*', s3: { '**': { upload: true, read: true } } })

export const internationalStudentId = c.createPredefinedVariable('personId', 'personID', internationalStudentRole)
export const internationalStudentIdentityId = c.createPredefinedVariable('identityId', 'identityID', internationalStudentRole)
export const esnMemberId = c.createPredefinedVariable('personId', 'personID', esnMemberRole)
export const ozsId = c.createPredefinedVariable('personId', 'personID', ozsRole)
export const czechBuddyId = c.createPredefinedVariable('personId', 'personID', czechBuddyRole)
export const czechBuddyIdentityId = c.createPredefinedVariable('identityId', 'identityID', czechBuddyRole)