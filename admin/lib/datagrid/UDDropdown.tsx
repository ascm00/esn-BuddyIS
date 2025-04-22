import { DeleteEntityDialog } from '../binding'
import { DeleteEntityModalButton } from '../buttons/deleteEntityModalButton'
import { CurrentEntityLazyModalEdit } from '../buttons/modalEdit'
import { AlertDialogContent } from '../ui/alert-dialog'
import { DefaultDropdown, DropdownMenuItem } from '../ui/dropdown'
import { EditIcon, TrashIcon } from 'lucide-react'
import React from 'react'

type UDDropdown = {
	editForm?: React.ReactNode
    editFormRedirect?: React.ReactNode
	children?: React.ReactNode
	dialogProps?: React.ComponentProps<typeof AlertDialogContent>
	deleteForm?: React.ReactNode
}

export const UDDropdown = React.memo<UDDropdown>(({ editForm, editFormRedirect, children, dialogProps, deleteForm }) => {
	return (
		<DefaultDropdown>
			{children}
			{editForm && (
				<CurrentEntityLazyModalEdit
					dialogProps={dialogProps}
					button={
						<DropdownMenuItem className="hover:bg-accent" onSelect={e => e.preventDefault()} onPointerMove={e => e.preventDefault()}>
							<EditIcon className="w-4 mr-2" />
							<span>Edit</span>
						</DropdownMenuItem>
					}
				>
					{editForm}
				</CurrentEntityLazyModalEdit>
			)}
            {editFormRedirect}
            {deleteForm}
			{/* {!disableDelete && (
				<>
					<DeleteEntityDialog
						trigger={
							<DropdownMenuItem onSelect={e => e.preventDefault()}>
								<TrashIcon className="w-4 mr-2" />
								<span>Delete</span>
							</DropdownMenuItem>
						}
					/>
				</>
			)} */}
            {}
		</DefaultDropdown>
	)
})
