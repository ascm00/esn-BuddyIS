import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridEnumColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { DataGridFeed } from '@app/lib/datagrid/feed'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { renderElement, renderLeaf } from '@app/lib/plugins/rich-text/renderer/renderers'
import { RichTextRendererField } from '@app/lib/plugins/rich-text/renderer/RichTextRendererField'
import { Card, CardContent, CardFooter, CardHeader } from '@app/lib/ui/card'
import { formatDateTime, formatDateTimeShort } from '@app/lib/utils/formatting'
import { Component, FieldView, HasMany, HasRole, If, Link, EntityListSubTree, useEntity } from '@contember/interface'
import { Field } from '@contember/react-binding'
import { PencilIcon } from 'lucide-react'
import { ImageField } from '@app/lib/form'
import { ImageFieldView } from '@app/components/fieldViews/ImageFieldView'
import { GetN2NLink, WhatsappLink } from '@app/lib/utils/link'

export default () => {

	const now = new Date().toISOString()


	return (
		<>
            <Binding>
				<div className="flex flex-col gap-12">
					<>
						<HasRole role={roles => roles.has('admin') || roles.has('esnMemberRole') || roles.has('coordinator')}>
							<DataGrid entities={`Event[startDate > "${now}"]`} initialSorting={{ startDate: 'asc' }}>
								<DataGridLoader>
									<DataGridFeed>
										<EventCard />
									</DataGridFeed>
								</DataGridLoader>
							</DataGrid>
						</HasRole>
						<HasRole role="internationalStudent">
							<DataGrid entities={`Event[isForInternationalStudents=true && startDate > "${now}"]`} initialSorting={{ startDate: 'asc' }}>
								<DataGridLoader>
									<DataGridFeed>
										<EventCard />
									</DataGridFeed>
								</DataGridLoader>
							</DataGrid>
						</HasRole>
						<HasRole role="czechBuddy">
							<DataGrid entities={`Event[isForCzechBuddies=true && startDate > "${now}"]`} initialSorting={{ startDate: 'asc' }}>
								<DataGridLoader>
									<DataGridFeed>
										<EventCard />
									</DataGridFeed>
								</DataGridLoader>
							</DataGrid>
						</HasRole>
						<DataGrid entities={`N2nParty[date > "${now}"]`} initialSorting={{ date: 'asc' }}>
							<DataGridLoader>
								<DataGridFeed>
									<PartyCard />
								</DataGridFeed>
							</DataGridLoader>
						</DataGrid>
					</>
				</div>
			</Binding>
		</>
	)
}

// const N2NFeed = Component(() => {
// 	const now = new Date().toISOString()


// 	return (
// 		<>
// 			<DataGrid entities={`N2nParty[date > "${now}"]`} initialSorting={{ date: 'asc' }}>
// 			<DataGridLoader>
// 				<DataGridFeed>
// 					<PartyCard />
// 				</DataGridFeed>
// 			</DataGridLoader>
// 			</DataGrid>
// 		</>
// 	)
// }, () => (
// 	<>
// 		<EntityListSubTree entities={`N2nParty[date > "${new Date().toISOString()}"]`}>
// 			<Field field="name" />

// 		</EntityListSubTree>
// 	</>
// ))

const EventCard = Component(() => {

	const pictureUrl = useEntity().getField('picture.url').value?.toString()

	return (
	<Card className='max-w-[95%] md:max-w-[82%] mx-auto bg-white shadow-md rounded-lg'>
  
	  <CardContent className='py-4 px-6'>
		<div className='flex flex-row justify-between items-center py-4 border-b border-gray-200'>
			<div className="text-2xl font-semibold text-gray-800">
				<Field field="name" />
			</div>
			<div>
				<Link to="eventDetail(id: $entity.id)">
					<Button className=''>
						Detail
					</Button>
				</Link>
			</div>
		</div>
		<div className='flex flex-row gap-4 items-start'>
			<div className='flex-1 max-w-lg'>
				<p className='text-lg text-gray-600'>
					<strong>📅 Start</strong> <Field field='startDate' format={formatDateTimeShort} />
				</p>
				<p className='text-lg text-gray-600'>
					<strong>🏁 End</strong> <Field field='endDate' format={formatDateTimeShort} />
				</p>
				<p className='text-lg text-gray-600'>
					<strong>📍 Place</strong> <Field field='place' />
				</p>
				<p className='text-lg text-gray-600'>
					<strong>💰 Price</strong> <Field field='fee' /> {' CZK'}
				</p>
				<p className='text-lg text-gray-600'>
					<strong>🔗 WhatsApp group link:</strong> <WhatsappLink />
				</p>
			</div>
			<div className='flex-none mt-4 rounded-lg overflow-hidden w-40 h-40'>
				<img src={pictureUrl} alt="Image" className={`h-full w-full object-cover border rounded-lg`} />
			</div>
		</div>
	  </CardContent>
  
	  <CardFooter className='bg-gray-50 border-t border-gray-200 py-4 px-6'>
		<p className='text-sm text-bold text-gray-500'>
		  	<strong>Contact person</strong>
			{' '} <Field field='contactPerson.firstName' /> {' '} <Field field='contactPerson.surname' /> {' ('} <Field field='contactPerson.tenantPerson.email' /> {', '} <Field field='contactPerson.phoneNumber' />{')'}
		</p>
	  </CardFooter>
	</Card>
  )}, () => (
	<>
		<Field field='picture.url' />
		<Field field='contactPerson.firstName' />
		<Field field='contactPerson.surname' />
		<Field field='contactPerson.tenantPerson.email' />
		<Field field='contactPerson.phoneNumber' />
		<Field field='place' />
		<Field field='fee' />
		<Field field='whatToBring' />
		<Field field='startDate' />
		<Field field='endDate' />
		<Field field='name' />
		<Field field='whatsappLink' />
	</>
  ))

  const PartyCard = Component(() => {

	const pictureUrl = useEntity().getField('picture.url').value?.toString()

	return (
	<Card className='max-w-[95%] md:max-w-[82%] mx-auto bg-white shadow-md rounded-lg'>
  
	  <CardContent className='py-4 px-6'>
		<div className='flex flex-row justify-between items-center py-4 border-b border-gray-200'>
			<div className="text-2xl font-semibold text-gray-800">
				N2N: <Field field="name" />
			</div>
			<div>
				<Link to="n2nPartyDetail(id: $entity.id)">
					<Button>
						Detail
					</Button>
				</Link>
			</div>
		</div>
		<div className='flex flex-row gap-4 items-start'>
			<div className='flex-1 max-w-lg'>
				<p className='text-lg text-gray-600'>
					<strong>📅 Start</strong> <Field field='date' format={formatDateTimeShort} />
				</p>
				<p className='text-lg text-gray-600'>
					<strong>📍 Club</strong> <Field field='club' />
				</p>
				<p className='text-lg text-gray-600'>
					<strong>🔗 BOOM events link:</strong> <GetN2NLink />
				</p>
			</div>
			<div className='flex-none mt-4 rounded-lg overflow-hidden w-40 h-40'>
				<img src={pictureUrl} alt="Image" className={`h-full w-full object-cover border rounded-lg`} />
			</div>
		</div>
	  </CardContent>
  
	</Card>
  )}, () => (
	<>
		<Field field='picture.url' />
		<Field field='name' />
		<Field field='date' />
		<Field field='club' />
		<Field field='link' />
	</>
  ))
  