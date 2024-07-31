import {
	Component,
	EntitySubTree,
	Field,
	HasOne,
	identityEnvironmentExtension,
	StaticRender,
	useEntity,
	useEntityBeforePersist,
	useEntitySubTree,
	useField,
	useIdentity,
	useProjectUserRoles
} from '@contember/interface'
import {useMemo, useState} from 'react'
import {useChangeEmail} from "@app/lib/tenant/hooks/useChangeEmail";
import {useInviteUser} from "@app/lib/tenant/hooks/useInviteUser";
import {useUpdateProjectMemberPerson} from "@app/lib/tenant/hooks/useUpdateProjectMemberPerson";
import {Binding, usePersistWithFeedback} from "@app/lib/binding";
import {FormLabelUI, InputField} from "@app/lib/form";
import {Input} from "@app/lib/ui/input";
import {Label} from "@app/lib/ui/label";
import {Button} from "@app/lib/ui/button";
import {Slots} from "@app/lib/layout";
import {RadioGroup, RadioGroupItem} from "@app/lib/ui/radio-group";
import { PersistButton, useProjectSlug } from '@contember/admin';
import PersonCreate from '@app/pages/personCreate';
import { UserEditForm } from './forms/user-edit-form';
import { Toast } from '@app/lib/toast';


export const InitialUserForm = Component(
	() => {
		const currentUser = useEntitySubTree('currentUser')

        const surname = currentUser.getField<string>('surname').value
		const xname = currentUser.getField<string>('xname').value
		const phoneNumber = currentUser.getField<string>('phoneNumber').value;
		const esnCardId = currentUser.getField<string>('esnCardId').value;
		const firstName = currentUser.getField<string>('firstName').value;
		const universityName = currentUser.getField<string>('university.name').value;
		const facultyName = currentUser.getField<string>('faculty.name').value;
		const countryName = currentUser.getField<string>('country.name').value;
        console.log(surname)
		if(!surname || !xname || !phoneNumber || !esnCardId || !firstName || !universityName || !facultyName || !countryName) {
			return (
				window.location.href = '/app/initial-login-page'
			)
		} else {
			return (
				window.location.href = '/app/events'	
			)
		}
	},
    (_, env) => {
        const personId = env.getExtension(identityEnvironmentExtension).identity?.person?.id
    
        return (
				<EntitySubTree entity={`Person(tenantPerson.id = '${personId}')`} alias={'currentUser'}>
					<Field field={'personId'}/>
					<Field field={'lastLoginDate'}/>
					<Field field={'xname'}/>
					<Field field={'phoneNumber'}/>
					<Field field={'esnCardId'}/>
					<Field field={'firstName'}/>
					<Field field={'surname'}/>
					<Field field={'xname'}/>
					<HasOne field={'university'}>
						<Field field={'name'}/>
					</HasOne>
					<HasOne field={'faculty'}>
						<Field field={'name'}/>
					</HasOne>
					<HasOne field={'country'}>
						<Field field={'name'}/>
					</HasOne>
				</EntitySubTree>
        )
    },
	'InitialUserForm',
)