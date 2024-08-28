import { Binding, FeedbackTrigger } from '@app/lib/binding'
import { Button } from '@app/lib/ui/button'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTrigger,
} from '@app/lib/ui/alert-dialog'
import {
	Component,
	EntityAccessor,
	EntitySubTree,
	PersistTrigger,
	RedirectOnPersist,
	useCurrentRequest,
	useEntityBeforePersist,
} from '@contember/interface'
import { PlusCircle } from 'lucide-react'
import * as React from 'react'

interface CreateEntityModalButtonProps {
	entityName: string
	createEntityForm: React.ReactNode
	redirectOnPersistTo?: string
	refreshOnPersist?: boolean
	buttonLabel?: string
	button?: React.ReactNode
	dialogProps?: React.ComponentProps<typeof AlertDialogContent>
	onPersistSuccess?: (getEntityAccessor: () => EntityAccessor) => void
	beforePersist?: (entity: EntityAccessor) => void
	saveButtonLabel?: string
}

export const CreateEntityModalButton = Component<CreateEntityModalButtonProps>(
	({
		entityName,
		createEntityForm,
		redirectOnPersistTo,
		refreshOnPersist = false,
		buttonLabel,
		button,
		dialogProps,
		onPersistSuccess,
		beforePersist,
		saveButtonLabel,
	}) => {
		const req = useCurrentRequest()

		return (
			<AlertDialog>
				<AlertDialogTrigger asChild>
					{button ? (
						button
					) : (
						<Button className="flex gap-1.5 px-4">
							{buttonLabel || 'Create'}
						</Button>
					)}
				</AlertDialogTrigger>
				<AlertDialogContent {...dialogProps}>
					<Binding>
						<EntitySubTree
							entity={entityName}
							isCreating
							onBeforePersist={getEntity => beforePersist?.(getEntity())}
							onPersistSuccess={onPersistSuccess}
						>
							{createEntityForm}
							{(redirectOnPersistTo || refreshOnPersist) && <RedirectOnPersist to={redirectOnPersistTo ?? req} />}
							<AlertDialogFooter>
								<AlertDialogCancel>Cancel</AlertDialogCancel>
								<FeedbackTrigger>
									<PersistTrigger>
										<AlertDialogAction>{saveButtonLabel ?? 'Add'}</AlertDialogAction>
									</PersistTrigger>
								</FeedbackTrigger>
							</AlertDialogFooter>
						</EntitySubTree>
					</Binding>
				</AlertDialogContent>
			</AlertDialog>
		)
	},
	() => <></>,
	'CreateEntityModalButton',
)
