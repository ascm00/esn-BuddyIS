import { Button } from '../ui/button'
import { Copy, DownloadIcon } from 'lucide-react'
import { Slot } from '@radix-ui/react-slot'
import { useDataViewFetchAllData } from '@contember/react-dataview'
import { CsvExportFactory, ExportFactory } from '@contember/react-dataview'
import { useDataViewChildren, useDataViewEntityListProps } from '@contember/react-dataview'
import { DataViewExportTrigger } from '@contember/react-dataview'
import * as React from 'react'
import { ReactNode, useMemo, ReactElement, useCallback } from 'react'
import { dict } from '../dict'

export const DataGridCopyEmails = ({ fields }: { fields?: ReactNode }) => {
	return (
		<DataViewCopyEmails fields={fields}>
			<Button variant={'outline'} size={'sm'} className={'gap-2'}>
				<Copy className={'w-4 h-4'} />
				{dict.datagrid.copy}
			</Button>
		</DataViewCopyEmails>
	)
}


export interface DataViewExportTriggerProps {
	fields?: ReactNode
	children: ReactElement
	baseName?: string
	exportFactory?: ExportFactory
}


export const DataViewCopyEmails = ({ fields, children, baseName, exportFactory }: DataViewExportTriggerProps) => {
	console.log('fields', fields)
	const entityName = useDataViewEntityListProps().entityName
	const globalChildren = useDataViewChildren()
	const fetchData = useDataViewFetchAllData({ children: fields ?? globalChildren })
	const doCopy = useCallback(async () => {
		const fetchResult = await fetchData()
		console.log(fetchResult.data)
		const emailsArray = fetchResult.data.map((item: any) => item?.person_2092813789?.tenantPerson_1330802003?.email);
		navigator.clipboard.writeText(emailsArray.join(', '));

	}, [baseName, entityName, exportFactory, fetchData])

	return (
		<Slot onClick={doCopy}>
			{children}
		</Slot>
	)
}




