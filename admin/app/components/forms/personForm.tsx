import { PersonInvite } from '@app/components/personInvite'
import {Component, Field, StaticRender} from '@contember/interface'
import {FormLayout} from "@app/lib/form";

export const PersonForm = Component(() => (
	<FormLayout>
		<StaticRender>
			<Field field={'personId'} />
		</StaticRender>
		<PersonInvite />
	</FormLayout>
))
