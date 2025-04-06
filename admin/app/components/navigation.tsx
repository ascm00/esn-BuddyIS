import { Binding } from '@app/lib/binding'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@app/lib/ui/collapsible'
import { Menu, MenuButton, MenuDivider, MenuItem, MenuItemExternal } from '@app/lib/ui/menu'
import { useSidebar } from '@app/lib/ui/sidebar'
import { Button } from '@app/lib/ui/button'
import { Component, EntityListSubTree, Field, HasRole, LogoutTrigger, useEntityListSubTree } from '@contember/interface'
import { Activity, AlertCircle, Book, BookOpen, Building, Calendar, CalendarDays, CalendarPlus, CheckSquare, Clock, Cpu, Dot, File, FileText, GitBranch, Globe, GraduationCap, Grid, Handshake, Heart, Home, LanguagesIcon, Layout, LayoutDashboard, Lightbulb, Link2, List, LogOutIcon, MapPin, MessageSquare, PartyPopper, Settings, Shuffle, Smile, User, UserCheck, UserCircle, UserPlus, Users, Users2, UtensilsCrossed } from 'lucide-react'
import { dict } from '@app/lib/dict'

export const Navigation = Component(
	() => {
	const { state } = useSidebar()

	return (<Menu>
	<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('czechBuddy') || roles.has('coordinator')}>
		<div className='pb-2'>
			<MenuButton label="Apply for buddy" to="applicationCzCreate" />
		</div>
	</HasRole>
	<HasRole role={roles => roles.has('internationalStudent')}>
		<div className='pb-2'>
			<MenuButton label="Apply for buddy" to="applicationFrCreate" />
		</div>
	</HasRole>
	<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('czechBuddy') || roles.has('coordinator') || roles.has('internationalStudent')}>
		<MenuItem label="Home" icon={<Home className='text-blue-500' />} to="eventFeed" />
		<MenuItem label="Events" icon={<CalendarPlus className='text-blue-500' />} to={'index'}>
			<MenuItem label="All events" icon={<LayoutDashboard className='text-blue-500' />} to={'index'} />
			<MenuItem label="Calendar" icon={<Calendar className='text-blue-500' />} to="calendar" />
			<MenuItem label="My upcoming events" icon={<Clock className='text-blue-500' />} to="myEvents" />
			<MenuItem label="Event list" icon={<List className='text-blue-500' />} to={'events'} />
			<MenuItem label="N2N Party list" icon={<List className='text-blue-500' />} to="n2nParties" />
		</MenuItem>
	</HasRole>
	<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('czechBuddy') || roles.has('coordinator')}>
		<MenuItem label="Buddy" icon={<UserPlus className='text-blue-500' />}>
			<MenuItem label="My buddy" icon={<CheckSquare className='text-blue-500' />} to="myBuddyCz" />
			<MenuItem label="My buddy applications" icon={<FileText className='text-blue-500' />} to="myApplicationsCz" />
		</MenuItem>
	</HasRole>
	<HasRole role="internationalStudent">
		<MenuItem label="My buddy" icon={<CheckSquare className='text-blue-500' />} to="myBuddy" />
		<MenuItem label="My buddy application" icon={<FileText className='text-blue-500' />} to="myApplicationFr" />
	</HasRole>
	<MenuItemExternal label="Trip tips" icon={<Lightbulb className='text-blue-500' />} to="https://grey-cabbage-5c9.notion.site/Welcome-to-TripTip-1189c74d1bea8025bec8cc0fc36b1f7c" />
	<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('czechBuddy') || roles.has('coordinator') || roles.has('internationalStudent')}>
		<MenuItem label="Profile" icon={<UserCircle className='text-blue-500' />} to="profile" />
	</HasRole>

	<HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('esnMember')}>
		<MenuDivider />
		<MenuItem label="Users" icon={<Users className='text-blue-500' />} to="users" />
		<HasRole role={roles => roles.has('admin') || roles.has('coordinator')}>
			<MenuItem label="Local applications" icon={<Handshake className='text-blue-500' />} to="applicationCzs" />
			<MenuItem label="Foreign applications" icon={<Handshake className='text-blue-500' />} to="applicationFrs" />
			<MenuItem label="Coordinating" icon={<Users className='text-blue-500' />}>
				<MenuItem label="All buddy pairs" to="buddyPairs" />
				<MenuItem label="My buddy pairs" to="myBuddyPairs" />
			</MenuItem>
		</HasRole>
	</HasRole>
	<HasRole role={roles => roles.has('admin')}>
		<MenuItem label="Coupling" icon={<UserCheck className='text-blue-500' />}>
			<MenuItem label="Manual pairing" to="buddyPairCreate" />
			<MenuItem label="Automatic pairing" to="automaticPairing" />
			<MenuItem label="Automatic coordinator assignment" to="automaticCoordinatorAssignment" />
		</MenuItem>
	</HasRole>

	<HasRole role="ozsRole">
		<MenuItem label="Local applications" icon={<Handshake className='text-blue-500' />} to="applicationCzs" />
		<MenuItem label="Foreign applications" icon={<Handshake className='text-blue-500' />} to="applicationFrs" />
		<MenuItem label="All buddy pairs" icon={<Users className='text-blue-500' />} to="buddyPairs" />
	</HasRole>
	
	<HasRole role={roles => roles.has('admin')}>
		<MenuDivider />
		<MenuItem label="Settings" icon={<Settings className='text-blue-500' />} to="settings">
			<MenuItem label="Semester" icon={<Clock className='text-blue-500' />} to="semesters" />
			<MenuItem label="Study Programs" icon={<GraduationCap className='text-blue-500' />} to="studyPrograms" />
			<MenuItem label="Partner universities" icon={<Building className='text-blue-500' />} to="universities" />
			<MenuItem label="Faculties at VSE" icon={<BookOpen className='text-blue-500' />} to="faculties" />
			<MenuItem label="Processes" icon={<Grid className='text-blue-500' />} to="sections" />
			<MenuItem label="Countries" icon={<MapPin className='text-blue-500' />} to="countries" />
			<MenuItem label="Languages" icon={<LanguagesIcon className='text-blue-500' />} to="languages" />
			<MenuItem label="Dietary Restrictions" icon={<UtensilsCrossed className='text-blue-500' />} to="dietaryRestrictions" />
			<MenuItem label="Allergies" icon={<AlertCircle className='text-blue-500' />} to="allergies" />
		</MenuItem>
	</HasRole>
	{state === 'collapsed' && (
		<LogoutTrigger>
			<Button variant={'link'} size="sm" className="gap-2">
				<LogOutIcon className="w-3 h-3 text-gray-500" />
			</Button>
		</LogoutTrigger>
	)}
	{state !== 'collapsed' && (
		<div className='margin-auto'>
			<LogoutTrigger>
				<Button variant={'link'} size="sm" className="gap-2">
					<LogOutIcon className="w-3 h-3 text-gray-500" /> {dict.logout}
				</Button>
			</LogoutTrigger>
		</div>
	)}

</Menu>)
}
// }, () => (
// 	<>
// 	<Binding>
// 		<>
// 			<EntityListSubTree
// 				entities={`Semester`}
// 				alias={'allSemesters'}
// 			>
// 				<Field field="name" />
// 				<Field field="openForCzechBuddyRegistrationsDate" />
// 				<Field field="closeBuddyRegistrations" />
// 			</EntityListSubTree>
// 		</>
// 	</Binding>
// 	</>
// )
)
