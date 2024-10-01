import { BuddyPairCreateForm } from '@app/components/forms/buddy-pair-create-form'
import { Binding, PersistButton } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Component, EntityAccessor, EntityBaseProps, EntityListSubTree, EntitySubTree, Field, HasMany, HasOne, HasRole, Link, RedirectOnPersist, useEntity, useEntityList, useEntityListSubTree, usePersist } from '@contember/interface'
import { PaintbrushIcon } from 'lucide-react'
import { string } from 'slate'
import { galeShapleyCzechFirst } from '../../pairing/buddyPairing'
import { buddyPairTasks } from '../../pairing/buddyPairing'
import { useState } from 'react'

export default () => {
    
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Automatic buddy pairing
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="BuddyPair" isCreating>
                        <AutomaticPairing />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}

const AutomaticPairing = Component(
    () => {

        const currentSemesterCzApplications = Array.from(useEntityListSubTree('currentSemesterCzApplications'))
        const currentSemesterFrApplications = Array.from(useEntityListSubTree('currentSemesterFrApplications'))
        const persist = usePersist()

        const [isPairing, setIsPairing] = useState(false)
        const [pairingEnded, setPairingEnded] = useState(false)
        const [pairingStarted, setPairingStarted] = useState(false)
        const [message, setMessage] = useState('Pairing has started...')
        const buddyPairs = useEntityListSubTree('buddyPairs')

        // assigns current semester to currentSemester variable. I need to get currentSemester from the static render
        const semesterList = useEntityListSubTree('currentSemester')
        let currentSemester : EntityAccessor
        for (const semester of semesterList) {
            currentSemester = semester
            break
        }


        //const pairs = galeShapleyInternationalFirst(currentSemesterCzApplications, currentSemesterFrApplications)

        const pair = async () => {
            setIsPairing(true)
            setPairingStarted(true)
    
            try {
                const { pairs, unpairedCzechStudents } = await galeShapleyCzechFirst(currentSemesterCzApplications, currentSemesterFrApplications)
    
                pairs.forEach((czechStudentApplication, internationalStudentApplication) => {
                    if (czechStudentApplication && internationalStudentApplication) {

                        czechStudentApplication.getField('status').updateValue('paired')
                        internationalStudentApplication.getField('status').updateValue('paired')

                        buddyPairs.createNewEntity(accessor => {
                            // Connect the czech and international student to the buddy pair
                            accessor().connectEntityAtField('czechStudent', czechStudentApplication.getEntity('person'))
                            accessor().connectEntityAtField('internationalStudent', internationalStudentApplication.getEntity('person'))
                            accessor().connectEntityAtField('semester', currentSemester)
    
                            // Create all tasks for the buddy pair
                            for (const task of buddyPairTasks) {
                                accessor().getEntityList('tasks').createNewEntity(taskAccessor => {
                                    taskAccessor().getField('description').updateValue(task)
                                })
                            }
                        })

                        setMessage(message => message + '\n' + czechStudentApplication.getField('person.firstName').value + ' ' + czechStudentApplication.getField('person.surname').value + ' - ' + internationalStudentApplication.getField('person.firstName').value + ' ' + internationalStudentApplication.getField('person.surname').value)

                    } else {
                        console.log('Error in automatic pairing')
                    }
                })

                setMessage(message => message + '\n' + 'Pairing is finished. Thank you for your patience. Click "Save buddy pairs" to save the results.')
    
            } catch (error) {
                setMessage('Error occurred during pairing.')
                console.error(error)
            } finally {
                setIsPairing(false)
                setPairingEnded(true)
            }
        }
        // pairs.forEach((czechStudent, internationalStudent) => {
        //     if (czechStudent && internationalStudent) {
        //         console.log(czechStudent.getField('person.firstName').value, czechStudent.getField('person.surname').value + ' - ' + internationalStudent.getField('person.firstName').value, internationalStudent.getField('person.surname').value)
        //     } else {
        //         console.log('Error in automatic pairing')
        //     }
        // })
        


        return (
            <HasRole role="admin">
                {!pairingStarted &&
                    <Slots.Actions>
                        <Button onClick={pair} disabled={isPairing}>
                            Start automatic pairing
                        </Button>
                    </Slots.Actions>
                }
                {pairingEnded &&
                    <div>
                        <Slots.Actions>
                            <RedirectOnPersist to={'buddyPairs'} />
                            <PersistButton label="Save buddy pairs" />
                        </Slots.Actions>
                    </div>
                }
                {(message && message !== 'Pairing has started...') && 
                    <div className="bg-black p-6 rounded-lg shadow-lg w-full">
                    <h2 className="text-xl font-semibold mb-4 text-green-500 font-mono">Terminal Log</h2>
                    <div className="space-y-2">
                      {message.split('\n').map((line, index) => (
                        <div key={index} className="p-2 text-green-500 font-mono">
                          <span>&gt; {line}</span>
                        </div>
                      ))}
                    </div>
                  </div>           
                }
            </HasRole>
        )
    }, () => (
        <>
            <EntityListSubTree
				entities="Semester[isCurrent=true]"
				alias={'currentSemester'}
			/>
            <EntityListSubTree entities={'BuddyPair'} alias={'buddyPairs'}>
                <HasOne field={'czechStudent'} />
                <HasOne field={'internationalStudent'} />
                <HasMany field={'tasks'}>
                    <Field field={'description'} />
                </HasMany>
                <HasOne field={'semester'} />
            </EntityListSubTree>
            
            <EntityListSubTree entities={'ApplicationCz[status="toBePaired" && semester.isCurrent=true]'} alias={'currentSemesterCzApplications'}>
                <Field field={'status'} />
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
                <Field field={'preferredCountry.name'} />
                <Field field={'howManyBuddies'} />
            </EntityListSubTree>
            <EntityListSubTree entities={'ApplicationFr[status="toBePaired" && semester.isCurrent=true]'} alias={'currentSemesterFrApplications'}>
                <Field field={'status'} />
                <HasOne field={'person'}>
                    <Field field={'gender'} />
                    <Field field={'countryOfUniversity.name'} />
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
    )
)
  
  



