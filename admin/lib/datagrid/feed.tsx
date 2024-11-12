import { dict } from '@app/lib/dict'
import { Component } from '@contember/interface'
import { DataViewEachRow, DataViewLayout } from '@contember/react-dataview'
import { SheetIcon } from 'lucide-react'
import * as React from 'react'
import { ReactNode } from 'react'

export interface DataViewFeedProps {
	children: ReactNode
}

export const DataGridFeed = Component<DataViewFeedProps>(({ children }) => (

	<div className={'flex flex-col gap-4 items-center'}>
		<div className={'w-full max-w-4xl flex flex-col gap-4'}>
			<DataGridFeedRenderer>{children}</DataGridFeedRenderer>
		</div>
	</div>
))


export const DataGridFeedRenderer = Component<DataViewFeedProps>(({ children }) => {
	return <div>{children}</div>
})