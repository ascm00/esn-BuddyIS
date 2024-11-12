import { CheckboxField, FormLayout, InputField, FormLabelUI, RadioEnumField, SelectField } from '@app/lib/form'
import { DefaultRepeater, RepeaterItemActions, RepeaterRemoveItemButton } from '@app/lib/repeater'
import { Component, Field } from '@contember/interface'
import {
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
import {Input} from "@app/lib/ui/input";
import {Label} from "@app/lib/ui/label";
import {RadioGroup, RadioGroupItem} from "@app/lib/ui/radio-group";

export const UserEditForm = Component(
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
		console.log(identityIdField.value)
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
	
	return ( <FormLayout>

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
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="internationalStudent" id="option-one" />
						<Label htmlFor="option-one">internationalStudent</Label>
					</div>
                    <div className="flex items-center space-x-2">
						<RadioGroupItem value="esnMember" id="option-one" />
						<Label htmlFor="option-one">esnMember</Label>
					</div>
                    <div className="flex items-center space-x-2">
						<RadioGroupItem value="czechBuddy" id="option-one" />
						<Label htmlFor="option-one">czechBuddy</Label>
					</div>
					<div className="flex items-center space-x-2">
						<RadioGroupItem value="admin" id="option-two" />
						<Label htmlFor="option-two">Admin</Label>
					</div>
				</RadioGroup>
			</div>

		<div>
			<p className="text-gray-500">Please, fill in the information about you. You cannot continue until you fill in all the fields.</p>
			<hr className="my-2 border-gray-200" />
		</div>
		<div className='pb-2'>
			<InputField field="firstName" label="First Name *" required />
		</div>
		<div className='pb-2'>
			<InputField field="surname" label="Surname *" required />
		</div>
		<div className='pb-2'>
			<InputField field="xname" label="InSIS username *" required/>
			<p className="text-xs text-gray-500">InSIS username is the first part of your VŠE email address before @.</p>
			<p className="text-xs text-gray-500">For example <strong>novp</strong>@vse.cz</p>
		</div>
		<div className='pb-2'>
			<InputField field="esnCardId" label="ESN Card ID (not required until you get one)"/>
			<p className="text-xs text-gray-500">You have to add your <strong>ESN Card ID</strong>, when you get one. It will be required for the sign up for the events.</p>
		</div>
		<div className='pb-2'>
			<InputField field="phoneNumber" label="Phone Number *" required/>
		</div>
		<div className='pb-2'>
			<SelectField
				field="countryOfUniversity"
				label="Home university Country *"
				createNewForm={<>
					<InputField field="name" label="Name" required />
				</>}
				options="Country"
			>
				<Field field="name" />
			</SelectField>
		</div>
		<div className='pb-2'>
			<SelectField
				field="university"
				label="Home University *"
				createNewForm={<>
					<InputField field="name" label="Name" required />
				</>}
				options="University"
			>
				<Field field="name" />
			</SelectField>
		</div>
		{/* <CheckboxField field="active" label="Active" /> */}
		<div className='pb-2'>
			<SelectField
				field="faculty"
				label="Faculty at VSE (not required)"
				createNewForm={<>
					<InputField field="name" label="Name" required />
				</>}
				options="Faculty"
			>
				<Field field="name" />
			</SelectField>
		</div>
		{/* <DefaultRepeater field="applications" orderBy="createdAt" title="Applications">
			<RepeaterItemActions>
				<RepeaterRemoveItemButton />
			</RepeaterItemActions>
			<InputField field="points" label="Point" />
			<InputField field="motivation" label="Motivation" />
			<RadioEnumField
				field="status"
				label="Status"
				options={{ enabled: 'enabled', disabled: 'disabled', cancelled: 'cancelled' }}
			/>
			<RadioEnumField field="result" label="Result" options={{ accepted: 'accepted', declined: 'declined' }} />
			<InputField field="rBuddy" label="R buddy" />
			<InputField field="rParty" label="R party" />
			<InputField field="rTravel" label="R travel" />
			<InputField field="rSport" label="R sport" />
			<RadioEnumField
				field="preferredSex"
				label="Preferred sex"
				options={{ man: 'Man', woman: 'Woman', dontCare: 'Don\'t care' }}
			/>
		</DefaultRepeater> */}
	</FormLayout>
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
			<Field field="personId" />
			<Field field="firstName" />
			<Field field="surname" />
			<Field field="xname" />
			<Field field="esnCardId" />
			<Field field="phoneNumber" />
			<Field field="country.name" />
			<Field field="university.name" />
			<Field field="faculty.name" />
		</>
	),
)


