import { Component, EntitySubTree, HasOne, SugaredUniqueWhere, useEntity, useGetEntitySubTree } from '@contember/admin'
import { ReactNode, useEffect } from 'react'

export interface ConnectEntityProps {
	entity: string
	where: SugaredUniqueWhere | undefined
	field: string
	children?: ReactNode
}

export const ConnectEntity = Component<ConnectEntityProps>(({ entity, where, field }) => {
	const currentEntity = useEntity()
	const getSubtree = useGetEntitySubTree()
	useEffect(() => {
		if (!where || currentEntity.getEntity(field).existsOnServer) {
			return
		}
		const entityToConnect = getSubtree({
			entity: {
				entityName: entity,
				where,
			},
		})
		if (entityToConnect) {
			currentEntity.connectEntityAtField(field, entityToConnect)
		}
	}, [entity, field, currentEntity, where, getSubtree])
	return null
}, ({ entity, where, children, field }) => {
	if (!where) {
		return null
	}
	return <>
		<HasOne field={field} />
		<EntitySubTree entity={{ entityName: entity, where }}>{children}</EntitySubTree>
	</>
})