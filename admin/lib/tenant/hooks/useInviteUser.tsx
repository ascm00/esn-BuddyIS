import * as React from 'react'
import * as TenantApi from '@contember/graphql-client-tenant'
import { EntityAccessor } from '@contember/interface'
import { useProjectSlug } from '@contember/react-client'
import { useReferentiallyStableCallback } from '@contember/react-utils'
import { ToastContent, useShowToast } from '@app/lib/toast'
import { dict } from '@app/lib/dict'
import { useInvite } from './useInvite'

export const useInviteUser = ({
	email,
	personIdField,
	memberships,
}: {
	personIdField: string
	email?: string
	memberships: TenantApi.MembershipInput[]
}) => {
	const invite = useInvite()
	const project = useProjectSlug()
	const toast = useShowToast()

	return useReferentiallyStableCallback(async (getAccessor: () => EntityAccessor) => {
		const accessor = getAccessor()
		const personId = accessor.getField<string>(personIdField)

		if (personId.value || !email) {
			return
		}

		const result = await invite({
			email: email,
			projectSlug: project!,
			memberships: memberships,
		})

		return () => {
			if (!result?.ok || !result?.result) {
				return toast(<ToastContent title={dict.inviteErrors[result?.error?.code ?? 'fallback']} />, {
					type: 'error',
				})
			}
			personId.updateValue(result.result.person.id)
		}
	})
}