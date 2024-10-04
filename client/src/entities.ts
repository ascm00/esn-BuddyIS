import type { applicationCzResult } from './enums'
import type { applicationFrStatus } from './enums'
import type { applicationStatus } from './enums'
import type { contentReferenceTypeEnum } from './enums'
import type { eventStatus } from './enums'
import type { preferredSex } from './enums'
import type { rating } from './enums'
import type { sex } from './enums'

export type JSONPrimitive = string | number | boolean | null
export type JSONValue = JSONPrimitive | JSONObject | JSONArray
export type JSONObject = { readonly [K in string]?: JSONValue }
export type JSONArray = readonly JSONValue[]

export type Allergy <OverRelation extends string | never = never> = {
	name: 'Allergy'
	unique:
		| Omit<{ id: string}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string | null
	}
	hasOne: {
	}
	hasMany: {
		registrations: EventRegistration
	}
	hasManyBy: {
	}
}
export type ApplicationCz <OverRelation extends string | never = never> = {
	name: 'ApplicationCz'
	unique:
		| Omit<{ id: string}, OverRelation>
	columns: {
		id: string
		createdAt: string
		points: number | null
		motivation: string | null
		howManyBuddies: number | null
		status: applicationStatus | null
		result: applicationCzResult | null
		preferredSex: preferredSex | null
	}
	hasOne: {
		person: Person
		semester: Semester
		preferredCountry: Country
	}
	hasMany: {
		preferredLanguages: Language
	}
	hasManyBy: {
	}
}
export type ApplicationFr <OverRelation extends string | never = never> = {
	name: 'ApplicationFr'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ person: Person['unique']}, OverRelation>
		| Omit<{ limitations: Limitations['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		status: applicationStatus | null
		rating: rating | null
		preferredBuddySex: preferredSex | null
		emailForInformation: string | null
	}
	hasOne: {
		semester: Semester
		person: Person
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
		| Omit<{ internationalStudent: Person['unique']}, OverRelation>
		| Omit<{ notes: Note['unique']}, OverRelation>
		| Omit<{ tasks: BuddyTask['unique']}, OverRelation>
		| Omit<{ picture: Image['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		tenPoints: boolean
		arrival: string | null
	}
	hasOne: {
		coordinator: Person
		czechStudent: Person
		internationalStudent: Person
		semester: Semester
		picture: Image
	}
	hasMany: {
		notes: Note<'buddyPair'>
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
export type Content <OverRelation extends string | never = never> = {
	name: 'Content'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ references: ContentReference['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		data: JSONValue | null
	}
	hasOne: {
	}
	hasMany: {
		references: ContentReference<'content'>
	}
	hasManyBy: {
	}
}
export type ContentReference <OverRelation extends string | never = never> = {
	name: 'ContentReference'
	unique:
		| Omit<{ id: string}, OverRelation>
	columns: {
		id: string
		createdAt: string
		type: contentReferenceTypeEnum | null
	}
	hasOne: {
		content: Content
	}
	hasMany: {
	}
	hasManyBy: {
	}
}
export type Country <OverRelation extends string | never = never> = {
	name: 'Country'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ users: Person['unique']}, OverRelation>
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
		users: Person<'countryOfUniversity'>
		universities: University<'country'>
		preferredApplicationsCz: ApplicationCz<'preferredCountry'>
	}
	hasManyBy: {
		usersByTenantPerson: { entity: Person; by: {tenantPerson: TenantPerson['unique']}  }
		usersByOrganizedEvents: { entity: Person; by: {organizedEvents: Event['unique']}  }
		usersByCzechBuddyPair: { entity: Person; by: {czechBuddyPair: BuddyPair['unique']}  }
		usersByInternationalBuddyPair: { entity: Person; by: {internationalBuddyPair: BuddyPair['unique']}  }
		usersByApplications: { entity: Person; by: {applications: ApplicationCz['unique']}  }
		usersByApplicationsFr: { entity: Person; by: {applicationsFr: ApplicationFr['unique']}  }
		usersByCoordinatingBuddyPairs: { entity: Person; by: {coordinatingBuddyPairs: BuddyPair['unique']}  }
		usersByRegistrations: { entity: Person; by: {registrations: EventRegistration['unique']}  }
		usersByNotes: { entity: Person; by: {notes: Note['unique']}  }
		universitiesByUsers: { entity: University; by: {users: Person['unique']}  }
	}
}
export type DietaryRestrictions <OverRelation extends string | never = never> = {
	name: 'DietaryRestrictions'
	unique:
		| Omit<{ id: string}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string | null
	}
	hasOne: {
	}
	hasMany: {
		registrations: EventRegistration
	}
	hasManyBy: {
	}
}
export type Event <OverRelation extends string | never = never> = {
	name: 'Event'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ registrations: EventRegistration['unique']}, OverRelation>
		| Omit<{ contactPerson: Person['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
		description: string | null
		startDate: string
		endDate: string
		refundPolicy: string | null
		mandatoryESNcard: boolean | null
		dietaryRestrictions: boolean | null
		allergies: boolean | null
		capacity: number | null
		fee: number | null
		registeredCount: number | null
		place: string | null
		whatToBring: string | null
		whatsappLink: string | null
		registrationStartDate: string | null
		registrationEndDate: string | null
		waitingList: number | null
		meetingPoint: string | null
		status: eventStatus | null
		private: boolean | null
		allowRegistrationWithoutPayment: boolean | null
	}
	hasOne: {
		section: Section
		contactPerson: Person
		semester: Semester
		picture: Image
	}
	hasMany: {
		registrations: EventRegistration<'event'>
	}
	hasManyBy: {
	}
}
export type EventRegistration <OverRelation extends string | never = never> = {
	name: 'EventRegistration'
	unique:
		| Omit<{ id: string}, OverRelation>
	columns: {
		id: string
		createdAt: string
		paid: boolean | null
		note: string | null
		isWaitingList: boolean | null
	}
	hasOne: {
		event: Event
		person: Person
	}
	hasMany: {
		allergies: Allergy
		dietaryRestrictions: DietaryRestrictions
	}
	hasManyBy: {
	}
}
export type Faculty <OverRelation extends string | never = never> = {
	name: 'Faculty'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ users: Person['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
	}
	hasOne: {
	}
	hasMany: {
		users: Person<'faculty'>
	}
	hasManyBy: {
		usersByTenantPerson: { entity: Person; by: {tenantPerson: TenantPerson['unique']}  }
		usersByOrganizedEvents: { entity: Person; by: {organizedEvents: Event['unique']}  }
		usersByCzechBuddyPair: { entity: Person; by: {czechBuddyPair: BuddyPair['unique']}  }
		usersByInternationalBuddyPair: { entity: Person; by: {internationalBuddyPair: BuddyPair['unique']}  }
		usersByApplications: { entity: Person; by: {applications: ApplicationCz['unique']}  }
		usersByApplicationsFr: { entity: Person; by: {applicationsFr: ApplicationFr['unique']}  }
		usersByCoordinatingBuddyPairs: { entity: Person; by: {coordinatingBuddyPairs: BuddyPair['unique']}  }
		usersByRegistrations: { entity: Person; by: {registrations: EventRegistration['unique']}  }
		usersByNotes: { entity: Person; by: {notes: Note['unique']}  }
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
		| Omit<{ userProfilePicture: Person['unique']}, OverRelation>
		| Omit<{ eventPicture: Event['unique']}, OverRelation>
		| Omit<{ buddyPair: BuddyPair['unique']}, OverRelation>
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
		buddyPair: BuddyPair
	}
	hasMany: {
		userProfilePicture: Person<'profilePicture'>
		eventPicture: Event<'picture'>
	}
	hasManyBy: {
		userProfilePictureByTenantPerson: { entity: Person; by: {tenantPerson: TenantPerson['unique']}  }
		userProfilePictureByOrganizedEvents: { entity: Person; by: {organizedEvents: Event['unique']}  }
		userProfilePictureByCzechBuddyPair: { entity: Person; by: {czechBuddyPair: BuddyPair['unique']}  }
		userProfilePictureByInternationalBuddyPair: { entity: Person; by: {internationalBuddyPair: BuddyPair['unique']}  }
		userProfilePictureByApplications: { entity: Person; by: {applications: ApplicationCz['unique']}  }
		userProfilePictureByApplicationsFr: { entity: Person; by: {applicationsFr: ApplicationFr['unique']}  }
		userProfilePictureByCoordinatingBuddyPairs: { entity: Person; by: {coordinatingBuddyPairs: BuddyPair['unique']}  }
		userProfilePictureByRegistrations: { entity: Person; by: {registrations: EventRegistration['unique']}  }
		userProfilePictureByNotes: { entity: Person; by: {notes: Note['unique']}  }
		eventPictureByRegistrations: { entity: Event; by: {registrations: EventRegistration['unique']}  }
		eventPictureByContactPerson: { entity: Event; by: {contactPerson: Person['unique']}  }
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
	columns: {
		id: string
		createdAt: string
		name: string
	}
	hasOne: {
	}
	hasMany: {
		person: Person
		applicationsCz: ApplicationCz
	}
	hasManyBy: {
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
		person: Person
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
export type Note <OverRelation extends string | never = never> = {
	name: 'Note'
	unique:
		| Omit<{ id: string}, OverRelation>
	columns: {
		id: string
		createdAt: string
		content: string
	}
	hasOne: {
		buddyPair: BuddyPair
		author: Person
	}
	hasMany: {
	}
	hasManyBy: {
	}
}
export type Person <OverRelation extends string | never = never> = {
	name: 'Person'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ tenantPerson: TenantPerson['unique']}, OverRelation>
		| Omit<{ organizedEvents: Event['unique']}, OverRelation>
		| Omit<{ czechBuddyPair: BuddyPair['unique']}, OverRelation>
		| Omit<{ internationalBuddyPair: BuddyPair['unique']}, OverRelation>
		| Omit<{ applications: ApplicationCz['unique']}, OverRelation>
		| Omit<{ applicationsFr: ApplicationFr['unique']}, OverRelation>
		| Omit<{ coordinatingBuddyPairs: BuddyPair['unique']}, OverRelation>
		| Omit<{ registrations: EventRegistration['unique']}, OverRelation>
		| Omit<{ notes: Note['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		personId: string
		gender: sex | null
		registrationDate: string | null
		lastLoginDate: string | null
		phoneNumber: string | null
		emailForInfo: string | null
		esnCardId: string | null
		surname: string | null
		xname: string | null
		active: boolean | null
		firstName: string | null
	}
	hasOne: {
		tenantPerson: TenantPerson
		university: University
		faculty: Faculty
		studyProgram: StudyProgram
		countryOfUniversity: Country
		organizedEvents: Event
		internationalBuddyPair: BuddyPair
		applicationsFr: ApplicationFr
		profilePicture: Image
	}
	hasMany: {
		czechBuddyPair: BuddyPair<'czechStudent'>
		applications: ApplicationCz<'person'>
		n2nHours: N2nHour
		coordinatingBuddyPairs: BuddyPair<'coordinator'>
		registrations: EventRegistration<'person'>
		notes: Note<'author'>
		languages: Language
	}
	hasManyBy: {
		czechBuddyPairByInternationalStudent: { entity: BuddyPair; by: {internationalStudent: Person['unique']}  }
		czechBuddyPairByNotes: { entity: BuddyPair; by: {notes: Note['unique']}  }
		czechBuddyPairByTasks: { entity: BuddyPair; by: {tasks: BuddyTask['unique']}  }
		czechBuddyPairByPicture: { entity: BuddyPair; by: {picture: Image['unique']}  }
		coordinatingBuddyPairsByInternationalStudent: { entity: BuddyPair; by: {internationalStudent: Person['unique']}  }
		coordinatingBuddyPairsByNotes: { entity: BuddyPair; by: {notes: Note['unique']}  }
		coordinatingBuddyPairsByTasks: { entity: BuddyPair; by: {tasks: BuddyTask['unique']}  }
		coordinatingBuddyPairsByPicture: { entity: BuddyPair; by: {picture: Image['unique']}  }
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
		eventsByRegistrations: { entity: Event; by: {registrations: EventRegistration['unique']}  }
		eventsByContactPerson: { entity: Event; by: {contactPerson: Person['unique']}  }
	}
}
export type Semester <OverRelation extends string | never = never> = {
	name: 'Semester'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ events: Event['unique']}, OverRelation>
		| Omit<{ applications: ApplicationCz['unique']}, OverRelation>
		| Omit<{ applicationsFr: ApplicationFr['unique']}, OverRelation>
		| Omit<{ buddyPairs: BuddyPair['unique']}, OverRelation>
		| Omit<{ parties: N2nParty['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
		startDate: string
		endDate: string
		isCurrent: boolean
		openForCzechBuddyRegistrationsDate: string
		closeBuddyRegistrations: string
	}
	hasOne: {
	}
	hasMany: {
		events: Event<'semester'>
		applications: ApplicationCz<'semester'>
		applicationsFr: ApplicationFr<'semester'>
		buddyPairs: BuddyPair<'semester'>
		parties: N2nParty<'semester'>
	}
	hasManyBy: {
		eventsByRegistrations: { entity: Event; by: {registrations: EventRegistration['unique']}  }
		eventsByContactPerson: { entity: Event; by: {contactPerson: Person['unique']}  }
		applicationsFrByPerson: { entity: ApplicationFr; by: {person: Person['unique']}  }
		applicationsFrByLimitations: { entity: ApplicationFr; by: {limitations: Limitations['unique']}  }
		buddyPairsByInternationalStudent: { entity: BuddyPair; by: {internationalStudent: Person['unique']}  }
		buddyPairsByNotes: { entity: BuddyPair; by: {notes: Note['unique']}  }
		buddyPairsByTasks: { entity: BuddyPair; by: {tasks: BuddyTask['unique']}  }
		buddyPairsByPicture: { entity: BuddyPair; by: {picture: Image['unique']}  }
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
export type StudyProgram <OverRelation extends string | never = never> = {
	name: 'StudyProgram'
	unique:
		| Omit<{ id: string}, OverRelation>
		| Omit<{ users: Person['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
	}
	hasOne: {
	}
	hasMany: {
		users: Person<'studyProgram'>
	}
	hasManyBy: {
		usersByTenantPerson: { entity: Person; by: {tenantPerson: TenantPerson['unique']}  }
		usersByOrganizedEvents: { entity: Person; by: {organizedEvents: Event['unique']}  }
		usersByCzechBuddyPair: { entity: Person; by: {czechBuddyPair: BuddyPair['unique']}  }
		usersByInternationalBuddyPair: { entity: Person; by: {internationalBuddyPair: BuddyPair['unique']}  }
		usersByApplications: { entity: Person; by: {applications: ApplicationCz['unique']}  }
		usersByApplicationsFr: { entity: Person; by: {applicationsFr: ApplicationFr['unique']}  }
		usersByCoordinatingBuddyPairs: { entity: Person; by: {coordinatingBuddyPairs: BuddyPair['unique']}  }
		usersByRegistrations: { entity: Person; by: {registrations: EventRegistration['unique']}  }
		usersByNotes: { entity: Person; by: {notes: Note['unique']}  }
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
		| Omit<{ users: Person['unique']}, OverRelation>
	columns: {
		id: string
		createdAt: string
		name: string
	}
	hasOne: {
		country: Country
	}
	hasMany: {
		users: Person<'university'>
	}
	hasManyBy: {
		usersByTenantPerson: { entity: Person; by: {tenantPerson: TenantPerson['unique']}  }
		usersByOrganizedEvents: { entity: Person; by: {organizedEvents: Event['unique']}  }
		usersByCzechBuddyPair: { entity: Person; by: {czechBuddyPair: BuddyPair['unique']}  }
		usersByInternationalBuddyPair: { entity: Person; by: {internationalBuddyPair: BuddyPair['unique']}  }
		usersByApplications: { entity: Person; by: {applications: ApplicationCz['unique']}  }
		usersByApplicationsFr: { entity: Person; by: {applicationsFr: ApplicationFr['unique']}  }
		usersByCoordinatingBuddyPairs: { entity: Person; by: {coordinatingBuddyPairs: BuddyPair['unique']}  }
		usersByRegistrations: { entity: Person; by: {registrations: EventRegistration['unique']}  }
		usersByNotes: { entity: Person; by: {notes: Note['unique']}  }
	}
}

export type ContemberClientEntities = {
	Allergy: Allergy
	ApplicationCz: ApplicationCz
	ApplicationFr: ApplicationFr
	BuddyPair: BuddyPair
	BuddyTask: BuddyTask
	Club: Club
	Content: Content
	ContentReference: ContentReference
	Country: Country
	DietaryRestrictions: DietaryRestrictions
	Event: Event
	EventRegistration: EventRegistration
	Faculty: Faculty
	Hobby: Hobby
	Image: Image
	ImageMetadata: ImageMetadata
	Language: Language
	Limitations: Limitations
	N2nHour: N2nHour
	N2nParty: N2nParty
	Note: Note
	Person: Person
	Section: Section
	Semester: Semester
	Sport: Sport
	StudyProgram: StudyProgram
	TenantPerson: TenantPerson
	University: University
}

export type ContemberClientSchema = {
	entities: ContemberClientEntities
}
