import {
	Component,
	EntitySubTree,
	Field,
	HasOne,
	identityEnvironmentExtension,
	RedirectOnPersist,
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
import InitialLoginPage from '@app/pages/initialLoginPage';


export const InitialUserForm = Component(
	() => {
		const currentUser = useEntitySubTree('currentUser')

        const surname = currentUser.getField<string>('surname').value
		const inSISusername = currentUser.getField<string>('inSISusername').value
		const phoneNumber = currentUser.getField<string>('phoneNumber').value;
		const esnCardId = currentUser.getField<string>('esnCardId').value;
		const firstName = currentUser.getField<string>('firstName').value;
		const universityName = currentUser.getField<string>('university.name').value;
		const facultyName = currentUser.getField<string>('faculty.name').value;
		const countryName = currentUser.getField<string>('countryOfUniversity.name').value;

		if(!currentUser){
			return (
				window.location.href = '/app/events'	
			)
		} else if (!surname || !inSISusername || !phoneNumber || !esnCardId || !firstName || !universityName || !facultyName || !countryName) {
			return (
				window.location.href = '/app/initial-login-page'
				// <InitialLoginPage />
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
					<Field field={'inSISusername'}/>
					<Field field={'phoneNumber'}/>
					<Field field={'esnCardId'}/>
					<Field field={'firstName'}/>
					<Field field={'surname'}/>
					<HasOne field={'university'}>
						<Field field={'name'}/>
					</HasOne>
					<HasOne field={'faculty'}>
						<Field field={'name'}/>
					</HasOne>
					<HasOne field={'countryOfUniversity'}>
						<Field field={'name'}/>
					</HasOne>
				</EntitySubTree>
        )
    },
	'InitialUserForm',
)