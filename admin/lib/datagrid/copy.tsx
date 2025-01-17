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

export const DataGridCopyEmails = ({ fields, where }: { fields?: ReactNode, where?: string }) => {
	return (
		<DataViewCopyEmails fields={fields} where={where}>
			<Button variant={'outline'} size={'sm'} className={'gap-2'}>
				<Copy className={'w-4 h-4'} />
				{where === 'buddyPairsInternational' && 'FB emails'}
				{where === 'buddyPairsCzech' && 'LB emails'}
				{where != 'buddyPairsInternational' && where != 'buddyPairsCzech' && dict.datagrid.copy}
			</Button>
		</DataViewCopyEmails>
	)
}


export interface DataViewExportTriggerProps {
	fields?: ReactNode
	children: ReactElement
	baseName?: string
	exportFactory?: ExportFactory
	where?: string
}

// This function copies all emails from the datagrid after filters
export const DataViewCopyEmails = ({ fields, children, baseName, exportFactory, where }: DataViewExportTriggerProps) => {
	console.log('fields', fields)
	const entityName = useDataViewEntityListProps().entityName
	const globalChildren = useDataViewChildren()
	const fetchData = useDataViewFetchAllData({ children: fields ?? globalChildren })
	const doCopy = useCallback(async () => {
		const fetchResult = await fetchData()
		console.log(fetchResult.data)
		console.log(fetchResult.data[0][1])

		//JSON returns structure like this: person_2092813789?.tenantPerson_1330802003?. Because it may vary in browsers, we have to check it
		let emailsArray;
		if (where === 'applications' || where === 'eventDetail') {
			emailsArray = getEmailAddresses(fetchResult.data, 'person_');
		} else if (where === 'buddyPairsCzech') {
			emailsArray = getEmailAddresses(fetchResult.data, 'czechStudent_');
		} else if (where === 'buddyPairsInternational') {
			emailsArray = getEmailAddresses(fetchResult.data, 'internationalStudent_');
		}

		// const emailsArray = fetchResult.data.map((item: any) => item?.person_2092813789?.tenantPerson_1330802003?.email);
		if(emailsArray){
			try {
				await navigator.clipboard.writeText(emailsArray.join(', '))
				console.log('Text successfully copied to clipboard')
			} catch (error) {
				console.log('Coppying failed:', error);
				const textArea = document.createElement('textarea')
				textArea.value = emailsArray.join(', ')
				document.body.appendChild(textArea)
				textArea.select()
				const successful = document.execCommand('copy');
				if (successful) {
					console.log('Succesfully copied with execCommand');
				} else {
					console.log('Copy with execCommand failed');
				}
				document.body.removeChild(textArea)
			}
		}

	}, [baseName, entityName, exportFactory, fetchData])

	return (
		<Slot onClick={doCopy}>
			{children}
		</Slot>
	)
}

function getEmailAddresses(data: any[], personStartsWith: string): string[] {
	const emails: string[] = [];
	for (const application of data) {
	  // Finds all keys starting with _"
	  const personKeys = Object.keys(application).filter(key => key.startsWith(personStartsWith))
  
	  // Loop through all found keys
	  for (const personKey of personKeys) {
		// Find all keys that start with "tenantPerson_" within the current "person_" object
		const tenantPersonKeys = Object.keys(application[personKey]).filter(key => key.startsWith('tenantPerson_'))
  
		for (const tenantPersonKey of tenantPersonKeys) {
		  const email = application[personKey][tenantPersonKey]?.email
		  if (email) {
			emails.push(email)
		  }
		}
	  }
	}
	return emails
  }




