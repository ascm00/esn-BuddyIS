import { useShowToast } from '@app/lib/toast'
import {useProjectSlug} from '@contember/react-client'
import {useCallback} from 'react'
import {useUpdateProjectMember} from './useUpdateProjectMember'

export const useRemoveProjectMemberPerson = (identityId: string | null) => {
	const updateProjectMember = useUpdateProjectMember()
	const project = useProjectSlug()
	const toast = useShowToast()

	return useCallback(async () => {
		if (!identityId) {
			return
		}

		const result = await updateProjectMember({
			identityId,
			projectSlug: project!,
			memberships: [],
		})

		if (result && !result.ok) {
			toast(`Unable to update member: ${result?.error?.developerMessage}`, {
				type: 'error',
				dismiss: 5000,
			})
			return
		}

		return () => null
	}, [updateProjectMember, project, toast, identityId])
}