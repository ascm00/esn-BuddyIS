import { GQLVariable, InviteMethod, MembershipInput, useSingleTenantMutation } from '@contember/admin'

const UPDATE_PROJECT_MEMBER_MUTATION = `
updateProjectMember(
	identityId: $identityId,
	projectSlug: $projectSlug,
	memberships: $memberships,
) {
	ok
	error {
		code
	}
}
`

const updateProjectMemberVariables = {
	projectSlug: GQLVariable.Required(GQLVariable.String),
	identityId: GQLVariable.Required(GQLVariable.String),
	memberships: GQLVariable.Required(GQLVariable.List(MembershipInput)),
}

export type InviteErrorCodes = 'PROJECT_NOT_FOUND'

export const useUpdateProjectMember = () => {
	return useSingleTenantMutation<{ isNew: boolean; person: { id: string; identity: { id: string } } }, InviteErrorCodes, typeof updateProjectMemberVariables>(
		UPDATE_PROJECT_MEMBER_MUTATION,
		updateProjectMemberVariables,
	)
}