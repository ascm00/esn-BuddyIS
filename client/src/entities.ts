import type { applicationCzResult } from './enums'
import type { applicationFrStatus } from './enums'
import type { applicationStatus } from './enums'
import type { eventStatus } from './enums'
import type { preferredSex } from './enums'
import type { rating } from './enums'

export type JSONPrimitive = string | number | boolean | null
export type JSONValue = JSONPrimitive | JSONObject | JSONArray
export type JSONObject = { readonly [K in string]?: JSONValue }
export type JSONArray = readonly JSONValue[]

export type ApplicationCz <OverRelation extends string | never = never> = {
	name: 'ApplicationCz'
	unique:
		| Omit<{ id: string}, OverRelation>
	columns: {
		id: string
		createdAt: string
		points: number | null
		motivation: string | null
		status: applicationStatus | null
		result: applicationCzResult | null
		rBuddy: number | null
		rParty: number | null
		rTravel: number | null
		rSport: number | null
		preferredSex: preferredSex | null
	}
	hasOne: {
		user: User
		semester: Semester
		preferredCountry: Country
	}
	hasMany: {
	}
	hasManyBy: {
	}
}
export type ApplicationFr <OverRelation extends string | never = never> = {
	name: 'ApplicationFr'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ user: User['unique']}, OverRelation>
		| Omit<{ limitations: Limitations['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		status: applicationFrStatus | null
		rating: rating | null
		rBuddy: number | null
		rParty: number | null
		rTravel: number | null
		rSport: number | null
		preferredBuddySex: preferredSex | null
		emailForInformation: string | null
	}
	hasOne: {
		semester: Semester
		user: User
		language: Language
		limitations: Limitations
	}
	hasMany: {
		hobbies: Hobby
		sport: Sport
	}
	hasManyBy: {
	}
}
export type BuddyPair <OverRelation extends string | never = never> = {
	name: 'BuddyPair'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ czechStudent: User['unique']}, OverRelation>
		| Omit<{ internationalStudent: User['unique']}, OverRelation>
		| Omit<{ tasks: BuddyTask['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		note: string | null
	}
	hasOne: {
		czechStudent: User
		internationalStudent: User
	}
	hasMany: {
		tasks: BuddyTask<'buddyPair'>
	}
	hasManyBy: {
	}
}
export type BuddyTask <OverRelation extends string | never = never> = {
	name: 'BuddyTask'
	unique:
		| Omit<{ id: string}, OverRelation>
	columns: {
		id: string
		createdAt: string
		description: string
		done: boolean
		confirmed: boolean | null
	}
	hasOne: {
		buddyPair: BuddyPair
	}
	hasMany: {
	}
	hasManyBy: {
	}
}
export type Club <OverRelation extends string | never = never> = {
	name: 'Club'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ parties: N2nParty['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
	}
	hasOne: {
	}
	hasMany: {
		parties: N2nParty<'club'>
	}
	hasManyBy: {
		partiesByHours: { entity: N2nParty; by: {hours: N2nHour['unique']}  }
	}
}
export type Country <OverRelation extends string | never = never> = {
	name: 'Country'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ users: User['unique']}, OverRelation>
		| Omit<{ universities: University['unique']}, OverRelation>
		| Omit<{ preferredApplicationsCz: ApplicationCz['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
	}
	hasOne: {
	}
	hasMany: {
		users: User<'country'>
		universities: University<'country'>
		preferredApplicationsCz: ApplicationCz<'preferredCountry'>
	}
	hasManyBy: {
		usersByTarget: { entity: User; by: {target: Person['unique']}  }
		usersByOrganizedEvents: { entity: User; by: {organizedEvents: Event['unique']}  }
		usersByCzechBuddyPair: { entity: User; by: {czechBuddyPair: BuddyPair['unique']}  }
		usersByInternationalBuddyPair: { entity: User; by: {internationalBuddyPair: BuddyPair['unique']}  }
		usersByApplications: { entity: User; by: {applications: ApplicationCz['unique']}  }
		usersByApplicationsFr: { entity: User; by: {applicationsFr: ApplicationFr['unique']}  }
		universitiesByUsers: { entity: University; by: {users: User['unique']}  }
	}
}
export type Event <OverRelation extends string | never = never> = {
	name: 'Event'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ contactPerson: User['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
		description: string | null
		startDate: string
		endDate: string
		capacity: number | null
		fee: number | null
		place: string | null
		whatToBring: string | null
		whatsappLink: string | null
		registrationStartDate: string | null
		registrationEndDate: string | null
		waitingList: number | null
		meetingPoint: string | null
		status: eventStatus | null
		private: boolean | null
	}
	hasOne: {
		section: Section
		contactPerson: User
		semester: Semester
		picture: Image
	}
	hasMany: {
		participants: User
	}
	hasManyBy: {
	}
}
export type Faculty <OverRelation extends string | never = never> = {
	name: 'Faculty'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ users: User['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
	}
	hasOne: {
	}
	hasMany: {
		users: User<'faculty'>
	}
	hasManyBy: {
		usersByTarget: { entity: User; by: {target: Person['unique']}  }
		usersByOrganizedEvents: { entity: User; by: {organizedEvents: Event['unique']}  }
		usersByCzechBuddyPair: { entity: User; by: {czechBuddyPair: BuddyPair['unique']}  }
		usersByInternationalBuddyPair: { entity: User; by: {internationalBuddyPair: BuddyPair['unique']}  }
		usersByApplications: { entity: User; by: {applications: ApplicationCz['unique']}  }
		usersByApplicationsFr: { entity: User; by: {applicationsFr: ApplicationFr['unique']}  }
	}
}
export type Hobby <OverRelation extends string | never = never> = {
	name: 'Hobby'
	unique:
		| Omit<{ id: string}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
	}
	hasOne: {
	}
	hasMany: {
		applicationsFr: ApplicationFr
	}
	hasManyBy: {
	}
}
export type Image <OverRelation extends string | never = never> = {
	name: 'Image'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ meta: ImageMetadata['unique']}, OverRelation>
		| Omit<{ userProfilePicture: User['unique']}, OverRelation>
		| Omit<{ eventPicture: Event['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		url: string
		width: number | null
		height: number | null
		alt: string | null
	}
	hasOne: {
		meta: ImageMetadata
	}
	hasMany: {
		userProfilePicture: User<'profilePicture'>
		eventPicture: Event<'picture'>
	}
	hasManyBy: {
		userProfilePictureByTarget: { entity: User; by: {target: Person['unique']}  }
		userProfilePictureByOrganizedEvents: { entity: User; by: {organizedEvents: Event['unique']}  }
		userProfilePictureByCzechBuddyPair: { entity: User; by: {czechBuddyPair: BuddyPair['unique']}  }
		userProfilePictureByInternationalBuddyPair: { entity: User; by: {internationalBuddyPair: BuddyPair['unique']}  }
		userProfilePictureByApplications: { entity: User; by: {applications: ApplicationCz['unique']}  }
		userProfilePictureByApplicationsFr: { entity: User; by: {applicationsFr: ApplicationFr['unique']}  }
		eventPictureByContactPerson: { entity: Event; by: {contactPerson: User['unique']}  }
	}
}
export type ImageMetadata <OverRelation extends string | never = never> = {
	name: 'ImageMetadata'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ image: Image['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		fileName: string | null
		lastModified: string | null
		fileSize: number | null
		fileType: string | null
	}
	hasOne: {
		image: Image
	}
	hasMany: {
	}
	hasManyBy: {
	}
}
export type Language <OverRelation extends string | never = never> = {
	name: 'Language'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ applicationsFr: ApplicationFr['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
	}
	hasOne: {
	}
	hasMany: {
		applicationsFr: ApplicationFr<'language'>
	}
	hasManyBy: {
		applicationsFrByUser: { entity: ApplicationFr; by: {user: User['unique']}  }
		applicationsFrByLimitations: { entity: ApplicationFr; by: {limitations: Limitations['unique']}  }
	}
}
export type Limitations <OverRelation extends string | never = never> = {
	name: 'Limitations'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ applicationFr: ApplicationFr['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
	}
	hasOne: {
		applicationFr: ApplicationFr
	}
	hasMany: {
	}
	hasManyBy: {
	}
}
export type N2nHour <OverRelation extends string | never = never> = {
	name: 'N2nHour'
	unique:
		| Omit<{ id: string}, OverRelation>
	columns: {
		id: string
		createdAt: string
		from: string
		to: string
	}
	hasOne: {
		party: N2nParty
	}
	hasMany: {
		user: User
	}
	hasManyBy: {
	}
}
export type N2nParty <OverRelation extends string | never = never> = {
	name: 'N2nParty'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ hours: N2nHour['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
		date: string
		open: boolean | null
	}
	hasOne: {
		semester: Semester
		club: Club
	}
	hasMany: {
		hours: N2nHour<'party'>
	}
	hasManyBy: {
	}
}
export type Person <OverRelation extends string | never = never> = {
	name: 'Person'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ userUndefined: User['unique']}, OverRelation>
		| Omit<{ tenantPerson: TenantPerson['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		personId: string
	}
	hasOne: {
		userUndefined: User
		tenantPerson: TenantPerson
	}
	hasMany: {
	}
	hasManyBy: {
	}
}
export type Section <OverRelation extends string | never = never> = {
	name: 'Section'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ events: Event['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
		description: string | null
	}
	hasOne: {
	}
	hasMany: {
		events: Event<'section'>
	}
	hasManyBy: {
		eventsByContactPerson: { entity: Event; by: {contactPerson: User['unique']}  }
	}
}
export type Semester <OverRelation extends string | never = never> = {
	name: 'Semester'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ events: Event['unique']}, OverRelation>
		| Omit<{ applications: ApplicationCz['unique']}, OverRelation>
		| Omit<{ applicationsFr: ApplicationFr['unique']}, OverRelation>
		| Omit<{ parties: N2nParty['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
		startDate: string
		endDate: string
	}
	hasOne: {
	}
	hasMany: {
		events: Event<'semester'>
		applications: ApplicationCz<'semester'>
		applicationsFr: ApplicationFr<'semester'>
		parties: N2nParty<'semester'>
	}
	hasManyBy: {
		eventsByContactPerson: { entity: Event; by: {contactPerson: User['unique']}  }
		applicationsFrByUser: { entity: ApplicationFr; by: {user: User['unique']}  }
		applicationsFrByLimitations: { entity: ApplicationFr; by: {limitations: Limitations['unique']}  }
		partiesByHours: { entity: N2nParty; by: {hours: N2nHour['unique']}  }
	}
}
export type Sport <OverRelation extends string | never = never> = {
	name: 'Sport'
	unique:
		| Omit<{ id: string}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
	}
	hasOne: {
	}
	hasMany: {
		applicationsFr: ApplicationFr
	}
	hasManyBy: {
	}
}
export type TenantPerson <OverRelation extends string | never = never> = {
	name: 'TenantPerson'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ person: Person['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		identityId: string
		email: string | null
		name: string | null
		otpUri: string | null
		otpActivatedAt: string | null
		idpOnly: string | null
		roles: string | null
	}
	hasOne: {
		person: Person
	}
	hasMany: {
	}
	hasManyBy: {
	}
}
export type University <OverRelation extends string | never = never> = {
	name: 'University'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ users: User['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
	}
	hasOne: {
		country: Country
	}
	hasMany: {
		users: User<'university'>
	}
	hasManyBy: {
		usersByTarget: { entity: User; by: {target: Person['unique']}  }
		usersByOrganizedEvents: { entity: User; by: {organizedEvents: Event['unique']}  }
		usersByCzechBuddyPair: { entity: User; by: {czechBuddyPair: BuddyPair['unique']}  }
		usersByInternationalBuddyPair: { entity: User; by: {internationalBuddyPair: BuddyPair['unique']}  }
		usersByApplications: { entity: User; by: {applications: ApplicationCz['unique']}  }
		usersByApplicationsFr: { entity: User; by: {applicationsFr: ApplicationFr['unique']}  }
	}
}
export type User <OverRelation extends string | never = never> = {
	name: 'User'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ target: Person['unique']}, OverRelation>
		| Omit<{ organizedEvents: Event['unique']}, OverRelation>
		| Omit<{ czechBuddyPair: BuddyPair['unique']}, OverRelation>
		| Omit<{ internationalBuddyPair: BuddyPair['unique']}, OverRelation>
		| Omit<{ applications: ApplicationCz['unique']}, OverRelation>
		| Omit<{ applicationsFr: ApplicationFr['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		registrationDate: string
		lastLoginDate: string | null
		phoneNumber: string | null
		esnCardId: string | null
		surname: string
		xname: string | null
		active: boolean | null
		firstName: string
	}
	hasOne: {
		target: Person
		university: University
		faculty: Faculty
		country: Country
		organizedEvents: Event
		czechBuddyPair: BuddyPair
		internationalBuddyPair: BuddyPair
		applicationsFr: ApplicationFr
		profilePicture: Image
	}
	hasMany: {
		participatedEvents: Event
		applications: ApplicationCz<'user'>
		n2nHours: N2nHour
	}
	hasManyBy: {
	}
}

export type ContemberClientEntities = {
	ApplicationCz: ApplicationCz
	ApplicationFr: ApplicationFr
	BuddyPair: BuddyPair
	BuddyTask: BuddyTask
	Club: Club
	Country: Country
	Event: Event
	Faculty: Faculty
	Hobby: Hobby
	Image: Image
	ImageMetadata: ImageMetadata
	Language: Language
	Limitations: Limitations
	N2nHour: N2nHour
	N2nParty: N2nParty
	Person: Person
	Section: Section
	Semester: Semester
	Sport: Sport
	TenantPerson: TenantPerson
	University: University
	User: User
}

export type ContemberClientSchema = {
	entities: ContemberClientEntities
}
