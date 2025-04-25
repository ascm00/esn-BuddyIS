import { EntityAccessor } from "@contember/interface"

const preparePreferencesForInternational = (czechStudents: Array<EntityAccessor>, internationalStudents: Array<EntityAccessor>) => {
    const preferences = new Map<EntityAccessor, Array<EntityAccessor>>()

    internationalStudents.forEach(student => {

        const sortedCzechStudents = czechStudents
            .filter(s => s !== student)
            .sort((a, b) => {
                // First criteria: study program
                if (student.getField('person.studyProgram.name').value === 'Exchange program') {
                    if (a.getField('person.studyProgram.name').value === 'Czech program' &&
                        b.getField('person.studyProgram.name').value !== 'Czech program') return -1
                    if (b.getField('person.studyProgram.name').value === 'Czech program' &&
                        a.getField('person.studyProgram.name').value !== 'Czech program') return 1
                } else {
                    if (a.getField('person.studyProgram.name').value === student.getField('person.studyProgram.name').value &&
                        b.getField('person.studyProgram.name').value !== student.getField('person.studyProgram.name').value) return -1
                    if (b.getField('person.studyProgram.name').value === student.getField('person.studyProgram.name').value &&
                        a.getField('person.studyProgram.name').value !== student.getField('person.studyProgram.name').value) return 1
                }

                // Second criteria: international student gender preference
                if (student.getField('preferredBuddySex').value !== 'dontCare') {
                  if (a.getField('person.gender').value === student.getField('preferredBuddySex').value && 
                      b.getField('person.gender').value !== student.getField('preferredBuddySex').value) return -1
                  if (a.getField('person.gender').value !== student.getField('preferredBuddySex').value && 
                      b.getField('person.gender').value === student.getField('preferredBuddySex').value) return 1
                }

                return 0
            })

        preferences.set(student, sortedCzechStudents)
    })

    return preferences
}

const preparePreferencesForCzech = (czechStudents: Array<EntityAccessor>, internationalStudents: Array<EntityAccessor>) => {
  const preferences = new Map<EntityAccessor, Array<EntityAccessor>>()

  czechStudents.forEach(student => {
      
      const preferredLanguages = new Set(
          Array.from(student.getEntityList('preferredLanguages')).map(lang => lang.getField('name').value)
      )

      const sortedInternationalStudents = internationalStudents
          .filter(s => s !== student)
          .sort((a, b) => {
              // First criteria: study program
              if (student.getField('person.studyProgram.name').value === 'Czech program') {
                  if (a.getField('person.studyProgram.name').value === 'Exchange program' &&
                      b.getField('person.studyProgram.name').value !== 'Exchange program') return -1
                  if (b.getField('person.studyProgram.name').value === 'Exchange program' &&
                      a.getField('person.studyProgram.name').value !== 'Exchange program') return 1
              } else {
                  if (a.getField('person.studyProgram.name').value === student.getField('person.studyProgram.name').value &&
                      b.getField('person.studyProgram.name').value !== student.getField('person.studyProgram.name').value) return -1
                  if (b.getField('person.studyProgram.name').value === student.getField('person.studyProgram.name').value &&
                      a.getField('person.studyProgram.name').value !== student.getField('person.studyProgram.name').value) return 1
              }

              // Second criteria: czech student gender preference
              if (student.getField('preferredSex').value !== 'dontCare') {
                if (a.getField('person.gender').value === student.getField('preferredSex').value && 
                    b.getField('person.gender').value !== student.getField('preferredSex').value) return -1
                if (a.getField('person.gender').value !== student.getField('preferredSex').value && 
                    b.getField('person.gender').value === student.getField('preferredSex').value) return 1
              }

              // Third criteria: international student gender preference
              if (!(a.getField('preferredBuddySex').value === 'dontCare' || b.getField('preferredBuddySex').value === 'dontCare')) {
                if (a.getField('preferredBuddySex').value === student.getField('person.gender').value && 
                    b.getField('preferredBuddySex').value !== student.getField('person.gender').value) return -1
                if (a.getField('preferredBuddySex').value !== student.getField('person.gender').value && 
                    b.getField('preferredBuddySex').value === student.getField('person.gender').value) return 1
              }

              // Fourth criteria: common country of university
              const studentPreferredCountry = student.getField('preferredCountry.name').value
              const aCountry = a.getField('person.countryOfUniversity.name').value
              const bCountry = b.getField('person.countryOfUniversity.name').value
              
              if (aCountry === studentPreferredCountry && bCountry !== studentPreferredCountry) return -1
              if (aCountry !== studentPreferredCountry && bCountry === studentPreferredCountry) return 1

              // Fifth criteria: common languages
              const countSharedLanguages = (internationalStudent: EntityAccessor) => {
                  const intStudentLanguages = Array.from(internationalStudent.getEntityList('person.languages')).map(lang => lang.getField('name').value)
                  
                  let commonLanguages = 0
                  intStudentLanguages.forEach(lang => {
                    if (preferredLanguages.has(lang)) {
                      commonLanguages++
                    }
                  })
                  return commonLanguages
              }
                
              const aShared = countSharedLanguages(a)
              const bShared = countSharedLanguages(b)
              
              if (aShared > bShared) return -1
              if (aShared < bShared) return 1

              return 0
          })

      preferences.set(student, sortedInternationalStudents)
  })

  return preferences
}

