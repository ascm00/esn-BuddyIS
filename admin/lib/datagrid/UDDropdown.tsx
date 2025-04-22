import { DeleteEntityDialog } from '../binding'
import { AlertDialogContent } from '../ui/alert-dialog'
import { DefaultDropdown, DropdownMenuItem } from '../ui/dropdown'
import { EditIcon, TrashIcon } from 'lucide-react'
import React from 'react'
import { CurrentEntityLazyModalEdit } from '../buttons/modalEdit'
import { RedirectOnPersist } from '@contember/interface'

type UDDropdown = {
	editForm?: React.ReactNode
	editFormRedirect?: React.ReactNode
	children?: React.ReactNode
	dialogProps?: React.ComponentProps<typeof AlertDialogContent>
	disableDelete?: boolean
}

export const UDDropdown = React.memo<UDDropdown>(({ editForm, children, dialogProps, editFormRedirect, disableDelete = false }) => {
	return (
		<DefaultDropdown>
			{children}
			{editForm && (
				<CurrentEntityLazyModalEdit
					dialogProps={dialogProps}
					button={
						<DropdownMenuItem className="hover:bg-accent" onSelect={e => e.preventDefault()}>
							<EditIcon className="w-4 mr-2" />
							<span>Edit</span>
						</DropdownMenuItem>
					}
				>
					{editForm}
				</CurrentEntityLazyModalEdit>
			)}
			{editFormRedirect}
			{!disableDelete && (
				<>
					<DeleteEntityDialog
						trigger={
							<DropdownMenuItem onSelect={e => e.preventDefault()}>
								<TrashIcon className="w-4 mr-2" color='red' />
								<span>Delete</span>
							</DropdownMenuItem>
						}
						immediatePersist
					/>
				</>
			)}
		</DefaultDropdown>
	)
})
