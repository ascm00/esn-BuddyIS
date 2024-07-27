import {
	Component,
	Field,
	HasOne,
	useEntityBeforePersist,
	useField,
	useIdentity,
	useProjectUserRoles
} from '@contember/interface'
import {useMemo, useState} from 'react'
import {useChangeEmail} from "@app/lib/tenant/hooks/useChangeEmail";
import {useInviteUser} from "@app/lib/tenant/hooks/useInviteUser";
import {useUpdateProjectMemberPerson} from "@app/lib/tenant/hooks/useUpdateProjectMemberPerson";
import {usePersistWithFeedback} from "@app/lib/binding";
import {FormLabelUI, InputField} from "@app/lib/form";
import {Input} from "@app/lib/ui/input";
import {Label} from "@app/lib/ui/label";
import {Button} from "@app/lib/ui/button";
import {Slots} from "@app/lib/layout";
import {RadioGroup, RadioGroupItem} from "@app/lib/ui/radio-group";

export const PersonInvite = Component(
	() => {
		const persist = usePersistWithFeedback()
		const changeEmail = useChangeEmail()
		const identity = useIdentity()

		const personIdField = useField('personId')
		const identityIdField = useField<string>('tenantPerson.identityId')
		const tenantEmail = useField<string>('tenantPerson.email')
		const currentUserId = identity?.person?.id
		const canChangeEmail = useMemo(
			() => currentUserId === personIdField.value || !personIdField.valueOnServer,
			[currentUserId, personIdField],
		)
		const [email, setEmail] = useState<string | undefined>(tenantEmail.value ?? undefined)

		const roles = useProjectUserRoles()
		const rolesField = useField<string>('tenantPerson.roles')
		const rolesArray = rolesField.value?.split('|').filter(role => role)
		const [role, setRole] = useState<string>(rolesArray?.[0] ?? 'admin')

		const membership = {
			role: role,
			variables: [],
		}
		const inviteUser = useInviteUser({
			email: email ?? undefined,
			personIdField: 'personId',
			memberships: [membership],
		})
		const updateProjectMemberPerson = useUpdateProjectMemberPerson(identityIdField.value, [{ label: role, value: role }])

		useEntityBeforePersist(getAccessor => {
			// email update
			if (personIdField.valueOnServer && tenantEmail.value && email && tenantEmail.value !== email) {
				changeEmail({ email: tenantEmail.value, newEmail: email })
			}

			// only admin can invite users and change their membership
			if (roles.has('admin')) {
				return (() => {
					// invite user
					if (!personIdField.valueOnServer) return inviteUser(getAccessor)

					// update membership
					return updateProjectMemberPerson()
				}) as unknown as void // Hack: useEntityBeforePersist does not support async callbacks in types
			}
		})

		return (
			<div className={'flex flex-col gap-4'}>
				{/* <InputField field="name" label="Jméno" required /> */}

				<div className={'max-w-md'}>
					<FormLabelUI>Email</FormLabelUI>
					<Input
						type={'email'}
						value={email}
						onChange={({ target }) => {
							setEmail(target.value)
						}}
						required
						disabled={!canChangeEmail}
					/>
				</div>

				<FormLabelUI>Role</FormLabelUI>
				<RadioGroup defaultValue={role} value={role} onValueChange={setRole} disabled={roles.has('employee') || roles.has('manager')}>
					{/* <div className="flex items-center space-x-2">
						<RadioGroupItem value="internationalStudent" id="option-one" />
						<Label htmlFor="option-one">internationalStudent</Label>
					</div>
                    <div className="flex items-center space-x-2">
						<RadioGroupItem value="esnMemberRole" id="option-one" />
						<Label htmlFor="option-one">esnMember</Label>
					</div>
                    <div className="flex items-center space-x-2">
						<RadioGroupItem value="czechBuddy" id="option-one" />
						<Label htmlFor="option-one">czechBuddy</Label>
					</div> */}
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="admin" id="option-two" />
						<Label htmlFor="option-two">Admin</Label>
					</div>
				</RadioGroup>
				<Slots.Actions>
					<Button onClick={() => persist()}>Uložit</Button>
				</Slots.Actions>
			</div>
		)
	},
	() => (
		<>
			{/* <Field field="name" /> */}
			<HasOne field="tenantPerson">
				<Field field="roles" />
				<Field field="email" />
				<Field field="identityId" />
			</HasOne>
		</>
	),
	'PersonInvite',
)