// Function to get the number of already assigned buddies to a Czech student
const getAssignedBuddiesCount = (student: EntityAccessor): number => {
  const value = student.getField('howManyBuddiesAssigned.number').value
  return typeof value === 'number' ? value : parseInt(value as string, 10) || 0
}

// Function to get the maximum number of buddies a Czech student can have
const getMaxBuddiesCount = (student: EntityAccessor): number => {
  const value = student.getField('howManyBuddies').value
  return typeof value === 'number' ? value : parseInt(value as string, 10) || 0
}

// Function to evaluate preference (lower value = higher preference)
const getPreferenceRank = (studentPreferences: Array<EntityAccessor>, preferredStudent: EntityAccessor): number => {
  const index = studentPreferences.findIndex(s => s === preferredStudent)
  return index === -1 ? Infinity : index
}

/**
 * Gale-Shapley algorithm for buddy pairing
 * - Czech students propose (proposers)
 * - International students accept/reject (accepters)
 * - Each international student must get a Czech buddy
 * - First each Czech student is assigned at most one international student before starting the second round
 * @param czechStudents List of Czech students
 * @param internationalStudents List of international students
 * @returns Object containing pairs and a list of unassigned Czech students
 */
export const galeShapleyCzechFirst = async (czechStudents: Array<EntityAccessor>, internationalStudents: Array<EntityAccessor>) => {
  const finalPairs = new Map<EntityAccessor, EntityAccessor>() // International student -> Czech buddy
  const czechStudentAssignments = new Map<EntityAccessor, number>() // Number of assignments for each Czech student

  // Initialize assignment count for each Czech student
  czechStudents.forEach(student => {
    czechStudentAssignments.set(student, 0)
  })

  // Create preference lists
  const czechPreferences = await preparePreferencesForCzech(czechStudents, internationalStudents)
  const internationalPreferences = await preparePreferencesForInternational(czechStudents, internationalStudents)

  // List of unassigned Czech students
  let unassignedCzechStudents = [...czechStudents]

  // Copy of preference lists for dynamic updating
  const remainingCzechPreferences = new Map<EntityAccessor, Array<EntityAccessor>>()
  czechStudents.forEach(student => {
    remainingCzechPreferences.set(student, [...(czechPreferences.get(student) || [])])
  })

  // PHASE 1: Each Czech student is assigned at most one international student
  while (unassignedCzechStudents.length > 0) {
    const czechStudent = unassignedCzechStudents[0]

    if (getMaxBuddiesCount(czechStudent) <= 0) {
      unassignedCzechStudents.shift()
      continue
    }

    const preferences = remainingCzechPreferences.get(czechStudent) || []

    if (preferences.length === 0) {
      unassignedCzechStudents.shift()
      continue
    }

    const intStudent = preferences[0]
    preferences.shift()
    remainingCzechPreferences.set(czechStudent, preferences)

    const currentCzech = finalPairs.get(intStudent)

    if (!currentCzech) {
      finalPairs.set(intStudent, czechStudent)
      czechStudentAssignments.set(czechStudent, 1)
      unassignedCzechStudents.shift()
    } else {
      const intPreferences = internationalPreferences.get(intStudent) || []
      const currentRank = getPreferenceRank(intPreferences, currentCzech)
      const newRank = getPreferenceRank(intPreferences, czechStudent)

      if (newRank < currentRank) {
        finalPairs.set(intStudent, czechStudent)
        czechStudentAssignments.set(czechStudent, 1)
        czechStudentAssignments.set(currentCzech, 0)

        unassignedCzechStudents.shift()
        unassignedCzechStudents.push(currentCzech)
      }
    }
  }

  // PHASE 2: Assign remaining unassigned international students

  // Reset Czech preferences without already assigned international students
  czechStudents.forEach(student => {
    remainingCzechPreferences.set(student, [...(czechPreferences.get(student) || [])])

    const updatedPreferences = remainingCzechPreferences.get(student) || []
    const assignedToThisCzech = Array.from(finalPairs.entries())
      .filter(([_, czech]) => czech === student)
      .map(([intStud, _]) => intStud)

    remainingCzechPreferences.set(
      student,
      updatedPreferences.filter(intStudent => !assignedToThisCzech.includes(intStudent))
    )
  })

  const assignedInternationalStudents = new Set(finalPairs.keys())
  const unassignedInternationalStudents = internationalStudents.filter(
    student => !assignedInternationalStudents.has(student)
  )

  // Assign unassigned international students based on their preferences
  for (const intStudent of unassignedInternationalStudents) {
    const intPreferences = internationalPreferences.get(intStudent) || []

    const potentialCzechStudents = intPreferences.filter(czechStudent => {
      const assigned = czechStudentAssignments.get(czechStudent) || 0
      const maxBuddies = getMaxBuddiesCount(czechStudent)
      return assigned < maxBuddies
    })

    if (potentialCzechStudents.length > 0) {
      const czechStudent = potentialCzechStudents[0]
      finalPairs.set(intStudent, czechStudent)
      czechStudentAssignments.set(czechStudent, (czechStudentAssignments.get(czechStudent) || 0) + 1)
    }
  }

  // After assigning all international students, no further matching is performed

  const unpairedCzechStudents = czechStudents.filter(student =>
    (czechStudentAssignments.get(student) || 0) === 0
  )

  return { finalPairs, unpairedCzechStudents }
}


export const buddyPairTasks = [
  'Pick-up',
  'Accomodation',
  'First shopping',
  'Foreign police',
  'Registration in school',
  'Tour de school',
  'Public transport pass'
  ] 