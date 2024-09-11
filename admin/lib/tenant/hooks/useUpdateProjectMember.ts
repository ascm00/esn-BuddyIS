import * as TenantApi from '@contember/graphql-client-tenant'
import { useTenantApi } from '@contember/react-client-tenant'
import { useCallback } from 'react'



const ProjectMemberFetcher = TenantApi.updateProjectMemberResponse$
	.ok
	.error(TenantApi.updateProjectMemberError$.developerMessage)


export type InviteErrorCodes = 'PROJECT_NOT_FOUND'

export const useUpdateProjectMember = () => {
	const api = useTenantApi()

	return useCallback(async (variables: {
		identityId: string
		projectSlug: string
		memberships: TenantApi.MembershipInput[]
	}) => {
		return (await api(TenantApi.mutation$.updateProjectMember(ProjectMemberFetcher), {
			variables,
		})).updateProjectMember
	}, [api])
}