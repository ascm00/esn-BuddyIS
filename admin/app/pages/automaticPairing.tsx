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
import { useEffect, useState } from 'react'

export default () => {
    
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Automatic buddy pairing 🤖
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
        const [message, setMessage] = useState('Pairing has started. It can take about 30 seconds...')
        const [displayedMessages, setDisplayedMessages] = useState<string[]>([]) 
        const buddyPairs = useEntityListSubTree('buddyPairs')

        const semesterList = useEntityListSubTree('currentSemester')
        let currentSemester : EntityAccessor
        for (const semester of semesterList) {
            currentSemester = semester
            break
        }

        const pair = async () => {
            setIsPairing(true)
            setPairingStarted(true)
    
            try {
                console.log(currentSemesterCzApplications)
                console.log(currentSemesterFrApplications)
                const { pairs, unpairedCzechStudents } = await galeShapleyCzechFirst(currentSemesterCzApplications, currentSemesterFrApplications)
                console.log(pairs)
    
                pairs.forEach((czechStudentApplication, internationalStudentApplication) => {
                    if (czechStudentApplication && internationalStudentApplication) {
                        internationalStudentApplication.getField('status').updateValue('paired')

                        buddyPairs.createNewEntity(accessor => {
                            accessor().connectEntityAtField('czechStudent', czechStudentApplication.getEntity('person'))
                            accessor().connectEntityAtField('internationalStudent', internationalStudentApplication.getEntity('person'))
                            accessor().connectEntityAtField('semester', currentSemester)
    
                            for (const task of buddyPairTasks) {
                                accessor().getEntityList('tasks').createNewEntity(taskAccessor => {
                                    taskAccessor().getField('description').updateValue(task)
                                })
                            }
                        })

                        const logMessage = `${czechStudentApplication.getField('person.firstName').value} ${czechStudentApplication.getField('person.surname').value} - ${internationalStudentApplication.getField('person.firstName').value} ${internationalStudentApplication.getField('person.surname').value}`
                        setMessage(message => message + '\n' + logMessage)

                    } else {
                        console.log('Error in automatic pairing')
                    }
                })

                setMessage(message => message + '\n' + 'Pairing is finished. Click "Save buddy pairs" to save the results.')
    
            } catch (error) {
                setMessage('Error occurred during pairing.')
                console.error(error)
            } finally {
                setIsPairing(false)
                setPairingEnded(true)
            }
        }

        // Gradually display messages
        useEffect(() => {
            if (pairingStarted) {
                const messageArray = message.split('\n')
                let index = 0

                const interval = setInterval(() => {
                    if (index < messageArray.length) {
                        setDisplayedMessages(prevMessages => [...prevMessages, messageArray[index]])
                        index++
                    } else {
                        clearInterval(interval)
                    }
                }, 20)

                return () => clearInterval(interval)
            }
        }, [message, pairingStarted])

        const terminalStyles = {
            backgroundColor: '#000000',
            color: '#00FF00',
            fontFamily: '"Courier New", Courier, monospace',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
            width: '100%'
        }

        const lineStyles: React.CSSProperties = {
            fontFamily: '"Courier New", Courier, monospace',
            whiteSpace: 'pre',
            padding: '2px 0'
        }

        const cursorStyles: React.CSSProperties = {
            display: 'inline-block',
            width: '8px',
            height: '20px',  // Přidaná výška kurzoru, aby byl viditelný
            backgroundColor: '#00FF00',
            marginLeft: '2px',
            animation: 'blink 1s step-end infinite'
        }

        return (
            <>
                <style>
                    {`
                        @keyframes blink {
                            0%, 100% { opacity: 1; }
                            50% { opacity: 0; }
                        }
                    `}
                </style>

                <HasRole role="admin">
                    <div style={terminalStyles}>
                        <h2 style={{ color: '#00FF00', fontFamily: '"Courier New", Courier, monospace' }}>Buddy pairing logs</h2>
                        <div className="space-y-2">
                            {displayedMessages.length > 0 ? (
                                displayedMessages.map((line, index) => (
                                    <div key={index} style={lineStyles}>
                                        <span>&gt; {line}</span>
                                    </div>
                                ))
                            ) : (
                                <div style={lineStyles}>
                                    <span>&gt; Waiting for pairing to start...</span>
                                </div>
                            )}
                        </div>
                        <div style={cursorStyles}></div>
                    </div>
                    
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
                </HasRole>
            </>
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
            
            <EntityListSubTree entities={'ApplicationCz[status.status="toBePaired" && semester.isCurrent=true && notPair!=true]'} alias={'currentSemesterCzApplications'}>
                <Field field={'status.status'} />
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
                <Field field={'howManyBuddiesAssigned.number'} />
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