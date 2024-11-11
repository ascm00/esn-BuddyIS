import {
	Component,
	Field,
	HasOne,
	HasRole,
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
import {FormLabelUI, ImageField, InputField, SelectField} from "@app/lib/form";
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
				<HasRole role={roles => roles.has('admin')}>
				<FormLabelUI>Role</FormLabelUI>
					<RadioGroup defaultValue={role} value={role} onValueChange={setRole} disabled={roles.has('esnMember') || roles.has('czechBuddy') || roles.has('internationalStudent') || roles.has('ozsRole')}>
					<div className="flex items-center space-x-2">
							<RadioGroupItem value="admin" id="option-one" />
							<Label htmlFor="option-one">Admin</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="esnMember" id="option-two" />
							<Label htmlFor="option-two">ESN Member</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="czechBuddy" id="option-three" />
							<Label htmlFor="option-three">Local Buddy</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="internationalStudent" id="option-four" />
							<Label htmlFor="option-four">Foreign student</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="ozsRole" id="option-five" />
							<Label htmlFor="option-five">OZS member</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="coordinator" id="option-six" />
							<Label htmlFor="option-six">Buddy coordinator</Label>
						</div>
					</RadioGroup>
				</HasRole>
				<div className='pb-2'>
					<InputField field="firstName" label="First Name *" required />
				</div>
				<div className='pb-2'>
					<InputField field="surname" label="Surname *" required />
				</div>
				<div className='pb-2'>
					<InputField field="birthdate" label="Birthdate *" required />
				</div>
				<div className='pb-2'>
					<InputField 
						field="xname" 
						inputProps={{
							pattern: "([a-z]{4}[0-9]{2}|none)"
						}} 
						label="InSIS username *" 
						required
					/>
					<p className="text-xs text-gray-500">If user does not have one yet, write <strong>none</strong>.</p>
				</div>
				<ImageField baseField={'profilePicture'} urlField={'url'} />
				<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('esnMember') || roles.has('internationalStudent')}>
					<div className='pb-2'>
						<InputField field="esnCardId" label="ESN Card ID (not required until you get one)"/>
						<p className="text-xs text-gray-500">You have to add your <strong>ESN Card ID</strong>, when you get one. It will be required for the sign up for the events.</p>
					</div>
				</HasRole>
				<div className='pb-2'>
					<InputField field="phoneNumber" label="Phone Number *" required/>
				</div>
				<div className='pb-2'>
					<SelectField
						field="studyProgram"
						label="Study program *"
						options="StudyProgram"
					>
						<Field field="name" />
					</SelectField>
				</div>
				<div className='pb-2'>
					<SelectField
						field="countryOfUniversity"
						label="Home university country"
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
						label="Home University"
						createNewForm={<>
							<InputField field="name" label="Name" required />
						</>}
						options="University"
					>
						<Field field="name" />
					</SelectField>
				</div>
				{/* <CheckboxField field="active" label="Active" /> */}
				<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('esnMember') || roles.has('czechBuddy') || roles.has('internationalStudent') || roles.has('ozsRole')}>
					<div className='pb-2'>
						<SelectField
							field="faculty"
							label="Faculty at VSE (not required)"
							options="Faculty"
						>
							<Field field="name" />
						</SelectField>
					</div>
				</HasRole>
				<Slots.Actions>
					<Button onClick={() => persist()}>Save data</Button>
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
			<Field field="personId" />
			<Field field="firstName" />
			<HasOne field={'profilePicture'}>
				<Field field={'url'} />
			</HasOne>
			<Field field="surname" />
			<Field field="xname" />
			<Field field="esnCardId" />
			<Field field="phoneNumber" />
			<Field field="birthdate" />
			<Field field="countryOfUniversity.name" />
			<Field field="university.name" />
			<Field field="faculty.name" />
			<HasOne field="studyProgram">
				<Field field="name" />
			</HasOne>
		</>
	),
	'PersonInvite',
)
