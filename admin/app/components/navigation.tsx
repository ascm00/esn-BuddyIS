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
	<HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('czechBuddy')}>
		<div className='-mt-4 pb-2'>
			<MenuButton label="Apply for buddy" to="applicationCzCreate" />
		</div>
	</HasRole>
	<HasRole role={roles => roles.has('internationalStudent')}>
		<div className='-mt-4 pb-2'>
			<MenuButton label="Apply for buddy" to="applicationFrCreate" />
		</div>
	</HasRole>
	<MenuItem label="Home" icon={<Home />} to="eventFeed" />
	<MenuItem label="Events calendar" icon={<Calendar />} to="calendar" />
	<HasRole role={roles => roles.has('admin') || roles.has('esnMemberRole')}>
		<MenuItem label="Events" icon={<Calendar />} to="events" />
	</HasRole>
	<HasRole role={roles => roles.has('admin') || roles.has('esnMemberRole') || roles.has('czechStudent') || roles.has('coordinator')}>
		<MenuItem label="Buddy" icon={<CheckSquare />} to="myBuddyCz" />
	</HasRole>
	<HasRole role="internationalStudent">
		<MenuItem label="Buddy" icon={<CheckSquare />} to="myBuddy" />
	</HasRole>
	<MenuItem label="N2N" icon={<PartyPopper />} to="n2nParties" />
	<MenuItem label="Profile" icon={<User />} to="" />
	<HasRole role={roles => roles.has('admin') || roles.has('esnMember')}>
		<MenuItem label="Users" icon={<Users />} to="users" />
	</HasRole>

	<HasRole role={roles => roles.has('admin') || roles.has('coordinator')}>
		<MenuDivider />
		
		<MenuItem label="CZ Applications" icon={<Handshake />} to="applicationCzs" />
		<MenuItem label="FR Applications" icon={<Handshake />} to="applicationFrs" />
		<Collapsible>
				<CollapsibleTrigger>Coordinating</CollapsibleTrigger>
				<CollapsibleContent>
					<HasRole role={roles => roles.has('admin')}>
						<MenuItem label="All buddy pairs" icon={<Users />} to="buddyPairs" />
					</HasRole>
					<MenuItem label="My buddy pairs" icon={<Users2 />} to="myBuddyPairs" />		
				</CollapsibleContent>
		</Collapsible>
		<HasRole role={roles => roles.has('admin')}>
			<Collapsible>
				<CollapsibleTrigger>Coupling</CollapsibleTrigger>
				<CollapsibleContent>
					<MenuItem label="Manual pairing" icon={<Shuffle />} to="buddyPairCreate" />
					<MenuItem label="Automatic pairing" icon={<Cpu />} to="buddyPairCreate" />
				</CollapsibleContent>
			</Collapsible>
		</HasRole>
	</HasRole>
	
	<HasRole role={roles => roles.has('admin')}>
		<MenuDivider />
		{/* <MenuItem label="Settings" icon={<Settings />}>
			<MenuItem label="Semester" icon={<Clock />} to="semesters" />
			<MenuItem label="Study Programs" icon={<GraduationCap />} to="studyPrograms" />
			<MenuItem label="Partner universities" icon={<Building />} to="universities" />
			<MenuItem label="Faculties at VSE" icon={<BookOpen />} to="faculties" />
			<MenuItem label="Sections" icon={<Grid />} to="sections" />
			<MenuItem label="Countries" icon={<MapPin />} to="countries" />
			<MenuItem label="Dietary Restrictions" icon={<UtensilsCrossed />} to="" />
			<MenuItem label="Allergies" icon={<AlertCircle />} to="" /> */}
			{/* <MenuItem label="Languages" icon={<MessageSquare />} to="languages" />
			<MenuItem label="Hobbies" icon={<Heart />} to="hobbies" />
			<MenuItem label="N2N Clubs" to="clubs" /> 
			<MenuItem label="Limitations" to="limitations" />
			<MenuItem label="Sports" icon={<Activity />} to="sports" /> */}
		{/* </MenuItem> */}
		<Collapsible>
				<CollapsibleTrigger>Settings</CollapsibleTrigger>
				<CollapsibleContent>
					<MenuItem label="Semester" icon={<Clock />} to="semesters" />
					<MenuItem label="Study Programs" icon={<GraduationCap />} to="studyPrograms" />
					<MenuItem label="Partner universities" icon={<Building />} to="universities" />
					<MenuItem label="Faculties at VSE" icon={<BookOpen />} to="faculties" />
					<MenuItem label="Sections" icon={<Grid />} to="sections" />
					<MenuItem label="Countries" icon={<MapPin />} to="countries" />
					<MenuItem label="Languages" icon={<LanguagesIcon />} to="languages" />
					<MenuItem label="Dietary Restrictions" icon={<UtensilsCrossed />} to="" />
					<MenuItem label="Allergies" icon={<AlertCircle />} to="" />
				</CollapsibleContent>
		</Collapsible>
	</HasRole>

	{/* <MenuItem label="Applications" icon={<FileText />}>
		<MenuItem label="Czech applications" icon={<File />} to="applicationCzs" />
		<MenuItem label="Foreign applications" icon={<File />} to="applicationFrs" />
	</MenuItem>
	<MenuItem label="Buddy program" icon={<Dot />}>
		<MenuItem label="Buddy pairs" icon={<Users />} to="buddyPairs" />
		<MenuItem label="Create pair" icon={<UserPlus />} to="buddyPairCreate" />
		<MenuItem label="Tasks" icon={<CheckSquare />} to="buddyTasks" />
	</MenuItem> */}
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
