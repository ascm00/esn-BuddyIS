import { Menu, MenuItem } from '@app/lib/ui/menu'
import { Component } from '@contember/interface'
import { Activity, Book, BookOpen, Building, Calendar, CalendarPlus, CheckSquare, Dot, File, FileText, Globe, Heart, Layout, MessageSquare, Settings, UserPlus, Users } from 'lucide-react'

export const Navigation = Component(() => <Menu>
	<MenuItem label="Users" icon={<Users />} to="users">
		<MenuItem label="Create user" icon={<UserPlus />} to="userCreate" />
	</MenuItem>
	<MenuItem label="Events" icon={<Calendar />} to="events">
		<MenuItem label="Create event" icon={<CalendarPlus />} to="eventCreate" />
	</MenuItem>
	<MenuItem label="Buddy pairs" to="buddyPairs" />
	<MenuItem label="Sections" to="sections" />
	<MenuItem label="Universities" to="universities" />
	<MenuItem label="Faculties" to="faculties" />
	<MenuItem label="Countries" to="countries" />
	<MenuItem label="Semesters" to="semesters" />
	<MenuItem label="Buddy tasks" to="buddyTasks" />
	<MenuItem label="Application czs" to="applicationCzs" />
	<MenuItem label="Application frs" to="applicationFrs" />
	<MenuItem label="Languages" to="languages" />
	<MenuItem label="Hobbies" to="hobbies" />
	<MenuItem label="Sports" to="sports" />
	<MenuItem label="N2n parties" to="n2nParties" />
	<MenuItem label="Clubs" to="clubs" />
	<MenuItem label="N2n hours" to="n2nHours" />
	<MenuItem label="Limitations" to="limitations" />
	<MenuItem label="Buddy program" icon={<Dot />}>
		<MenuItem label="Buddy pairs" icon={<Users />} to="buddyPairs" />
		<MenuItem label="Create pair" icon={<UserPlus />} to="buddyPairCreate" />
		<MenuItem label="Tasks" icon={<CheckSquare />} to="buddyTasks" />
	</MenuItem>
	<MenuItem label="Applications" icon={<FileText />}>
		<MenuItem label="Czech applications" icon={<File />} to="applicationCzs" />
		<MenuItem label="Foreign applications" icon={<File />} to="applicationFrs" />
	</MenuItem>
	<MenuItem label="Academic" icon={<Book />}>
		<MenuItem label="Universities" icon={<Building />} to="universities" />
		<MenuItem label="Faculties" icon={<BookOpen />} to="faculties" />
		<MenuItem label="Semesters" icon={<Calendar />} to="semesters" />
	</MenuItem>
	<MenuItem label="Settings" icon={<Settings />}>
		<MenuItem label="Sections" icon={<Layout />} to="sections" />
		<MenuItem label="Countries" icon={<Globe />} to="countries" />
		<MenuItem label="Languages" icon={<MessageSquare />} to="languages" />
		<MenuItem label="Hobbies" icon={<Heart />} to="hobbies" />
		<MenuItem label="Sports" icon={<Activity />} to="sports" />
	</MenuItem>
</Menu>)
