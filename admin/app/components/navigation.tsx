import { Menu, MenuItem } from '@app/lib/ui/menu'
import { Component, HasRole } from '@contember/interface'
import { Activity, Book, BookOpen, Building, Calendar, CalendarDays, CalendarPlus, CheckSquare, Dot, File, FileText, Globe, Heart, Home, Layout, MessageSquare, PartyPopper, Settings, UserPlus, Users } from 'lucide-react'

export const Navigation = Component(() => <Menu>
	<MenuItem label="Home" icon={<Home />} to="eventFeed" />
	<MenuItem label="Events calendar" icon={<Calendar />} to="calendar" />
	<HasRole role={roles => roles.has('admin') || roles.has('esnMemberRole')}>
		<MenuItem label="Events" icon={<Calendar />} to="events" />
	</HasRole>
	<MenuItem label="Buddy" icon={<CheckSquare />} to="buddyTasks" />
	<MenuItem label="N2N" icon={<PartyPopper />} to="n2nParties" />
	<MenuItem label="Users" icon={<Users />} to="users" />


	{/* <MenuItem label="Settings" icon={<Settings />}>
		<MenuItem label="Universities" icon={<Building />} to="universities" />
		<MenuItem label="N2N Clubs" to="clubs" />
		<MenuItem label="Faculties" icon={<BookOpen />} to="faculties" />
		<MenuItem label="Semesters" icon={<Calendar />} to="semesters" />
		<MenuItem label="Sections" icon={<Layout />} to="sections" />
		<MenuItem label="Countries" icon={<Globe />} to="countries" />
		<MenuItem label="Languages" icon={<MessageSquare />} to="languages" />
		<MenuItem label="Hobbies" icon={<Heart />} to="hobbies" />
		<MenuItem label="Limitations" to="limitations" />
		<MenuItem label="Sports" icon={<Activity />} to="sports" />
		<MenuItem label="Applications" icon={<FileText />}>
			<MenuItem label="Czech applications" icon={<File />} to="applicationCzs" />
			<MenuItem label="Foreign applications" icon={<File />} to="applicationFrs" />
		</MenuItem>
		<MenuItem label="Buddy program" icon={<Dot />}>
			<MenuItem label="Buddy pairs" icon={<Users />} to="buddyPairs" />
			<MenuItem label="Create pair" icon={<UserPlus />} to="buddyPairCreate" />
			<MenuItem label="Tasks" icon={<CheckSquare />} to="buddyTasks" />
		</MenuItem>
	</MenuItem> */}
</Menu>)
