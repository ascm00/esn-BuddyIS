import { CheckboxField, FormLayout, InputField, MultiSelectField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { Environment, TextInput } from '@contember/admin'
import { ImageField } from '@app/lib/plugins/image/ImageField'
import { Component, EntitySubTree, Field, HasMany, HasOne, HasRole, useEntity, useEntitySubTree, useIdentity, useEntityBeforePersist, EnvironmentExtensionProvider, identityEnvironmentExtension, usePersist, useEntityPersistSuccess, useRedirect } from '@contember/interface'
import { ConnectUser } from '../ConnectUser'
import { Todo } from '@app/lib/dev'
import { identity$ } from '@contember/graphql-client-tenant'
import { ConnectEntity } from '../ConnectEntity'
import Input from 'postcss/lib/input'
import { createPayment } from '@app/lib/payment/comgate'
import { Binding } from '@app/lib/binding'
import { Button } from '@app/lib/ui/button'
import React from 'react'

interface RegistrationCreateFormProps {
    isOnWaitingList?: boolean
    isPaid?: boolean
}

export const RegistrationCreateForm = Component<RegistrationCreateFormProps>(
    ({isOnWaitingList, isPaid}) => {
    const entity = useEntity()

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


    // This should be after processing the payment
    useEntityBeforePersist(() => {
        if(isOnWaitingList){
            entity.updateValues({isWaitingList: true})
        }
    })


    useEntityPersistSuccess(async() => {
        if(isPaid && !isOnWaitingList){
            await createPayment(entity)
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
            </EntitySubTree>
            <HasOne field="event">
                <Field field="name" />
                <Field field="fee" />
                <Field field="dietaryRestrictions" />
                <Field field="allergies" />
                <Field field="mandatoryESNcard" />
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


    // This should be after processing the payment
    useEntityBeforePersist(() => {
        if(isOnWaitingList){
            entity.updateValues({isWaitingList: true})
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

            <HasRole role={roles => roles.has('admin') || roles.has('esnMemberRole') || roles.has('coordinator')}>
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
            ></EntitySubTree>
            <Field field={'id'} />
            <HasOne field="personWhoMadeRegistration" />
            <Field field={'payment'} />
            <HasOne field="person">
                <Field field="firstName" />
                <Field field="surname" />
            </HasOne>
            <EntitySubTree entity={'Event(id=$id)'} alias={'currentEvent'}>
                <Field field="name" />
                <Field field="fee" />
                <Field field="dietaryRestrictions" />
                <Field field="allergies" />
                <Field field="mandatoryESNcard" />
            </EntitySubTree>
            <HasOne field="event">
                <Field field="name" />
                <Field field="fee" />
                <Field field="dietaryRestrictions" />
                <Field field="allergies" />
                <Field field="mandatoryESNcard" />
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