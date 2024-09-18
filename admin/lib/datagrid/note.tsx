import { dict } from '@app/lib/dict'
import { Component } from '@contember/interface'
import { DataViewEachRow, DataViewLayout } from '@contember/react-dataview'
import { SheetIcon } from 'lucide-react'
import * as React from 'react'
import { ReactNode } from 'react'

export interface DataViewNotesProps {
	children: ReactNode
}

export const DataGridNotes = Component<DataViewNotesProps>(({ children }) => (
	<DataViewLayout
		name="table"
		label={
			<>
				<SheetIcon className={'w-3 h-3'} />
				<span>{dict.datagrid.showTable}</span>
			</>
		}
	>
		<div className={'flex flex-col gap-4 border rounded-lg p-4 '}>
			<div className={'flex flex-col gap-4 max-h-96 overflow-y-auto'}>
				<DataViewEachRow>
					<DataGridNotesRenderer>{children}</DataGridNotesRenderer>
				</DataViewEachRow>
			</div>
		</div>
	</DataViewLayout>
))

export const DataGridNotesRenderer = Component<DataViewNotesProps>(({ children }) => {
	return <div>{children}</div>
})
