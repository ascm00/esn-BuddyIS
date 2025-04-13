import { Binding } from '@app/lib/binding'
import { DataGridFeed } from '@app/lib/datagrid/feed'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { formatDateTimeShort } from '@app/lib/utils/formatting'
import { Component, FieldView, HasMany, HasRole, If, Link, EntityListSubTree, useEntity, useEntityListSubTree, EntityAccessor, identityEnvironmentExtension, EntitySubTree, useEntitySubTree } from '@contember/interface'
import { Field } from '@contember/react-binding'
import { CalendarIcon, MapPinIcon, TagIcon, PhoneIcon, MailIcon, ExternalLinkIcon, Link2 } from 'lucide-react'
import { GetN2NLinkFromString, GoogleMapsLinkFromString, WhatsappLinkFromString } from '@app/lib/utils/link'
import { BackButton } from '@app/lib/buttons'

export default () => {
  return (
    <>
      <Slots.Title>Upcoming events 🎈</Slots.Title>
      <Slots.Back>
					<BackButton />
			</Slots.Back>
      <Binding>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AllEventsFeed />
        </div>
      </Binding>
    </>
  )
}

const AllEventsFeed = Component(() => {
  const n2nPartiesForESNMembers = Array.from(useEntityListSubTree('n2nParties'))
  const eventsESNMembers = Array.from(useEntityListSubTree('events'))
  const firstName = useEntitySubTree('currentUser').getField<string>('firstName').value ?? undefined

  const allEvents = eventsESNMembers.map((buddyEvent, index) => ({
    id: index,
    type: 'event',
    identity: `${buddyEvent.getField<string>('id').value}`,
    title: `${buddyEvent.getField<string>('name').value?.toString()}`,
    place: `${buddyEvent.getField<string>('place').value?.toString()}`,
    start: new Date(buddyEvent.getField<string>('startDate').value!),
    end: new Date(buddyEvent.getField<string>('endDate').value!),
    price: `${buddyEvent.getField<number>('fee').value?.toString()}`,
	contactPersonId: `${buddyEvent.getField<string>('contactPerson.id').value?.toString() ?? ''}`,
    contactPerson: `${(buddyEvent.getField<string>('contactPerson.firstName').value?.toString() && buddyEvent.getField<string>('contactPerson.firstName').value?.toString() + ' ') ?? ''}${buddyEvent.getField<string>('contactPerson.surname').value?.toString() ?? ''}`,
    contactPhone: `${buddyEvent.getField<string>('contactPerson.phoneNumber').value?.toString() ?? ''}`,
    contactEmail: `${buddyEvent.getField<string>('contactPerson.tenantPerson.email').value?.toString() ?? ''}`,
    pictureUrl: `${buddyEvent.getField<string>('picture.url').value ?? '/esn_star.png'}`,
    whatsappLink: `${buddyEvent.getField<string>('whatsappLink').value}`,
    link: `${buddyEvent.getField<string>('mapLink').value}`,
  })).concat(n2nPartiesForESNMembers.map((party, index) => ({
    id: index,
    type: 'party',
    identity: `${party.getField<string>('id').value?.toString()}`,
    title: `N2N: ${party.getField('name').value?.toString()}`,
    place: `${party.getField<string>('club').value?.toString()}`,
    start: new Date(party.getField<string>('date').value!),
    end: new Date(party.getField<string>('date').value!),
    price: '0',
	contactPersonId: ``,
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    pictureUrl: `${party.getField<string>('picture.url').value ?? '/esn_star.png'}`,
    whatsappLink: '',
    link: `${party.getField<string>('link').value?.toString()}`,
  }))).sort((a, b) => a.start.getTime() - b.start.getTime())

  if(allEvents.length === 0) {
    return (
      <div className="mt-4 mb-8">
        <div className="p-6 border border-gray-200 rounded-lg bg-blue-50 shadow-sm">
          <h2 className="text-2xl font-bold text-blue-800 mb-3">Welcome to Buddy IS, {firstName || 'student'}! 👋</h2>
          <p className="text-gray-700 mb-2">🤗 We're thrilled to have you on board! Right now, there aren't any events listed, but once they're ready, you'll find them here. Stay tuned!</p>
          <p className="text-gray-600">⚠️ If you encounter any technical issues in the system, reach out to <a href="mailto:helpdesk@esnvseprague.cz" className='text-blue-600 hover:underline'>helpdesk@esnvseprague.cz</a>.</p>
        </div>
      </div>
    )
  } else {
    return (
      <>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allEvents.map(event => (
            <div key={`${event.type}-${event.identity}`}>
              {event.type === 'party' && <PartyCard event={event} />}
              {event.type === 'event' && <EventCard event={event} />}
            </div>
          ))}
        </div>
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

const EventCard = Component(({event}: {event?: any}) => {
  const formattedDate = formatDateTimeShort(event.start.toISOString())
  
  return (
    <div className="group rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 transition-all hover:shadow-lg">
      <div className="relative overflow-hidden h-48">
        <img 
          src={event.pictureUrl} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full h-16 flex items-end">
          <div className="px-4 py-2">
            <span className="inline-block bg-white text-gray-800 rounded-full px-3 py-1 text-xs font-medium">Event</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
        
        <div className="space-y-1.5 mb-4">
          <p className="flex items-center text-sm text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
            {formattedDate}
          </p>
          <p className="flex items-center text-sm text-gray-600">
            <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
            <GoogleMapsLinkFromString place={event.place} link={event.link} />
          </p>
		  <p className="flex items-center text-sm text-gray-600">
            <WhatsappLinkFromString link={event.whatsappLink} text='WhatsApp group link' />
          </p>
          <p className="flex items-center text-sm text-gray-600">
            <TagIcon className="h-4 w-4 mr-2 text-gray-400" />
            {event.price} CZK
          </p>
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            {event.contactPerson && (
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center mr-2">
                  <span className="text-xs">{event.contactPerson.charAt(0)}</span>
                </div>
                <Link to={`userDetail(id: "${event.contactPersonId}")`}><a>{event.contactPerson}</a></Link>
              </div>
            )}
          </div>
          
          <Link to={`eventDetail(id : '${event.identity}')`}>
            <Button variant="outline" size="sm" className="rounded-full border-blue-500 text-blue-600 hover:bg-blue-50">
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
})

const PartyCard = Component(({event}: {event?: any}) => {
  const formattedDate = formatDateTimeShort(event.start.toISOString())
  
  return (
    <div className="group rounded-xl overflow-hidden bg-white shadow-md border border-gray-200 transition-all hover:shadow-lg">
      <div className="relative overflow-hidden h-48">
        <img 
          src={event.pictureUrl} 
          alt={event.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full h-16 flex items-end">
          <div className="px-4 py-2">
            <span className="inline-block bg-indigo-500 text-white rounded-full px-3 py-1 text-xs font-medium">N2N Party</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
        
        <div className="space-y-1.5 mb-4">
          <p className="flex items-center text-sm text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-400" />
            {formattedDate}
          </p>
          <p className="flex items-center text-sm text-gray-600">
            <MapPinIcon className="h-4 w-4 mr-2 text-gray-400" />
            <GoogleMapsLinkFromString place={event.place} link={event.link} />
          </p>
          {event.link && (
            <p className="flex items-center text-sm text-blue-600 hover:underline">
              <ExternalLinkIcon className="h-4 w-4 mr-2 text-blue-400" />
              <GetN2NLinkFromString link={event.link} text="Tickets" />
            </p>
          )}
        </div>
        
        <div className="flex justify-end items-center pt-3 border-t border-gray-100">
          <Link to={`n2nPartyDetail(id : '${event.identity}')`}>
            <Button variant="outline" size="sm" className="rounded-full border-indigo-500 text-indigo-600 hover:bg-indigo-50">
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
})