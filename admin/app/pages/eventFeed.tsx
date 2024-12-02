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
import { Component, FieldView, HasMany, HasRole, If, Link, EntityListSubTree, useEntity, useEntityListSubTree, EntityAccessor, identityEnvironmentExtension, EntitySubTree, useEntitySubTree } from '@contember/interface'
import { Field } from '@contember/react-binding'
import { PencilIcon } from 'lucide-react'
import { ImageField } from '@app/lib/form'
import { ImageFieldView } from '@app/components/fieldViews/ImageFieldView'
import { GetN2NLink, GetN2NLinkFromString, GoogleMapsLink, GoogleMapsLinkFromString, WhatsappLink, WhatsappLinkFromString } from '@app/lib/utils/link'
import { identity$ } from '@contember/graphql-client-tenant'
import { start } from 'slate'

export default () => {

	const now = new Date().toISOString()


	return (
		<>
            <Binding>
				<div className="flex flex-col gap-12">
					<>
						<AllEventsFeed />
					</>
				</div>
			</Binding>
		</>
	)
}

const AllEventsFeed = Component(() => {

	const n2nPartiesForESNMembers = Array.from(useEntityListSubTree('n2nParties'))
	const eventsESNMembers = Array.from(useEntityListSubTree('events'))
	const firstName = useEntitySubTree('currentUser').getField<string>('firstName').value ?? undefined
	console.log(firstName)

	const allEvents = eventsESNMembers.map((buddyEvent, index) => ({
		id: index,
		type: 'event',
		identity: `${buddyEvent.getField<string>('id').value}`,
		title: `${buddyEvent.getField<string>('name').value?.toString()}`,
		place: `${buddyEvent.getField<string>('place').value?.toString()}`,
		start: new Date(buddyEvent.getField<string>('startDate').value!),
		end: new Date(buddyEvent.getField<string>('endDate').value!),
		price: `${buddyEvent.getField<number>('fee').value?.toString()}`,
		contactPerson: `${(buddyEvent.getField<string>('contactPerson.firstName').value?.toString() && buddyEvent.getField<string>('contactPerson.firstName').value?.toString() + ' ') ?? ''}${buddyEvent.getField<string>('contactPerson.surname').value?.toString() ?? ''}`,
		contactPhone: `${buddyEvent.getField<string>('contactPerson.phoneNumber').value?.toString() ?? ''}`,
		contactEmail: `${buddyEvent.getField<string>('contactPerson.tenantPerson.email').value?.toString() ?? ''}`,
		pictureUrl: `${buddyEvent.getField<string>('picture.url').value ?? '/esn_star.png'}`,
		whatsappLink: `${buddyEvent.getField<string>('whatsappLink').value}`,
		link: `${buddyEvent.getField<string>('mapLink').value}`, //for events - link is mapLink
	})).concat(n2nPartiesForESNMembers.map((party, index) => ({
		id: index,
		type: 'party',
		identity: `${party.getField<string>('id').value?.toString()}`,
		title: `N2N: ${party.getField('name').value?.toString()}`,
		place: `${party.getField<string>('club').value?.toString()}`,
		start: new Date(party.getField<string>('date').value!),
		end: new Date(party.getField<string>('date').value!),
		price: '0',
		contactPerson: '',
		contactPhone: '',
		contactEmail: '',
		pictureUrl: `${party.getField<string>('picture.url').value ?? '/esn_star.png'}`,
		whatsappLink: '',
		link: `${party.getField<string>('link').value?.toString()}`, // for N2N parties - link is tickets link
	}))).sort((a, b) => a.start.getTime() - b.start.getTime())


	
	if(allEvents.length===0){
		return (
			<div className="mb-6">
				<div className="p-4 border border-gray-300 rounded-md bg-blue-100">
					<h2 className="text-xl font-bold text-blue-800">Welcome to Buddy IS, {firstName || 'student'}! 👋</h2>
					<p className="text-gray-700">🤗 We’re thrilled to have you on board! Right now, there aren’t any events listed, but once they’re ready, you’ll find them here. Stay tuned!</p>
					<p className="text-gray-500">⚠️ If you encounter any technical issues in the system, reach out to <a href="mailto:helpdesk@esnvseprague.cz" className='text-blue-600'>helpdesk@esnvseprague.cz</a>.</p>
				</div>
			</div>
		)
	} else {
		return (
			<>
				<DataGridFeed>
					{allEvents.map(event => (
						<>
							{event.type === 'party' && 
								<div className="mb-6">
									<PartyCard2 event={event} />
								</div>
							}
							{event.type === 'event' && 
								<div className="mb-6">
									<EventCard2 event={event} /> 
								</div>
							}
						</>
					))}
				</DataGridFeed>
			</>
		)
	}
}, (_, env) => (
	<>
	<Binding>
		<EntitySubTree
			entity={`Person(tenantPerson.id='${env.getExtension(identityEnvironmentExtension).identity?.person?.id}')`}
			alias={'currentUser'}
		>
			<Field field={'firstName'} />
		</EntitySubTree>
		<EntityListSubTree entities={`N2nParty[date > "${new Date().toISOString()}"]`} alias={'n2nParties'}>
			<Field field={'id'} />
			<Field field="name" />
			<Field field="club" />
			<Field field="date" />
			<Field field="picture.url" />
			<Field field="link" />
		</EntityListSubTree>
		<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator') || roles.has('ozsRole')}>
			<EntityListSubTree entities={`Event[startDate > "${new Date().toISOString()}"]`} alias={'events'}>
				<Field field={'id'} />
				<Field field="name" />
				<Field field="place" />
				<Field field="mapLink" />
				<Field field="startDate" />
				<Field field="endDate" />
				<Field field="fee" />
				<Field field="contactPerson.firstName" />
				<Field field="contactPerson.surname" />
				<Field field='contactPerson.phoneNumber' />
				<Field field='contactPerson.tenantPerson.email' />
				<Field field="picture.url" />
				<Field field="whatsappLink" />
			</EntityListSubTree>
		</HasRole>
		<HasRole role={'internationalStudent'}>
			<EntityListSubTree entities={`Event[isForInternationalStudents=true && startDate > "${new Date().toISOString()}"]`} alias={'events'}>
				<Field field={'id'} />
				<Field field="name" />
				<Field field="place" />
				<Field field="mapLink" />
				<Field field="startDate" />
				<Field field="endDate" />
				<Field field="fee" />
				<Field field="contactPerson.firstName" />
				<Field field="contactPerson.surname" />
				<Field field='contactPerson.phoneNumber' />
				<Field field='contactPerson.tenantPerson.email' />
				<Field field="picture.url" />
				<Field field="whatsappLink" />
			</EntityListSubTree>
		</HasRole>
		<HasRole role={'czechBuddy'}>
			<EntityListSubTree entities={`Event[isForCzechBuddies=true && startDate > "${new Date().toISOString()}"]`} alias={'events'}>
				<Field field={'id'} />
				<Field field="name" />
				<Field field="place" />
				<Field field="mapLink" />
				<Field field="startDate" />
				<Field field="endDate" />
				<Field field="fee" />
				<Field field="contactPerson.firstName" />
				<Field field="contactPerson.surname" />
				<Field field='contactPerson.phoneNumber' />
				<Field field='contactPerson.tenantPerson.email' />
				<Field field="picture.url" />
				<Field field="whatsappLink" />
			</EntityListSubTree>
		</HasRole>
	</Binding>
	</>
))

  const EventCard2 = Component(({event}: {event?: any}) => {

	console.log(event.pictureUrl)
	console.log(typeof(event.pictureUrl))
	if(event.pictureUrl){
		console.log('hellooo')
	}

	return (
	<Card className='max-w-[95%] md:max-w-[82%] mx-auto bg-white shadow-md rounded-lg'>
  
	  <CardContent className='py-4 px-6'>
		<div className='flex flex-row justify-between items-center py-4 border-b border-gray-200'>
			<div className="text-2xl font-semibold text-gray-800">
				{event.title}
			</div>
			<div>
				<Link to={`eventDetail(id : '${event.identity}')`}>
					<Button>
						Detail
					</Button>
				</Link>
			</div>
		</div>
		<div className='flex flex-col md:flex-row gap-4 items-start'>
			<div className='flex-1 max-w-lg'>
				<p className='text-lg text-gray-600'>
					<strong>📅 Start</strong> {formatDateTimeShort(event.start.toISOString())}
				</p>
				<p className='text-lg text-gray-600'>
					<strong>🏁 End</strong> {formatDateTimeShort(event.end.toISOString())}
				</p>
				<p className='text-lg text-gray-600'>
					<strong>📍 Place</strong> <GoogleMapsLinkFromString place={event.place} link={event.link} />
				</p>
				<p className='text-lg text-gray-600'>
					<strong>💰 Price</strong> {event.price} {' CZK'}
				</p>
				<p className='text-lg text-gray-600'>
					<WhatsappLinkFromString link={event.whatsappLink} text='🔗 WhatsApp group link' />
				</p>
			</div>
			{event.pictureUrl &&
				<div className='flex-none mt-4 rounded-lg overflow-hidden w-3/4 md:w-40 aspect-square mx-auto'>
					<img src={event.pictureUrl} alt="Image" className={`h-full w-full object-cover border rounded-lg`} />
				</div>
  			}
		</div>
	  </CardContent>
  
	{ event.contactPerson &&
	  <CardFooter className='bg-gray-50 border-t border-gray-200 py-4 px-6'>
		{event.contactPhone &&
		<p className='text-sm text-bold text-gray-500'>
		  	<strong>Contact person</strong>
			{' '} {event.contactPerson} {' ('} {event.contactEmail} {', '} {event.contactPhone} {')'}
		</p>
  		}
		{!event.contactPhone &&
		<p className='text-sm text-bold text-gray-500'>
		  	<strong>Contact person</strong>
			{' '} {event.contactPerson} {' ('}{event.contactEmail}{')'}
		</p>
  		}
	  </CardFooter>
  	}
	</Card>
  )})

  const PartyCard2 = Component(({event}: {event?: any}) => {

	return (
	<Card className='max-w-[95%] md:max-w-[82%] mx-auto bg-white shadow-md rounded-lg'>
  
	  <CardContent className='py-4 px-6'>
		<div className='flex flex-row justify-between items-center py-4 border-b border-gray-200'>
			<div className="text-2xl font-semibold text-gray-800">
				{event.title}
			</div>
			<div>
				<Link to={`n2nPartyDetail(id : '${event.identity}')`}>
					<Button>
						Detail
					</Button>
				</Link>
			</div>
		</div>
		<div className='flex flex-col md:flex-row gap-4 items-start'>
			<div className='flex-1 max-w-lg'>
				<p className='text-lg text-gray-600'>
					<strong>📅 Start</strong> {formatDateTimeShort(event.start.toISOString())}
				</p>
				<p className='text-lg text-gray-600'>
					<strong>📍 Club</strong> {event.place}
				</p>
				<p className='text-lg text-gray-600'>
					<GetN2NLinkFromString link={event.link} text='🔗 Tickets link' />
				</p>
			</div>
			{event.pictureUrl &&
				<div className='flex-none mt-4 rounded-lg overflow-hidden w-3/4 md:w-40 aspect-square mx-auto'>
					<img src={event.pictureUrl} alt="Image" className={`h-full w-full object-cover border rounded-lg`} />
				</div>
  			}
		</div>
	  </CardContent>
  
	</Card>
  )})