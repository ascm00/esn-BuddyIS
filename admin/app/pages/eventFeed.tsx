import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridEnumColumn, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { DataGridFeed } from '@app/lib/datagrid/feed'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { renderElement, renderLeaf } from '@app/lib/plugins/rich-text/renderer/renderers'
import { RichTextRendererField } from '@app/lib/plugins/rich-text/renderer/RichTextRendererField'
import { Card, CardContent, CardFooter, CardHeader } from '@app/lib/ui/card'
import { formatDateTime } from '@app/lib/utils/formatting'
import { Component, FieldView, HasMany, HasRole, If, Link, EntityListSubTree } from '@contember/interface'
import { Field } from '@contember/react-binding'
import { PencilIcon } from 'lucide-react'
import { ImageField } from '@app/lib/form'
import { ImageFieldView } from '@app/components/fieldViews/ImageFieldView'

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

const EventCard = Component(() => (
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
		<p className='text-lg text-gray-600'>
		  <strong>📅 Start</strong> <Field field='startDate' format={formatDateTime} />
		</p>
		<p className='text-lg text-gray-600'>
		  <strong>🏁 End</strong> <Field field='endDate' format={formatDateTime} />
		</p>
		<p className='text-lg text-gray-600'>
		  <strong>📍 Where?</strong> <Field field='place' />
		</p>
		<p className='text-lg text-gray-600'>
		  <strong>🎒 What to bring?</strong> <Field field='whatToBring' />
		</p>
		<p className='text-lg text-gray-600'>
		  <strong>💰 Price</strong> <Field field='fee' /> {' CZK'}
		</p>
		{/* <p className='text-lg text-gray-600'>
		  <strong>🔗 WhatsApp Group Link:</strong>
		</p> */}
		<div className='prose mt-4 mb-4'>
		  <Field field='description' />
		</div>
		<div className='max-w-full mt-4 rounded-lg overflow-hidden'>
		  <ImageFieldView width={300} height={200} />
		</div>
	  </CardContent>
  
	  <CardFooter className='bg-gray-50 border-t border-gray-200 py-4 px-6'>
		<p className='text-sm text-bold text-gray-500'>
		  	<strong>Contact person</strong>
			{' '} <Field field='contactPerson.firstName' /> {' '} <Field field='contactPerson.surname' /> {' ('} <Field field='contactPerson.tenantPerson.email' /> {', '} <Field field='contactPerson.phoneNumber' />{')'}
		</p>
	  </CardFooter>
	</Card>
  ))

  const PartyCard = Component(() => (
	<Card className='max-w-[95%] md:max-w-[82%] mx-auto bg-white shadow-md rounded-lg'>
  
	  <CardContent className='py-4 px-6'>
		<div className='flex flex-row justify-between items-center py-4 border-b border-gray-200'>
			<div className="text-2xl font-semibold text-gray-800">
				<Field field="name" />
			</div>
			<div>
				<Link to="n2nPartyDetail(id: $entity.id)">
					<Button>
						Detail
					</Button>
				</Link>
			</div>
		</div>
		<p className='text-lg text-gray-600'>
		  <strong>📅 Start</strong> <Field field='date' format={formatDateTime} />
		</p>
		<p className='text-lg text-gray-600'>
		  <strong>📍 Club</strong> <Field field='club' />
		</p>
		{/* <p className='text-lg text-gray-600'>
		  <strong>🔗 BOOM Events Link:</strong>
		</p> */}
		<div className='prose mt-4 mb-4'>
		  <Field field='description' />
		</div>
		<div className='max-w-full mt-4 rounded-lg overflow-hidden'>
		  <ImageFieldView width={300} height={200} />
		</div>
	  </CardContent>
  
	</Card>
  ))
  