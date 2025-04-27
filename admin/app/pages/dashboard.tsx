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

import EventFeed, { AllEventsFeed } from './eventFeed'
import MyBuddy, { BuddyView } from './myBuddy'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@app/lib/ui/tabs'
import MyBuddyCz, { MoreBuddiesView } from './myBuddyCz'

export default () => {
  return (
    <>
      <Slots.Title>Home</Slots.Title>
      <Slots.Back>
					<BackButton />
			</Slots.Back>
      <Binding>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Tabs defaultValue="events" className="space-y-4">
          <TabsList>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="tasks">Buddy</TabsTrigger>
          </TabsList>
          <TabsContent value="events" className="space-y-4">
            <div className="">
              <div className='text-xl font-semibold py-3'>Upcoming events</div>
              <AllEventsFeed />
            </div>
          </TabsContent>
          <TabsContent value="tasks" className="space-y-4">
            <div className="">
                <div className='text-xl font-semibold py-3'>My buddy</div>
              <HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('czechBuddy') || roles.has('esnMember')}>
                <MoreBuddiesView />
              </HasRole>
              <HasRole role={roles => roles.has('internationalStudent')}>
                <BuddyView />
              </HasRole>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </Binding>
    </>
  )
}