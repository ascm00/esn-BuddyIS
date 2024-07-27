import { useShowToast } from '@app/lib//toast'
import { useProjectSlug } from '@contember/react-client'
import { useCallback } from 'react'
import { MultiValue } from 'react-select'
import { useUpdateProjectMember } from './useUpdateProjectMember'

export const useUpdateProjectMemberPerson = (identityId: string | null, memberships: MultiValue<{
	label: string
	value: string
}> | undefined) => {
	const updateProjectMember = useUpdateProjectMember()
	const project = useProjectSlug()
	const toast = useShowToast()

	return useCallback(async () => {
		if (!identityId || !memberships) {
			return
		}

		const result = await updateProjectMember({
			identityId,
			projectSlug: project!,
			memberships: memberships.map(it => ({
				role: it.value,
				variables: [],
			})),
		})

		if (!result.ok) {
			toast(`Unable to update member: ${result.error.developerMessage}`, {
				type: 'error',
				dismiss: 5000,
			})
			return
		}

		return () => null
	}, [updateProjectMember, memberships, project, toast, identityId])
}