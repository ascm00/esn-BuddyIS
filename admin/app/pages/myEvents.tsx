import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridEnumColumn, DataGridLoader, DataGridNoResults, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Component, EntitySubTree, Field, HasOne, HasMany, HasRole, identityEnvironmentExtension, Link, useEntity, useIdentity, useProjectUserRoles, useEntitySubTree } from '@contember/interface'
import { Input } from '@app/lib/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableWrapper } from '@app/lib/ui/table'
import { formatPaymentStatusTag } from '@app/lib/formatting/paymentStatus'

export default () => {

	const roles = useProjectUserRoles()

	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						My upcoming events 🎈
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
						<MyEvents />
					</>
				</div>
			</Binding>
		</>
	)
}

const MyEvents = Component(
	() => {
		const entityId = useIdentity()?.person?.id
        const currentUser = useEntitySubTree('currentUser')
        const registrations = Array.from(currentUser.getEntityList('registrations'))
        
        registrations.forEach(registration => {
			if(registration.getField('accepted').value === false){
				registrations.splice(registrations.indexOf(registration), 1)
			} else {
				if(registration.getEntity('event').getField('name').value === null){
					registrations.splice(registrations.indexOf(registration), 1)
				}
				const startDate = registration?.getEntity('event')?.getField('startDate')?.value
            	if (typeof startDate === 'string' || typeof startDate === 'number') {
					if (new Date(startDate) < new Date()) {
						registrations.splice(registrations.indexOf(registration), 1)
					}
            	}
			}
        })

        if (registrations.length === 0) {
            return <DataGridNoResults />
        }
        else {
		return(
			<>
				<TableWrapper className="bg-gray-50/50 border rounded-md">
					<Table>
						<TableHeader>
							<TableRow>
                                <TableHead></TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Payment status</TableHead>
								<TableHead>Place</TableHead>
								<TableHead>Start</TableHead>
								<TableHead>End</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{registrations.map((registration, index) => (
								<TableRow key={index}>
									<TableCell>
										<Link to={`eventDetail(id: '${registration?.getEntity('event')?.getField('id')?.value}')`}>
											<Button variant={'secondary'} size={'sm'}>
												Detail
											</Button>
										</Link>
									</TableCell>
                                    <TableCell>{registration?.getEntity('event')?.getField('name')?.value?.toString()}</TableCell>
									<TableCell>{formatPaymentStatusTag(registration?.getField('payment')?.value?.toString() ?? null)}</TableCell>
									<TableCell>{registration?.getEntity('event')?.getField('place')?.value?.toString()}</TableCell>
									<TableCell>
										{registration?.getEntity('event')?.getField('startDate')?.value ? 
											new Date(registration.getEntity('event').getField('startDate')?.value?.toString() ?? '')?.toLocaleString('cs-CZ', {
												year: 'numeric',
												month: '2-digit',
												day: '2-digit',
												hour: '2-digit',
												minute: '2-digit',
											}) : 'N/A'}
									</TableCell>
									<TableCell>
										{registration?.getEntity('event')?.getField('startDate')?.value ? 
											new Date(registration.getEntity('event').getField('endDate')?.value?.toString() ?? '')?.toLocaleString('cs-CZ', {
												year: 'numeric',
												month: '2-digit',
												day: '2-digit',
												hour: '2-digit',
												minute: '2-digit',
											}) : 'N/A'}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableWrapper>
			</>
		)
        }
	}, (_, env) => (
        <>
        <EntitySubTree entity={`Person(tenantPerson.id = '${env.getExtension(identityEnvironmentExtension).identity?.person?.id}')`} alias={'currentUser'}>
            <HasMany field="registrations">
				<Field field={'accepted'} />
				<Field field={'payment'} />
                <HasOne field={`event`}>
                    <Field field="name" />
                    <Field field="startDate" />
                    <Field field="endDate" />
                    <Field field="place" />
                    <Field field="fee" />
                    <Field field="capacity" />
                    <Field field="registeredCount.registered_count" />
                    <Field field="whatsappLink" />
                </HasOne>
            </HasMany>
        </EntitySubTree>
        </>
    )
)
