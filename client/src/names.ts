import { SchemaNames } from '@contember/client-content'
export const ContemberClientNames: SchemaNames = {
  "entities": {
    "Allergy": {
      "name": "Allergy",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "name": {
          "type": "column"
        },
        "registrations": {
          "type": "many",
          "entity": "EventRegistration"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "name"
      ]
    },
    "ApplicationCz": {
      "name": "ApplicationCz",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "points": {
          "type": "column"
        },
        "person": {
          "type": "one",
          "entity": "Person"
        },
        "semester": {
          "type": "one",
          "entity": "Semester"
        },
        "motivation": {
          "type": "column"
        },
        "howManyBuddies": {
          "type": "column"
        },
        "status": {
          "type": "column"
        },
        "result": {
          "type": "column"
        },
        "preferredCountry": {
          "type": "one",
          "entity": "Country"
        },
        "preferredLanguages": {
          "type": "many",
          "entity": "Language"
        },
        "rBuddy": {
          "type": "column"
        },
        "rParty": {
          "type": "column"
        },
        "rTravel": {
          "type": "column"
        },
        "rSport": {
          "type": "column"
        },
        "preferredSex": {
          "type": "column"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "points",
        "motivation",
        "howManyBuddies",
        "status",
        "result",
        "rBuddy",
        "rParty",
        "rTravel",
        "rSport",
        "preferredSex"
      ]
    },
    "ApplicationFr": {
      "name": "ApplicationFr",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "semester": {
          "type": "one",
          "entity": "Semester"
        },
        "person": {
          "type": "one",
          "entity": "Person"
        },
        "status": {
          "type": "column"
        },
        "hobbies": {
          "type": "many",
          "entity": "Hobby"
        },
        "rating": {
          "type": "column"
        },
        "rBuddy": {
          "type": "column"
        },
        "rParty": {
          "type": "column"
        },
        "rTravel": {
          "type": "column"
        },
        "rSport": {
          "type": "column"
        },
        "preferredBuddySex": {
          "type": "column"
        },
        "emailForInformation": {
          "type": "column"
        },
        "sport": {
          "type": "many",
          "entity": "Sport"
        },
        "limitations": {
          "type": "one",
          "entity": "Limitations"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "status",
        "rating",
        "rBuddy",
        "rParty",
        "rTravel",
        "rSport",
        "preferredBuddySex",
        "emailForInformation"
      ]
    },
    "BuddyPair": {
      "name": "BuddyPair",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "coordinator": {
          "type": "one",
          "entity": "Person"
        },
        "czechStudent": {
          "type": "one",
          "entity": "Person"
        },
        "internationalStudent": {
          "type": "one",
          "entity": "Person"
        },
        "semester": {
          "type": "one",
          "entity": "Semester"
        },
        "notes": {
          "type": "many",
          "entity": "Note"
        },
        "tasks": {
          "type": "many",
          "entity": "BuddyTask"
        },
        "tenPoints": {
          "type": "column"
        },
        "picture": {
          "type": "one",
          "entity": "Image"
        },
        "arrival": {
          "type": "column"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "tenPoints",
        "arrival"
      ]
    },
    "BuddyTask": {
      "name": "BuddyTask",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "description": {
          "type": "column"
        },
        "buddyPair": {
          "type": "one",
          "entity": "BuddyPair"
        },
        "done": {
          "type": "column"
        },
        "confirmed": {
          "type": "column"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "description",
        "done",
        "confirmed"
      ]
    },
    "Club": {
      "name": "Club",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "parties": {
          "type": "many",
          "entity": "N2nParty"
        },
        "name": {
          "type": "column"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "name"
      ]
    },
    "Content": {
      "name": "Content",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "data": {
          "type": "column"
        },
        "references": {
          "type": "many",
          "entity": "ContentReference"
        },
        "eventDescription": {
          "type": "one",
          "entity": "Event"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "data"
      ]
    },
    "ContentReference": {
      "name": "ContentReference",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "type": {
          "type": "column"
        },
        "content": {
          "type": "one",
          "entity": "Content"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "type"
      ]
    },
    "Country": {
      "name": "Country",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "users": {
          "type": "many",
          "entity": "Person"
        },
        "universities": {
          "type": "many",
          "entity": "University"
        },
        "name": {
          "type": "column"
        },
        "preferredApplicationsCz": {
          "type": "many",
          "entity": "ApplicationCz"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "name"
      ]
    },
    "DietaryRestrictions": {
      "name": "DietaryRestrictions",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "name": {
          "type": "column"
        },
        "registrations": {
          "type": "many",
          "entity": "EventRegistration"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "name"
      ]
    },
    "Event": {
      "name": "Event",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "name": {
          "type": "column"
        },
        "description": {
          "type": "one",
          "entity": "Content"
        },
        "startDate": {
          "type": "column"
        },
        "endDate": {
          "type": "column"
        },
        "refundPolicy": {
          "type": "column"
        },
        "mandatoryESNcard": {
          "type": "column"
        },
        "dietaryRestrictions": {
          "type": "column"
        },
        "allergies": {
          "type": "column"
        },
        "capacity": {
          "type": "column"
        },
        "fee": {
          "type": "column"
        },
        "registrations": {
          "type": "many",
          "entity": "EventRegistration"
        },
        "registeredCount": {
          "type": "column"
        },
        "place": {
          "type": "column"
        },
        "whatToBring": {
          "type": "column"
        },
        "whatsappLink": {
          "type": "column"
        },
        "registrationStartDate": {
          "type": "column"
        },
        "registrationEndDate": {
          "type": "column"
        },
        "waitingList": {
          "type": "column"
        },
        "section": {
          "type": "one",
          "entity": "Section"
        },
        "meetingPoint": {
          "type": "column"
        },
        "status": {
          "type": "column"
        },
        "contactPerson": {
          "type": "one",
          "entity": "Person"
        },
        "semester": {
          "type": "one",
          "entity": "Semester"
        },
        "private": {
          "type": "column"
        },
        "allowRegistrationWithoutPayment": {
          "type": "column"
        },
        "picture": {
          "type": "one",
          "entity": "Image"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "name",
        "startDate",
        "endDate",
        "refundPolicy",
        "mandatoryESNcard",
        "dietaryRestrictions",
        "allergies",
        "capacity",
        "fee",
        "registeredCount",
        "place",
        "whatToBring",
        "whatsappLink",
        "registrationStartDate",
        "registrationEndDate",
        "waitingList",
        "meetingPoint",
        "status",
        "private",
        "allowRegistrationWithoutPayment"
      ]
    },
    "EventRegistration": {
      "name": "EventRegistration",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "paid": {
          "type": "column"
        },
        "note": {
          "type": "column"
        },
        "event": {
          "type": "one",
          "entity": "Event"
        },
        "isWaitingList": {
          "type": "column"
        },
        "person": {
          "type": "one",
          "entity": "Person"
        },
        "allergies": {
          "type": "many",
          "entity": "Allergy"
        },
        "dietaryRestrictions": {
          "type": "many",
          "entity": "DietaryRestrictions"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "paid",
        "note",
        "isWaitingList"
      ]
    },
    "Faculty": {
      "name": "Faculty",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "users": {
          "type": "many",
          "entity": "Person"
        },
        "name": {
          "type": "column"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "name"
      ]
    },
    "Hobby": {
      "name": "Hobby",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "applicationsFr": {
          "type": "many",
          "entity": "ApplicationFr"
        },
        "name": {
          "type": "column"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "name"
      ]
    },
    "Image": {
      "name": "Image",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "url": {
          "type": "column"
        },
        "width": {
          "type": "column"
        },
        "height": {
          "type": "column"
        },
        "alt": {
          "type": "column"
        },
        "meta": {
          "type": "one",
          "entity": "ImageMetadata"
        },
        "userProfilePicture": {
          "type": "many",
          "entity": "Person"
        },
        "eventPicture": {
          "type": "many",
          "entity": "Event"
        },
        "buddyPair": {
          "type": "one",
          "entity": "BuddyPair"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "url",
        "width",
        "height",
        "alt"
      ]
    },
    "ImageMetadata": {
      "name": "ImageMetadata",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "image": {
          "type": "one",
          "entity": "Image"
        },
        "fileName": {
          "type": "column"
        },
        "lastModified": {
          "type": "column"
        },
        "fileSize": {
          "type": "column"
        },
        "fileType": {
          "type": "column"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "fileName",
        "lastModified",
        "fileSize",
        "fileType"
      ]
    },
    "Language": {
      "name": "Language",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "name": {
          "type": "column"
        },
        "person": {
          "type": "many",
          "entity": "Person"
        },
        "applicationsCz": {
          "type": "many",
          "entity": "ApplicationCz"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "name"
      ]
    },
    "Limitations": {
      "name": "Limitations",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "applicationFr": {
          "type": "one",
          "entity": "ApplicationFr"
        }
      },
      "scalars": [
        "id",
        "createdAt"
      ]
    },
    "N2nHour": {
      "name": "N2nHour",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "from": {
          "type": "column"
        },
        "to": {
          "type": "column"
        },
        "party": {
          "type": "one",
          "entity": "N2nParty"
        },
        "person": {
          "type": "many",
          "entity": "Person"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "from",
        "to"
      ]
    },
    "N2nParty": {
      "name": "N2nParty",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "name": {
          "type": "column"
        },
        "date": {
          "type": "column"
        },
        "open": {
          "type": "column"
        },
        "semester": {
          "type": "one",
          "entity": "Semester"
        },
        "club": {
          "type": "one",
          "entity": "Club"
        },
        "hours": {
          "type": "many",
          "entity": "N2nHour"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "name",
        "date",
        "open"
      ]
    },
    "Note": {
      "name": "Note",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "buddyPair": {
          "type": "one",
          "entity": "BuddyPair"
        },
        "content": {
          "type": "column"
        },
        "author": {
          "type": "one",
          "entity": "Person"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "content"
      ]
    },
    "Person": {
      "name": "Person",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "personId": {
          "type": "column"
        },
        "tenantPerson": {
          "type": "one",
          "entity": "TenantPerson"
        },
        "gender": {
          "type": "column"
        },
        "registrationDate": {
          "type": "column"
        },
        "lastLoginDate": {
          "type": "column"
        },
        "phoneNumber": {
          "type": "column"
        },
        "university": {
          "type": "one",
          "entity": "University"
        },
        "emailForInfo": {
          "type": "column"
        },
        "esnCardId": {
          "type": "column"
        },
        "surname": {
          "type": "column"
        },
        "xname": {
          "type": "column"
        },
        "active": {
          "type": "column"
        },
        "faculty": {
          "type": "one",
          "entity": "Faculty"
        },
        "studyProgram": {
          "type": "one",
          "entity": "StudyProgram"
        },
        "country": {
          "type": "one",
          "entity": "Country"
        },
        "firstName": {
          "type": "column"
        },
        "organizedEvents": {
          "type": "one",
          "entity": "Event"
        },
        "czechBuddyPair": {
          "type": "one",
          "entity": "BuddyPair"
        },
        "internationalBuddyPair": {
          "type": "one",
          "entity": "BuddyPair"
        },
        "applications": {
          "type": "many",
          "entity": "ApplicationCz"
        },
        "applicationsFr": {
          "type": "one",
          "entity": "ApplicationFr"
        },
        "n2nHours": {
          "type": "many",
          "entity": "N2nHour"
        },
        "profilePicture": {
          "type": "one",
          "entity": "Image"
        },
        "coordinatingBuddyPairs": {
          "type": "many",
          "entity": "BuddyPair"
        },
        "registrations": {
          "type": "many",
          "entity": "EventRegistration"
        },
        "notes": {
          "type": "many",
          "entity": "Note"
        },
        "languages": {
          "type": "many",
          "entity": "Language"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "personId",
        "gender",
        "registrationDate",
        "lastLoginDate",
        "phoneNumber",
        "emailForInfo",
        "esnCardId",
        "surname",
        "xname",
        "active",
        "firstName"
      ]
    },
    "Section": {
      "name": "Section",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "events": {
          "type": "many",
          "entity": "Event"
        },
        "name": {
          "type": "column"
        },
        "description": {
          "type": "column"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "name",
        "description"
      ]
    },
    "Semester": {
      "name": "Semester",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "events": {
          "type": "many",
          "entity": "Event"
        },
        "name": {
          "type": "column"
        },
        "startDate": {
          "type": "column"
        },
        "endDate": {
          "type": "column"
        },
        "applications": {
          "type": "many",
          "entity": "ApplicationCz"
        },
        "applicationsFr": {
          "type": "many",
          "entity": "ApplicationFr"
        },
        "buddyPairs": {
          "type": "many",
          "entity": "BuddyPair"
        },
        "parties": {
          "type": "many",
          "entity": "N2nParty"
        },
        "isCurrent": {
          "type": "column"
        },
        "openForCzechBuddyRegistrationsDate": {
          "type": "column"
        },
        "closeBuddyRegistrations": {
          "type": "column"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "name",
        "startDate",
        "endDate",
        "isCurrent",
        "openForCzechBuddyRegistrationsDate",
        "closeBuddyRegistrations"
      ]
    },
    "Sport": {
      "name": "Sport",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "name": {
          "type": "column"
        },
        "applicationsFr": {
          "type": "many",
          "entity": "ApplicationFr"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "name"
      ]
    },
    "StudyProgram": {
      "name": "StudyProgram",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "users": {
          "type": "many",
          "entity": "Person"
        },
        "name": {
          "type": "column"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "name"
      ]
    },
    "TenantPerson": {
      "name": "TenantPerson",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "identityId": {
          "type": "column"
        },
        "email": {
          "type": "column"
        },
        "name": {
          "type": "column"
        },
        "otpUri": {
          "type": "column"
        },
        "otpActivatedAt": {
          "type": "column"
        },
        "idpOnly": {
          "type": "column"
        },
        "roles": {
          "type": "column"
        },
        "person": {
          "type": "one",
          "entity": "Person"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "identityId",
        "email",
        "name",
        "otpUri",
        "otpActivatedAt",
        "idpOnly",
        "roles"
      ]
    },
    "University": {
      "name": "University",
      "fields": {
        "id": {
          "type": "column"
        },
        "createdAt": {
          "type": "column"
        },
        "users": {
          "type": "many",
          "entity": "Person"
        },
        "name": {
          "type": "column"
        },
        "country": {
          "type": "one",
          "entity": "Country"
        }
      },
      "scalars": [
        "id",
        "createdAt",
        "name"
      ]
    }
  }
}