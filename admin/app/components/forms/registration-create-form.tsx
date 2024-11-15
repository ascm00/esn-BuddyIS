import { CheckboxField, FormLayout, InputField, MultiSelectField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { Environment, TextInput, useEntityPersistError } from '@contember/admin'
import { ImageField } from '@app/lib/plugins/image/ImageField'
import { Component, EntitySubTree, Field, HasMany, HasOne, HasRole, useEntity, useEntitySubTree, useIdentity, useEntityBeforePersist, EnvironmentExtensionProvider, identityEnvironmentExtension, usePersist, useEntityPersistSuccess, useRedirect, generateUuid } from '@contember/interface'
import { ConnectUser } from '../ConnectUser'
import { Todo } from '@app/lib/dev'
import { identity$ } from '@contember/graphql-client-tenant'
import { ConnectEntity } from '../ConnectEntity'
import Input from 'postcss/lib/input'
import { createPayment } from '@app/lib/payment/comgate'
import { Binding } from '@app/lib/binding'
import { Button } from '@app/lib/ui/button'
import React from 'react'
import { checkPaymentStatus } from '@app/lib/payment/paymentStatus'

interface RegistrationCreateFormProps {
    isOnWaitingList?: boolean
    isPaid?: boolean
}

export const RegistrationCreateForm = Component<RegistrationCreateFormProps>(
    ({isOnWaitingList, isPaid}) => {
    const entity = useEntity()
    const identity = useIdentity()
    //connect to current event and logged in user
    const me = useEntitySubTree('me')
    const currentEvent = useEntitySubTree('currentEvent')
    entity.connectEntityAtField('event', currentEvent)
    entity.connectEntityAtField('person', me)

    // check if the user has ESN card filled on his profile and if its mandatory for this event
    const myEsnCardId = entity.getField('person.esnCardId').value ?? undefined
    const mandatoryESNcard = currentEvent.getField('mandatoryESNcard').value ?? undefined

    const allergies = currentEvent.getField('allergies').value ?? undefined
    const dietaryRestrictions = currentEvent.getField('dietaryRestrictions').value ?? undefined
    const capacity = currentEvent.getField<number>('capacity').value ?? 0
    const waitingListNumber = currentEvent.getField<number>('waitingList').value ?? 0
    
    // Check if the user is already registered for this event
    const registrationList = currentEvent.getEntityList('registrations') ?? undefined
    const registered = () => { 
		if(identity?.person?.id) {
			for (const registration of registrationList) {
				let id = registration.getField('person.tenantPerson.id').value
				if((identity.person.id === id) && (registration.getField('accepted').value)){
					return true
				}
			}
		}
		return false
	}

    // Check if something changed in the event capacity
    useEntityBeforePersist(() => {
        // if(isPaid && !isOnWaitingList){
        //      entity.updateValues({accepted: false})
        // }
        
        const signedUpNumber = currentEvent.getField<number>('registeredCount.registered_count').value ?? 0

        if(registered()){
            return () => { entity.addError('You are already registered for this event. ') }
        } else if(signedUpNumber >= (capacity + waitingListNumber)){
            return () => { entity.addError('Unfortunately someone else was faster and the capacity was reached.') }
        } else if((signedUpNumber >= capacity) && (signedUpNumber < (capacity + waitingListNumber))){
            if(isOnWaitingList){
                entity.updateValues({isWaitingList: true})
            } else {
                return () => { entity.addError('Unfortunately someone else was faster and the capacity was reached. But you can join waiting list.') }
            }
        }
    })


    // When event registration is not for free - accepted is false and is set to true when payment is created
    useEntityPersistSuccess(async() => {
        if(isPaid && !isOnWaitingList){
            await createPayment(entity)
            await checkPaymentStatus(entity)
        }
    })
    
    return (
        <>
        <FormLayout>
            {!isPaid &&
            <div>
                <h2 className="text-2xl font-semibold">Registration</h2>
                <hr className="my-2 border-gray-200" />
            </div>
            }
            <Field field="event.dietaryRestrictions" />

            
            { mandatoryESNcard &&
            <div className='pb-3'>
                <HasOne field={'person'}>
                    <InputField field="esnCardId" label="ESN Card Number *" required />
                </HasOne>
                <p className="text-xs text-gray-500">Please fill your ESN Card Number. You cannot register without filling it.</p>
            </div>}

            { dietaryRestrictions &&
            <div className='pb-3'>
                <MultiSelectField field={'dietaryRestrictions'} label="Dietary Restrictions" options={'DietaryRestrictions'}>
                    <Field field={'name'} />
                </MultiSelectField>
                <p className="text-xs text-gray-500">Please select all dietary restrictions that you have. If you don't have any, leave it blank.</p>
            </div>}

            { allergies && <div className='pb-3'>
                <MultiSelectField field={'allergies'} label="Allergies" options={'Allergy'}>
                    <Field field={'name'} />
                </MultiSelectField>
                <p className="text-xs text-gray-500">Please select all allergies that you have. If you don't have any allergies, leave it blank.</p>
            </div>}

            <div className='pb-3'>
                <TextareaField field="note" label="Note" />
                <p className="text-xs text-gray-500">Any additional notes to organizers. For example some limitations. Write "NO" if you don't have any.</p>
            </div>
        </FormLayout>
        </>)
    },
    (_, env) => (
        <>
            <Field field={'id'} />
            <HasOne field="personWhoMadeRegistration" />
            <Field field={'payment'} />
            <HasOne field="person">
                <Field field="firstName" />
                <Field field="surname" />
                <Field field="phoneNumber" />
                <Field field="esnCardId" />
                <Field field="id" />
                <HasOne field="tenantPerson">
                    <Field field="email" />
                </HasOne>
            </HasOne>
            <EntitySubTree
                entity={`Person(tenantPerson.id='${env.getExtension(identityEnvironmentExtension).identity?.person?.id}')`}
                alias="me"
            >
                <Field field="firstName" />
                <Field field="surname" />
                <Field field="phoneNumber" />
                <Field field="esnCardId" />
                <Field field="id" />
                <HasOne field="tenantPerson">
                    <Field field="email" />
                </HasOne>
            </EntitySubTree>
            <EntitySubTree entity={'Event(id=$id)'} alias={'currentEvent'}>
                <Field field="name" />
                <Field field="fee" />
                <Field field="dietaryRestrictions" />
                <Field field="allergies" />
                <Field field="mandatoryESNcard" />
                <Field field="capacity" />
                <Field field="registeredCount.registered_count" />
                <Field field="waitingList" />
                <HasMany field="registrations">
                    <Field field="accepted" />
                    <Field field="person.tenantPerson.id" />
                </HasMany>
            </EntitySubTree>
            <HasOne field="event">
                <Field field="name" />
                <Field field="fee" />
                <Field field="dietaryRestrictions" />
                <Field field="allergies" />
                <Field field="mandatoryESNcard" />
                <Field field="capacity" />
                <Field field="registeredCount.registered_count" />
                <Field field="waitingList" />
                <HasMany field="registrations">
                    <Field field="accepted" />
                    <Field field="person.tenantPerson.id" />
                </HasMany>
            </HasOne>
            <HasMany field="dietaryRestrictions">
                <Field field="name" />
            </HasMany>
            <HasMany field="allergies">
                <Field field="name" />
            </HasMany>
            <Field field="note" />
            <Field field="isWaitingList" />
            <Field field="accepted" />
        </>
    )
)

export const RegistrationAdminCreateForm = Component<RegistrationCreateFormProps>(
    ({isOnWaitingList, isPaid}) => {
    
    const entity = useEntity()

    //connect to current event and logged in user
    const me = useEntitySubTree('me')
    const currentEvent = useEntitySubTree('currentEvent')
    entity.connectEntityAtField('event', currentEvent)
    entity.connectEntityAtField('personWhoMadeRegistration', me)


    // check if the user has ESN card filled on his profile and if its mandatory for this event
    const mandatoryESNcard = currentEvent.getField('mandatoryESNcard').value ?? undefined

    const allergies = currentEvent.getField('allergies').value ?? undefined
    const dietaryRestrictions = currentEvent.getField('dietaryRestrictions').value ?? undefined
    const capacity = currentEvent.getField<number>('capacity').value ?? 0
    const waitingListNumber = currentEvent.getField<number>('waitingList').value ?? 0

    const registrationList = currentEvent.getEntityList('registrations') ?? undefined
    const signedUserId = entity.getField('person.id').value?.toString() ?? undefined
    
    const registered = () : boolean => { 
		if(signedUserId) {
			for (const registration of registrationList) {
				let id = registration.getField('person.id').value?.toString()
                let accepted = registration.getField('accepted').value
				if((signedUserId === id) && accepted){
					return true
				}
			}
		}
        return false
	}

    // This should be after processing the payment
    useEntityBeforePersist(() => {
        console.log('useEntityBeforePersist')
        const signedUpNumber = currentEvent.getField<number>('registeredCount.registered_count').value ?? 0
        if(registered()){
            return () => { entity.addError('User is already registered for this event.') }
        } else if(signedUpNumber >= (capacity + waitingListNumber)){
            return () => { entity.addError('Unfortunately someone else was faster and the capacity was reached. You have to increase the capacity of the event.') }
        } else if((signedUpNumber >= capacity) && (signedUpNumber < (capacity + waitingListNumber))){
            if(isOnWaitingList){
                entity.updateValues({isWaitingList: true})
            } else {
                return () => { entity.addError('Unfortunately someone else was faster and the capacity was reached. You have to increase the capacity of the event.') }
            }
        }

    })
    
    return (
        <>
        <FormLayout>
            {!isPaid &&
            <div>
                <h2 className="text-2xl font-semibold">Registration</h2>
                <hr className="my-2 border-gray-200" />
            </div>
            }
            <Field field="event.dietaryRestrictions" />

            <HasRole role={roles => roles.has('admin') || roles.has('esnMember') || roles.has('coordinator')}>
                <SelectField field={'person'} label="Person" options={'Person'}>
                    <Field field={'firstName'} /> {' '} <Field field={'surname'} />
                </SelectField>
            </HasRole>

            {isPaid &&
            <RadioEnumField field="payment" label="Payment" required options={{paid: 'Paid', unpaid: 'Unpaid'}} />
            }

            { dietaryRestrictions &&
            <div className='pb-3'>
                <MultiSelectField field={'dietaryRestrictions'} label="Dietary Restrictions" options={'DietaryRestrictions'}>
                    <Field field={'name'} />
                </MultiSelectField>
                <p className="text-xs text-gray-500">Please select all dietary restrictions that you have. If you don't have any, leave it blank.</p>
            </div>}

            { allergies && <div className='pb-3'>
                <MultiSelectField field={'allergies'} label="Allergies" options={'Allergy'}>
                    <Field field={'name'} />
                </MultiSelectField>
                <p className="text-xs text-gray-500">Please select all allergies that you have. If you don't have any allergies, leave it blank.</p>
            </div>}

            <div className='pb-3'>
                <TextareaField field="note" label="Note" />
                <p className="text-xs text-gray-500">Any additional notes to organizers. For example some limitations. Write "NO" if you don't have any.</p>
            </div>
        </FormLayout>
        </>)  
    }, (_, env) => (
        <>
            <EntitySubTree
                entity={`Person(tenantPerson.id='${env.getExtension(identityEnvironmentExtension).identity?.person?.id}')`}
                alias="me"
            >
                <Field field="firstName" />
                <Field field="surname" />
            </EntitySubTree>
            <Field field={'id'} />
            <HasOne field="personWhoMadeRegistration" />
            <Field field={'payment'} />
            <HasOne field="person">
                <Field field="firstName" />
                <Field field="surname" />
                <Field field="id" />
            </HasOne>
            <EntitySubTree entity={'Event(id=$id)'} alias={'currentEvent'}>
                <Field field="name" />
                <Field field="fee" />
                <Field field="dietaryRestrictions" />
                <Field field="allergies" />
                <Field field="mandatoryESNcard" />
                <Field field="capacity" />
                <Field field="waitingList" />
                <Field field="registeredCount.registered_count" />
                <HasMany field="registrations">
                    <Field field="accepted" />
                    <Field field="person.id" />
                </HasMany>
            </EntitySubTree>
            <HasOne field="event">
                <Field field="name" />
                <Field field="fee" />
                <Field field="dietaryRestrictions" />
                <Field field="allergies" />
                <Field field="mandatoryESNcard" />
                <Field field="capacity" />
                <Field field="waitingList" />
                <Field field="registeredCount.registered_count" />
                <HasMany field="registrations">
                    <Field field="accepted" />
                    <Field field="person.id" />
                </HasMany>
            </HasOne>
            <HasMany field="dietaryRestrictions">
                <Field field="name" />
            </HasMany>
            <HasMany field="allergies">
                <Field field="name" />
            </HasMany>
            <Field field="note" />
            <Field field="isWaitingList" />
        </>
    )
)