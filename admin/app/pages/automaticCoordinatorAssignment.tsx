import { Binding, PersistButton } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Component, EntityAccessor, EntityBaseProps, EntityListSubTree, EntitySubTree, Field, HasMany, HasOne, HasRole, Link, RedirectOnPersist, useEntity, useEntityList, useEntityListSubTree, usePersist } from '@contember/interface'
import { PaintbrushIcon } from 'lucide-react'
import { string } from 'slate'
import { galeShapleyCzechFirst } from '../../pairing/buddyPairing'
import { buddyPairTasks } from '../../pairing/buddyPairing'
import { useEffect, useState } from 'react'

export default () => {
    
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Automatic coordinator assignment
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntityListSubTree entities="BuddyPair">
                        <Field field="id" />
					</EntityListSubTree>
				</div>
			</Binding>
		</>
	)
}