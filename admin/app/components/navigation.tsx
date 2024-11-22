import { Binding } from '@app/lib/binding'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@app/lib/ui/collapsible'
import { Menu, MenuButton, MenuDivider, MenuItem } from '@app/lib/ui/menu'
import { Component, EntityListSubTree, Field, HasRole, useEntityListSubTree } from '@contember/interface'
import { Activity, AlertCircle, Book, BookOpen, Building, Calendar, CalendarDays, CalendarPlus, CheckSquare, Clock, Cpu, Dot, File, FileText, GitBranch, Globe, GraduationCap, Grid, Handshake, Heart, Home, LanguagesIcon, Layout, Link2, MapPin, MessageSquare, PartyPopper, Settings, Shuffle, Smile, User, UserCheck, UserPlus, Users, Users2, UtensilsCrossed } from 'lucide-react'

export const Navigation = Component(
	() => {

	//check if applications are open for any semester. If not, user can't apply for buddy
	// let closed = true
	// const now = new Date().toISOString()
	// const semestersList = useEntityListSubTree('allSemesters')
	// for (const semester of semestersList) {
	// 	let openForCzechBuddyRegistrationsDate = semester.getField('openForCzechBuddyRegistrationsDate').value
	// 	let closeBuddyRegistrations = semester.getField('closeBuddyRegistrations').value
	// 	if ((openForCzechBuddyRegistrationsDate && closeBuddyRegistrations) && (openForCzechBuddyRegistrationsDate <= now && closeBuddyRegistrations >= now)) {
	// 		closed = false
	// 		break
	// 	}
	// }

	return (<Menu>
	<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('czechBuddy') || roles.has('coordinator')}>
		<div className='-mt-4 pb-2'>
			<MenuButton label="Apply for buddy" to="applicationCzCreate" />
		</div>
	</HasRole>
	<HasRole role={roles => roles.has('internationalStudent')}>
		<div className='-mt-4 pb-2'>
			<MenuButton label="Apply for buddy" to="applicationFrCreate" />
		</div>
	</HasRole>
	<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('czechBuddy') || roles.has('coordinator') || roles.has('internationalStudent')}>
		<MenuItem label="Home" icon={<Home className='text-blue-500' />} to="eventFeed" />
		<MenuItem label="Calendar" icon={<Calendar className='text-blue-500' />} to="calendar" />
		<MenuItem label="Events" icon={<CalendarPlus className='text-blue-500' />} to="events" />
		<MenuItem label="N2N Parties" icon={<PartyPopper className='text-blue-500' />} to="n2nParties" />
		<MenuItem label="My upcoming events" icon={<Clock className='text-blue-500' />} to="myEvents" />
	</HasRole>
	<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('czechBuddy') || roles.has('coordinator')}>
		<MenuItem label="Buddy" icon={<CheckSquare className='text-blue-500' />} to="myBuddyCz" />
		<MenuItem label="My buddy applications" icon={<FileText className='text-blue-500' />} to="myApplicationsCz" />
	</HasRole>
	<HasRole role="internationalStudent">
		<MenuItem label="My buddy" icon={<CheckSquare className='text-blue-500' />} to="myBuddy" />
		<MenuItem label="My buddy application" icon={<FileText className='text-blue-500' />} to="myApplicationFr" />
	</HasRole>
	<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('czechBuddy') || roles.has('coordinator') || roles.has('internationalStudent')}>
		<MenuItem label="Profile" icon={<User className='text-blue-500' />} to="profile" />
	</HasRole>
	<HasRole role={roles => roles.has('admin') || roles.has('esnMember')}>
		<MenuItem label="Users" icon={<Users className='text-blue-500' />} to="users" />
	</HasRole>

	<HasRole role={roles => roles.has('admin') || roles.has('coordinator')}>
		<MenuDivider />
		<MenuItem label="Local applications" icon={<Handshake className='text-blue-500' />} to="applicationCzs" />
		<MenuItem label="Foreign applications" icon={<Handshake className='text-blue-500' />} to="applicationFrs" />
		<Collapsible>
				<CollapsibleTrigger>Coordinating</CollapsibleTrigger>
				<CollapsibleContent>
					<MenuItem label="All buddy pairs" icon={<Users className='text-blue-500' />} to="buddyPairs" />
					<MenuItem label="My buddy pairs" icon={<Users2 className='text-blue-500' />} to="myBuddyPairs" />		
				</CollapsibleContent>
		</Collapsible>
		<HasRole role={roles => roles.has('admin')}>
			<Collapsible>
				<CollapsibleTrigger>Coupling</CollapsibleTrigger>
				<CollapsibleContent>
					<MenuItem label="Manual pairing" icon={<Shuffle className='text-blue-500' />} to="buddyPairCreate" />
					<MenuItem label="Automatic pairing" icon={<Cpu className='text-blue-500' />} to="automaticPairing" />
					<MenuItem label="Automatic coordinator assignment" icon={<Cpu className='text-blue-500' />} to="automaticCoordinatorAssignment" />
				</CollapsibleContent>
			</Collapsible>
		</HasRole>
	</HasRole>

	<HasRole role="ozsRole">
		<MenuItem label="Local applications" icon={<Handshake className='text-blue-500' />} to="applicationCzs" />
		<MenuItem label="Foreign applications" icon={<Handshake className='text-blue-500' />} to="applicationFrs" />
		<MenuItem label="All buddy pairs" icon={<Users className='text-blue-500' />} to="buddyPairs" />
	</HasRole>
	
	<HasRole role={roles => roles.has('admin')}>
		<MenuDivider />
		{/* <MenuItem label="Settings" icon={<Settings className='text-blue-500' />}>
			<MenuItem label="Semester" icon={<Clock className='text-blue-500' />} to="semesters" />
			<MenuItem label="Study Programs" icon={<GraduationCap className='text-blue-500' />} to="studyPrograms" />
			<MenuItem label="Partner universities" icon={<Building className='text-blue-500' />} to="universities" />
			<MenuItem label="Faculties at VSE" icon={<BookOpen className='text-blue-500' />} to="faculties" />
			<MenuItem label="Sections" icon={<Grid className='text-blue-500' />} to="sections" />
			<MenuItem label="Countries" icon={<MapPin className='text-blue-500' />} to="countries" />
			<MenuItem label="Dietary Restrictions" icon={<UtensilsCrossed className='text-blue-500' />} to="" />
			<MenuItem label="Allergies" icon={<AlertCircle className='text-blue-500' />} to="" /> */}
			{/* <MenuItem label="Languages" icon={<MessageSquare className='text-blue-500' />} to="languages" />
			<MenuItem label="Hobbies" icon={<Heart className='text-blue-500' />} to="hobbies" />
			<MenuItem label="Limitations" to="limitations" />
			<MenuItem label="Sports" icon={<Activity className='text-blue-500' />} to="sports" /> */}
		{/* </MenuItem> */}
		<Collapsible>
				<CollapsibleTrigger>Settings</CollapsibleTrigger>
				<CollapsibleContent>
					<MenuItem label="Semester" icon={<Clock className='text-blue-500' />} to="semesters" />
					<MenuItem label="Study Programs" icon={<GraduationCap className='text-blue-500' />} to="studyPrograms" />
					<MenuItem label="Partner universities" icon={<Building className='text-blue-500' />} to="universities" />
					<MenuItem label="Faculties at VSE" icon={<BookOpen className='text-blue-500' />} to="faculties" />
					<MenuItem label="Processes" icon={<Grid className='text-blue-500' />} to="sections" />
					<MenuItem label="Countries" icon={<MapPin className='text-blue-500' />} to="countries" />
					<MenuItem label="Languages" icon={<LanguagesIcon className='text-blue-500' />} to="languages" />
					<MenuItem label="Dietary Restrictions" icon={<UtensilsCrossed className='text-blue-500' />} to="dietaryRestrictions" />
					<MenuItem label="Allergies" icon={<AlertCircle className='text-blue-500' />} to="allergies" />
				</CollapsibleContent>
		</Collapsible>
	</HasRole>

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
