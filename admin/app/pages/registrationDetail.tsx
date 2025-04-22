import { RegistrationAdminCreateForm } from '@app/components/forms/registration-create-form'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { CurrentEntityLazyModalEdit } from '@app/lib/buttons/modalEdit'
import { Todo } from '@app/lib/dev'
import { formatBoolean } from '@app/lib/formatting'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { Component, EntitySubTree, Field, HasMany, HasOne, HasRole, identityEnvironmentExtension, If, Link, useEntity, useEntitySubTree, useIdentity } from '@contember/interface'
import { useState } from 'react'
import { useEffect } from 'react'

export default () => {
	const identity = useIdentity()

	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Registration detail
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="EventRegistration(id=$id)" isCreating={false}>
						<Slots.Actions>
							<If condition={`[event.contactPerson.tenantPerson.id = "${identity?.person?.id}" && event.contactPerson.tenantPerson.roles != "admin"]`}>
								<If condition={'[accepted = true]'}>
									<Link to={'registrationEdit(id: $entity.id)'}>
										<Button>Edit registration</Button>
									</Link>
									<CurrentEntityLazyModalEdit
										redirectOnSuccess={'eventDetail(id: $entity.event.id)'}
										dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
										saveButton='Delete'
										button={
											<Button variant={'destructive'} className="flex items-center">
												Delete registration
											</Button>
										}
									>
										<SetRegistrationUnaccepted />
									</CurrentEntityLazyModalEdit>
								</If>
							</If>
                            <HasRole role={roles => roles.has('admin')}>
								<If condition={'[accepted = true]'}>
									<Link to={'registrationEdit(id: $entity.id)'}>
										<Button>Edit registration</Button>
									</Link>
									<CurrentEntityLazyModalEdit
										redirectOnSuccess={'eventDetail(id: $entity.event.id)'}
										dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
										saveButton='Delete'
										button={
											<Button variant={'destructive'} className="flex items-center">
												Delete registration
											</Button>
										}
									>
										<SetRegistrationUnaccepted />
									</CurrentEntityLazyModalEdit>
								</If>
							</HasRole>
						</Slots.Actions>
						<TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
							<Table>
								<TableBody>
									<TableRow>
										<TableCell>
											Name
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="person.firstName" /> {' '} <Field field="person.surname" />
										</TableCell>
									</TableRow>
                                    <TableRow>
										<TableCell>
											Waiting list
										</TableCell>
										<TableCell className="font-semibold">
                                            <Field field="isWaitingList" format={formatBoolean} />
										</TableCell>
									</TableRow>
                                    <TableRow>
										<TableCell>
											Payment
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="payment" />
										</TableCell>
									</TableRow>
                                    <TableRow>
										<TableCell>
											Comgate payment ID
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="paymentId" />
										</TableCell>
									</TableRow>
                                    <TableRow>
										<TableCell>
											Person email
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="person.tenantPerson.email" />
										</TableCell>
									</TableRow>
                                    <TableRow>
										<TableCell>
											Person phone number
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="person.phoneNumber" />
										</TableCell>
									</TableRow>
                                    <TableRow>
										<TableCell>
											Person InSIS username
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="person.inSISusername" />
										</TableCell>
									</TableRow>
                                    <TableRow>
										<TableCell>
											Person ESNcard ID
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="person.esnCardId" />
										</TableCell>
									</TableRow>
                                    <TableRow>
										<TableCell>
											Person allergies
										</TableCell>
										<TableCell className="font-semibold">
											<HasMany field="allergies">
                                                <Field field="name" />
                                            </HasMany>
										</TableCell>
									</TableRow>
                                    <TableRow>
										<TableCell>
											Person dietary restrictions
										</TableCell>
										<TableCell className="font-semibold">
											<HasMany field="dietaryRestrictions">
                                                <Field field="name" />
                                            </HasMany>
										</TableCell>
									</TableRow>
                                    <TableRow>
										<TableCell>
											Note
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="note" />
										</TableCell>
									</TableRow>
                                    <TableRow>
										<TableCell>
											Manually registered by
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="personWhoMadeRegistration.firstName" />{' '}<Field field="personWhoMadeRegistration.surname" />
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											Deleted by
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="deletedByPerson.firstName" />{' '}<Field field="deletedByPerson.surname" />
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableWrapper>
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}

const DeleteRegistration = Component(() => {

	// const entity = useEntity()
	// const me = useEntitySubTree('me')
	// entity.connectEntityAtField('deletedByPerson', me)
	// entity.getField('accepted').updateValue(false)

    return (
		<CurrentEntityLazyModalEdit
			redirectOnSuccess={'eventDetail(id: $entity.event.id)'}
			dialogProps={{ className: 'overflow-y-auto max-h-screen' }}
			saveButton='Delete'
			buttonContent={
				<span className="flex items-center">
					Delete registration
				</span>
			}
		>
			<SetRegistrationUnaccepted />
		</CurrentEntityLazyModalEdit>
    )
}, (_, env)=>(
    <>
	 	<EntitySubTree
			entity={`Person(tenantPerson.id='${env.getExtension(identityEnvironmentExtension).identity?.person?.id}')`}
			alias="me"
		>
			<Field field="firstName" />
			<Field field="surname" />
		</EntitySubTree>
        <HasOne field="event">
            <Field field="id" />
        </HasOne>
		<Field field={'accepted'} />
		<HasOne field="deletedByPerson" />
		
    </>
))

const SetRegistrationUnaccepted = Component(() => {
	const entity = useEntity()
	const me = useEntitySubTree('me')
	entity.connectEntityAtField('deletedByPerson', me)
	entity.getField('accepted').updateValue(false)

    return (
		<div>Do you really want to delete this registration?</div>
    )
}, (_, env)=>(
    <>
	 	<EntitySubTree
			entity={`Person(tenantPerson.id='${env.getExtension(identityEnvironmentExtension).identity?.person?.id}')`}
			alias="me"
		>
			<Field field="firstName" />
			<Field field="surname" />
		</EntitySubTree>
        <HasOne field="event">
            <Field field="id" />
        </HasOne>
		<Field field={'accepted'} />
		<HasOne field="deletedByPerson" />
		
    </>
))