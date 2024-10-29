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
import { Component, EntitySubTree, Field, HasMany, HasOne, HasRole, Link, useEntity } from '@contember/interface'
import { useState } from 'react'
import { useEffect } from 'react'

export default () => {

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
                            <HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('esnMember')}>
								<DeleteRegistration />
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
											Person inSIS username
										</TableCell>
										<TableCell className="font-semibold">
											<Field field="person.xname" />
										</TableCell>
									</TableRow>
                                    <TableRow>
										<TableCell>
											Person ESN Card ID
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
											<Field field="personWhoMadeRegistration.firstName" /> {' '} <Field field="personWhoMadeRegistration.surname" />
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

    return (
        <DeleteEntityModalButton 
            message="Do you really want to delete this registration?"
            deleteMessage="Delete registration"
            cancelTo={`eventDetail(id: $entity.event.id)`}
            afterPersistTo={`events`}
        >
            <Button variant={'destructive'}>
                Delete registration
            </Button>
        </DeleteEntityModalButton>
    )
}, ()=>(
    <>
        <HasOne field="event">
            <Field field="id" />
        </HasOne>
    </>
))