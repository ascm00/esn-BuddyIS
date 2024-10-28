import createUserQuery from './gql/createUser'
import inviteQuery from './gql/invite'
import { Env } from './types'
import { contentClient, tenantClient } from './utils/client'
import { isObject } from './utils/helpers'

interface InvitationResult {
	data?: {
		invite?: {
			result?: {
				person?: {
					id: string
				}
			}
		}
	}
}

export async function onRequestPost(email: string, firstname: string, surname: string, xname: string, phoneNumber: string, env: Env){
	// const formData = await request.formData()
	// const data: Record<string, any> = {}

	// for (const entry of formData.entries()) {
	// 	const [key, value] = entry

	// 	// biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
	// 	if (data.hasOwnProperty(key)) {
	// 		if (!Array.isArray(data[key])) {
	// 			data[key] = [data[key]]
	// 		}
	// 		data[key].push(value)
	// 	} else {
	// 		data[key] = value
	// 	}
	// }

	if (!email || !firstname || !surname || !xname || !phoneNumber) {
		return new Response('Invalid data', { status: 400 })
	}

	const invitationResult = await tenantClient(env, {
		query: inviteQuery,
		variables: {
			email: email,
			projectSlug: env.VITE_CONTEMBER_ADMIN_PROJECT_NAME,
			name: `${firstname} ${surname}`,
			memberships: [{ role: env.role, variables: [] }],
			options: { method: 'RESET_PASSWORD'},
		},
	})

	if (!invitationResult.ok) {
		console.error('Failed to send invitation', invitationResult)
		return new Response('Internal server error', { status: 500 })
	}

	const invitation: InvitationResult = await invitationResult.json()

	if (
		isObject(invitation) &&
		isObject(invitation.data) &&
		isObject(invitation?.data?.invite) &&
		isObject(invitation?.data?.invite?.result) &&
		isObject(invitation?.data?.invite?.result?.person) &&
		typeof invitation?.data?.invite?.result?.person?.id === 'string'
	) {
		const personId = invitation.data.invite.result.person.id
		const upsertData = {
			personId: personId,
			firstName: firstname,
			surname: surname,
			xname: xname,
			phoneNumber: phoneNumber,
			//email: email,
		}


		const createUser = await contentClient(
			env,
			{
				query: createUserQuery,
				variables: {
					personId,
					createData: upsertData,
					updateData: upsertData,
				},
			},
			env.VITE_CONTEMBER_ADMIN_INVITE_TOKEN,
		)

		return new Response(JSON.stringify({ createUser }), { status: 200, headers: { location: '/' } })
	}

	return new Response('Invalid invitation response', { status: 500 })
}
