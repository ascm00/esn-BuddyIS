import { Binding, usePersistWithFeedback } from '@app/lib/binding'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogTrigger,
} from '@app/lib/ui/alert-dialog'
import { Button } from '@app/lib/ui/button'
import { RedirectOnPersist } from '@contember/interface'
import {
	Component,
	EntityKeyProvider,
	EntitySubTree,
	EnvironmentContext,
	EnvironmentMiddleware,
	type SugarableQualifiedSingleEntity,
	TreeRootIdProvider,
	useDirtinessState,
	useEntity,
	useEnvironment,
} from '@contember/react-binding'
import { useCurrentRequest } from '@contember/react-routing'
import type * as React from 'react'
import { type ComponentProps, type FC, type PropsWithChildren, type ReactNode, useCallback, useMemo } from 'react'

export interface ModalEditProps {
	entity: string | SugarableQualifiedSingleEntity
	isCreating?: boolean
	buttonProps?: React.ComponentProps<typeof Button>
	button?: React.ReactNode
	triggerAsChild?: boolean
	buttonContent?: ReactNode
	redirectOnSuccess?: string | false
	onBeforePersist?: ComponentProps<typeof EntitySubTree>['onBeforePersist']
	onInitialize?: ComponentProps<typeof EntitySubTree>['onInitialize']
	onPersist?: () => void
	additionalEnvironment?: Record<string, string>
	dialogProps?: React.ComponentProps<typeof AlertDialogContent>
}

export const CurrentEntityLazyModalEdit: FC<PropsWithChildren<Omit<ModalEditProps, 'entity'>>> = Component(
	({
		children,
		isCreating,
		button,
		buttonProps,
		buttonContent,
		redirectOnSuccess,
		onBeforePersist,
		onInitialize,
		onPersist,
		additionalEnvironment,
		triggerAsChild,
		dialogProps,
	}) => {
		const entity = useEntity()
		const entitySpec = `${entity.name}(id = $id)`
		const req = useCurrentRequest()

		const resolvedEnvironment = useMemo(() => {
			const additional = Object.fromEntries(
				Object.entries(additionalEnvironment ?? {}).map(([key, field]) => {
					const value = entity.getField(field).value ?? (undefined as any)
					return [key, value]
				}),
			)
			additional.id = entity.id
			return additional
		}, [entity, additionalEnvironment])
		const childrenWithEnv = useMemo(() => {
			return (
				<EnvironmentMiddleware create={env => env.withVariables(resolvedEnvironment)}>
					<EntitySubTree
						entity={entitySpec}
						isCreating={isCreating as any}
						onBeforePersist={onBeforePersist}
						onInitialize={onInitialize}
						//onPersistSuccess={successEvent}
					>
						{(redirectOnSuccess ?? req?.pageName) && redirectOnSuccess !== false && (
							<RedirectOnPersist to={(redirectOnSuccess ?? req?.pageName) as string} />
						)}
						{children}
					</EntitySubTree>
				</EnvironmentMiddleware>
			)
		}, [entitySpec, isCreating, onBeforePersist, onInitialize, children, resolvedEnvironment, redirectOnSuccess, req])

		const env = useEnvironment()
		return (
			<AlertDialog>
				<AlertDialogTrigger asChild={triggerAsChild ?? true}>
					{button ? button : <Button {...buttonProps}>{buttonContent}</Button>}
				</AlertDialogTrigger>
				<AlertDialogContent {...dialogProps}>
					<EnvironmentContext.Provider value={env}>
						<TreeRootIdProvider treeRootId={undefined}>
							<EntityKeyProvider entityKey={undefined as unknown as string}>
								<Binding>
									{childrenWithEnv}
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction asChild>
											<SaveButton onPersist={onPersist} />
										</AlertDialogAction>
									</AlertDialogFooter>
								</Binding>
							</EntityKeyProvider>
						</TreeRootIdProvider>
					</EnvironmentContext.Provider>
				</AlertDialogContent>
			</AlertDialog>
		)
	},
	() => {
		return null
	},
)

export const SaveButton: FC<{
	onPersist: (() => void) | undefined
	redirectOnSuccess?: string
}> = ({ onPersist, redirectOnSuccess }) => {
	const triggerPersist = usePersistWithFeedback()
	const isDirty = useDirtinessState()
	const onClick = useCallback(async () => {
		try {
			await triggerPersist()
			onPersist?.()
		} catch {}
	}, [triggerPersist, onPersist])
	return (
		<Button onClick={onClick} disabled={!isDirty}>
			Save data
		</Button>
	)
}
