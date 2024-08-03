import { Component, identityEnvironmentExtension } from '@contember/admin'
import { ReactNode } from 'react'
import { ConnectEntity } from './ConnectEntity'

export const ConnectUser = Component<{ field: string, children?: ReactNode }>(({ field, children }, environment) => {
	return (<ConnectEntity
		field={field}
		entity="Person"
		where={`(personId='${environment.getExtension(identityEnvironmentExtension).identity?.person?.id}')`}
		children={children}
	/>)
}, 'ConnectUser')