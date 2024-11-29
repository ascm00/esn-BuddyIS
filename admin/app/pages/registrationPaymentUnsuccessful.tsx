import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { formatDateTime } from '@app/lib/formatting'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { EntitySubTree, Field, HasMany, HasRole, Link } from '@contember/interface'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Payment unsucessful - please register again ❌
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity="Event(id=$id)" isCreating={false}>
                    <div className="flex gap-8 flex-col md:flex-row">
                        <div className="w-full gap-8 flex flex-col">
                            <TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                Event
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                <Field field="name" />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Contact person
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                <Field field="contactPerson.firstName" /> {' '} <Field field="contactPerson.surname" /> <br></br> <Field field="contactPerson.tenantPerson.email" /> <br></br> <Field field="contactPerson.phoneNumber" />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Event starts
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                <Field field="startDate" format={formatDateTime} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Event ends
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                <Field field="endDate" format={formatDateTime} />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Place
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                <Field field="place" />
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                Whatsapp link
                                            </TableCell>
                                            <TableCell className="font-semibold">
                                                <Field field="whatsappLink" />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableWrapper>
                        </div>
                        <div className="w-full gap-8 flex flex-col">
                            <TableWrapper className="bg-gray-50/50 h-fit border rounded-md">
                                <Table>
                                    <TableRow>
                                        <TableCell>
                                            Payment was cancelled
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-semibold">
                                            Payment was cancelled and your registration was deleted. If you want to attend, register again.
                                        </TableCell>
                                    </TableRow>
                                </Table>
                            </TableWrapper>
                        </div>
                    </div>
					</EntitySubTree>
				</div>
			</Binding>
		</>
	)
}
