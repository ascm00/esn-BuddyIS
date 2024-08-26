import { CheckboxField, FormLayout, InputField, MultiSelectField, RadioEnumField, SelectField, TextareaField } from '@app/lib/form'
import { identityEnvironmentExtension } from '@contember/admin'
import { ImageField } from '@app/lib/plugins/image/ImageField'
import { Component, EntitySubTree, Field, HasMany, HasOne, HasRole, useEntity, useEntitySubTree, useIdentity } from '@contember/interface'
import { ConnectUser } from '../ConnectUser'
import { Todo } from '@app/lib/dev'
import { identity$ } from '@contember/graphql-client-tenant'

export const RegistrationCreateForm = Component(
    () => {

    const entity = useEntity()

    const currentEvent = useEntitySubTree('currentEvent')
    entity.connectEntityAtField('event', currentEvent)

    const event = entity.getEntity('event')
    const person = entity.getEntity('person')
    const allergies = currentEvent.getField('allergies').value ?? undefined
    const dietaryRestrictions = currentEvent.getField('dietaryRestrictions').value ?? undefined
    const mandatoryESNcard = currentEvent.getField('name').value ?? undefined
    

    
    return (    
        <FormLayout>
            <div>
                <h2 className="text-2xl font-semibold">Registration</h2>
                <hr className="my-2 border-gray-200" />
            </div>
            <Field field="event.dietaryRestrictions" />

            <HasRole role={roles => roles.has('admin') || roles.has('esnMemberRole')}>
                <SelectField field={'person'} label="Person" options={'Person'}>
                    <Field field={'firstName'} /> {' '} <Field field={'surname'} />
                </SelectField>
            </HasRole>
            {/* <ConnectUser field='person'>
                <Field field={'firstName'} /> {' '} <Field field={'surname'} />
            </ConnectUser> */}

            {/* { (mandatoryESNcard && !esnCardId ) &&
            <div className='pb-3'>
                <InputField field="event.mandatoryESNcard" label="ESN Card Number" />
                <p className="text-xs text-gray-500">Please fill your ESN Card Number</p>
            </div>} */}

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
        </FormLayout>)
    },
    () => (
        <>
            <EntitySubTree entity={'Event(id=$id)'} alias={'currentEvent'}>
                <Field field="name" />
                <Field field="dietaryRestrictions" />
                <Field field="allergies" />
                <Field field="mandatoryESNcard" />
            </EntitySubTree>
            <HasOne field="event">
                <Field field="name" />
                <Field field="dietaryRestrictions" />
                <Field field="allergies" />
                <Field field="mandatoryESNcard" />
            </HasOne>
            <HasOne field="person">
                {/* <Field field="esnCardId" /> */}
                <Field field="firstName" />
                <Field field="surname" />
            </HasOne>
            <HasMany field="dietaryRestrictions">
                <Field field="name" />
            </HasMany>
            <HasMany field="allergies">
                <Field field="name" />
            </HasMany>
            <Field field="note" />
        </>
    )
)
