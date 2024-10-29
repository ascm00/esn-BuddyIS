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
						Automatic coordinator assignment
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="BuddyPair" isCreating>
                        <AutomaticCoordinatorAssignment />
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}

const AutomaticCoordinatorAssignment = Component(() => {
	const [isPairing, setIsPairing] = useState(false)
    const [pairingEnded, setPairingEnded] = useState(false)
    const [pairingStarted, setPairingStarted] = useState(false)
	const [message, setMessage] = useState('Assignment has started...')
	const [displayedMessages, setDisplayedMessages] = useState<string[]>([])

	const currentSemesterBuddyPairs = Array.from(useEntityListSubTree('currentSemesterBuddyPairs'))
	const coordinators = Array.from(useEntityListSubTree('coordinators'))

	const assignCoordinator = async () => {
		setIsPairing(true)
		setPairingStarted(true)

		try {
			// assign coordinators to buddy pairs
			let i = 0
			for (const buddyPair of currentSemesterBuddyPairs) {
				if (i >= coordinators.length) {
					i = 0
				}
				buddyPair.connectEntityAtField('coordinator', coordinators[i])
				const logMessage = `${coordinators[i].getField('firstName').value} ${coordinators[i].getField('surname').value} : ${buddyPair.getField('czechStudent.firstName').value} ${buddyPair.getField('czechStudent.surname').value} - ${buddyPair.getField('internationalStudent.firstName').value} ${buddyPair.getField('internationalStudent.surname').value}`
                setMessage(message => message + '\n' + logMessage)
				i++
			}
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
                        <h2 style={{ color: '#00FF00', fontFamily: '"Courier New", Courier, monospace' }}>Coordinator assignment logs</h2>
                        <div className="space-y-2">
                            {displayedMessages.length > 0 ? (
                                displayedMessages.map((line, index) => (
                                    <div key={index} style={lineStyles}>
                                        <span>&gt; {line}</span>
                                    </div>
                                ))
                            ) : (
                                <div style={lineStyles}>
                                    <span>&gt; Waiting for assignment to start...</span>
                                </div>
                            )}
                        </div>
                        <div style={cursorStyles}></div>
                    </div>
                    
                    {!pairingStarted &&
                        <Slots.Actions>
                            <Button onClick={assignCoordinator} disabled={isPairing}>
                                Start automatic coordinator assignment
                            </Button>
                        </Slots.Actions>
                    }
                    {pairingEnded &&
                        <div>
                            <Slots.Actions>
                                <RedirectOnPersist to={'buddyPairs'} />
                                <PersistButton label="Save coordinator" />
                            </Slots.Actions>
                        </div>
                    }
                </HasRole>
		</>
	)
}, () => (
	<>
		<EntityListSubTree entities="BuddyPair[semester.isCurrent=true &&coordinator.id=null]" alias={'currentSemesterBuddyPairs'}>
			<Field field="id" />
			<HasOne field="coordinator">
				<Field field="firstName" />
				<Field field="surname" />
				<Field field="id" />
			</HasOne>
			<HasOne field="czechStudent">
				<Field field="firstName" />
				<Field field="surname" />
			</HasOne>
			<HasOne field="internationalStudent">
				<Field field="firstName" />
				<Field field="surname" />
			</HasOne>
		</EntityListSubTree>
		<EntityListSubTree entities="Person[tenantPerson.roles='coordinator']" alias={'coordinators'}>
			<Field field="firstName" />
			<Field field="surname" />
			<Field field="id" />
		</EntityListSubTree>
	</>
))