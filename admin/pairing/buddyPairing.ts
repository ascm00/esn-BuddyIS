import { EntityAccessor } from "@contember/interface"



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
                if (a.getField('person.studyProgram.name').value === student.getField('person.studyProgram.name').value &&
                    b.getField('person.studyProgram.name').value !== student.getField('person.studyProgram.name').value) return -1
                if (b.getField('person.studyProgram.name').value === student.getField('person.studyProgram.name').value &&
                    a.getField('person.studyProgram.name').value !== student.getField('person.studyProgram.name').value) return 1

                // Second criteria: shared languages
                // const aLanguagesShared = Array.from(a.getEntityList('person.languages')).filter(lang =>
                //     Array.from(student.getEntityList('preferredLanguages')).includes(lang)).length
                // const bLanguagesShared = Array.from(b.getEntityList('person.languages')).filter(lang =>
                //     Array.from(student.getEntityList('preferredLanguages')).includes(lang)).length
                // if (aLanguagesShared > bLanguagesShared) return -1
                // if (aLanguagesShared < bLanguagesShared) return 1

                // Second criteria: international student gender preference
                if (!(a.getField('preferredBuddySex').value === 'dontCare' || b.getField('preferredBuddySex').value === 'dontCare')) {
                  if (a.getField('preferredBuddySex').value === student.getField('person.gender').value && b.getField('preferredBuddySex').value !== student.getField('person.gender').value) return -1
                  if (a.getField('preferredBuddySex').value !== student.getField('person.gender').value && b.getField('preferredBuddySex').value === student.getField('person.gender').value) return 1
                }

                // Third criteria: czech student gender preference
                if (student.getField('preferredSex').value !== 'dontCare') {
                  if (a.getField('person.gender').value === student.getField('preferredSex').value && b.getField('person.gender').value !== student.getField('preferredSex').value) return -1
                  if (a.getField('person.gender').value !== student.getField('preferredSex').value && b.getField('person.gender').value === student.getField('preferredSex').value) return 1
                }

                // Fourth criteria: common country of university
                if (a.getField('person.countryOfUniversity.name').value === student.getField('preferredCountry.name').value && b.getField('person.countryOfUniversity.name').value !== student.getField('preferredCountry.name').value) return -1
                if (a.getField('person.countryOfUniversity.name').value !== student.getField('preferredCountry.name').value && b.getField('person.countryOfUniversity.name').value === student.getField('preferredCountry.name').value) return 1
              

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

/**
 * Returns pairs of czech and international students
 * @param czechStudents List of Entities of czech students
 * @param internationalStudents List of Entities of international students students
 * When using this function a lot of data has to be imported in static render
 * This is how the static render should look like:
 * <>
      <EntityListSubTree entities={'ApplicationCz[semester.isCurrent=true]'} alias={'currentSemesterCzApplications'}>
          <HasOne field={'person'}>
              <Field field={'gender'} />
              <Field field={'firstName'} />
              <Field field={'surname'} />
              <HasOne field={'studyProgram'}>
                  <Field field={'name'} />
              </HasOne>
          </HasOne>
          <HasMany field={'preferredLanguages'}>
              <Field field={'name'} />
          </HasMany>
          <Field field={'preferredSex'} />
          <Field field={'howManyBuddies'} />
      </EntityListSubTree>
          <EntityListSubTree entities={'ApplicationFr[semester.isCurrent=true]'} alias={'currentSemesterFrApplications'}>
              <HasOne field={'person'}>
                  <Field field={'gender'} />
                  <Field field={'firstName'} />
                  <Field field={'surname'} />
                  <HasOne field={'studyProgram'}>
                      <Field field={'name'} />
                  </HasOne>
                  <HasMany field={'languages'}>
                      <Field field={'name'} />
                  </HasMany>
              </HasOne>
              <Field field={'preferredBuddySex'} />     
          </EntityListSubTree>
    </>
  * @returns {pairs, unpairedCzechStudents} Object with buddy pairs and list of unpaired czech students
 */
export const galeShapleyCzechFirst = async(czechStudents: Array<EntityAccessor>,internationalStudents: Array<EntityAccessor>
) => {
  const pairs = new Map<EntityAccessor, EntityAccessor>() // Maping czech and foreign students
  const czechStudentAssignments = new Map<EntityAccessor, number>() // Number of assignments for each czech student

  czechStudents.forEach((student) => {
    czechStudentAssignments.set(student, 0) // Intialize number of assignments for each czech student is 0
  })

  // Get how many buddies can have each czech student
  const getHowManyBuddies = (student: EntityAccessor): number => {
    const value = student.getField('howManyBuddies').value
    return typeof value === 'number' ? value : parseInt(value as string, 10) || 0
  }

  // Prepare preferences for Czech students
  const czechPreferences = await preparePreferencesForCzech(czechStudents, internationalStudents)

  // List of free international students
  let freeInternationalStudents = [...internationalStudents]

  // work in rounds
  let round = 1
  while (freeInternationalStudents.length > 0) {
    // We select Czech students who have less than 'round' assignments and capacity at least 'round'
    const availableCzechStudents = czechStudents.filter((czechStudent) => {
      const assignedCount = czechStudentAssignments.get(czechStudent) || 0
      const maxBuddies = getHowManyBuddies(czechStudent)
      return assignedCount < round && maxBuddies >= round
    })

    if (availableCzechStudents.length === 0) {
      // No Czech student is available in this round
      round++
      continue
    }

    // Every available Czech student will try to assign one international student
    for (const czechStudent of availableCzechStudents) {
      const preferences = czechPreferences.get(czechStudent) || []
      // Delete already assigned foreign students from preferences
      const unassignedPreferences = preferences.filter(
        (intStudent) => !pairs.has(intStudent)
      )

      if (unassignedPreferences.length > 0) {
        const internationalStudent = unassignedPreferences[0] // Choose the most preferable option
        pairs.set(internationalStudent, czechStudent)
        czechStudentAssignments.set(czechStudent, (czechStudentAssignments.get(czechStudent) || 0) + 1)
        freeInternationalStudents = freeInternationalStudents.filter(
          (student) => student !== internationalStudent
        )
      }
    }

    round++
  }

  // Collect unassigned Czech students
  const unpairedCzechStudents = czechStudents.filter((czechStudent) => {
    const assignedCount = czechStudentAssignments.get(czechStudent) || 0
    return assignedCount === 0
  })

  return { pairs, unpairedCzechStudents }
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