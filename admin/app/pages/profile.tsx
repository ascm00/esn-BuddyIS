import { ImageFieldView, ProfilePictureFieldView } from '@app/components/fieldViews/ImageFieldView'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DataGrid, DataGridColumn, DataGridDateColumn, DataGridEnumColumn, DataGridHasManyFilter, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridNumberColumn, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar } from '@app/lib/datagrid'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { EntitySubTree, Field, HasRole, Link, useIdentity } from '@contember/interface'

export default () => {
    const myId = useIdentity()?.person?.id
    console.log(myId)


	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						My profile 👤
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<EntitySubTree entity={`Person(tenantPerson.id='${myId}')`} isCreating={false}>
							<Slots.Actions>
								<Link to="personEdit(id: $entity.id)">
									<Button>
										Edit profile
									</Button>
								</Link>
							</Slots.Actions>
                        <div className="flex gap-8 flex-col md:flex-row">
							<div className="w-full gap-8 flex flex-col">
                                <TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>
                                                    First name
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    <Field field="firstName" />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    Surname
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    <Field field="surname" />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    InSIS username
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    <Field field="inSISusername" />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    Email
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    <Field field="tenantPerson.email" />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    Phone number
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    <Field field="phoneNumber" />
                                                </TableCell>
                                            </TableRow>
                                            <HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('esnMember') || roles.has('internationalStudent')}>
                                                <TableRow>
                                                    <TableCell>
                                                        ESN Card ID
                                                    </TableCell>
                                                    <TableCell className="font-semibold">
                                                        <Field field="esnCardId" />
                                                    </TableCell>
                                                </TableRow>
                                            </HasRole>
                                            <TableRow>
                                                <TableCell>
                                                    Home university country
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    <Field field="countryOfUniversity.name" />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>
                                                    Home university
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    <Field field="university.name" />
                                                </TableCell>
                                            </TableRow>
                                            <HasRole role={roles => roles.has('admin') || roles.has('coordinator') || roles.has('esnMember') || roles.has('czechBuddy')}>
                                                <TableRow>
                                                    <TableCell>
                                                        Faculty at VSE
                                                    </TableCell>
                                                    <TableCell className="font-semibold">
                                                        <Field field="faculty.name" />
                                                    </TableCell>
                                                </TableRow>
                                            </HasRole>
                                        </TableBody>
                                    </Table>
                                </TableWrapper>
                            </div>
                            <div className="w-full gap-8 flex flex-col">
                                <TableWrapper className="bg-gray-50/50 max-w-lg border rounded-md">
									<Table>
									<TableBody>
										<TableRow>
											<TableCell className="text-2xl font-bold">
												Profile picture
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="text-2xl font-bold">
												<ProfilePictureFieldView srcField="profilePicture.url" width={100} height={100} />
											</TableCell>
										</TableRow>
									</TableBody>
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
