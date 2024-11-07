import { SectionCreateForm } from '@app/components/forms/section-create-form'
import { SectionEditForm } from '@app/components/forms/section-edit-form'
import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { CreateEntityModalButton } from '@app/lib/buttons/createEntityModalButtons'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { CurrentEntityLazyModalEdit } from '@app/lib/buttons/modalEdit'
import { DataGrid, DataGridColumn, DataGridEnumColumn, DataGridNumberColumn, DataGridDateColumn,DataGridHasManyFilter, DataGridHasOneColumn, DataGridHasOneFilter, DataGridLoader, DataGridPagination, DataGridQueryFilter, DataGridTable, DataGridTextColumn, DataGridToolbar, DataGridHasManyColumn, DataGridBooleanColumn } from '@app/lib/datagrid'
import { formatDateTime } from '@app/lib/formatting'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Field, HasRole, Link } from '@contember/interface'
import { TrashIcon } from 'lucide-react'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						Registration history
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<>
                    <DataGrid entities="EventRegistration[(event.id = $id)]" filteringStateStorage={'session'}>
                        <DataGridToolbar>
                            <DataGridQueryFilter />
                            <DataGridHasOneFilter field="person" label="User">
                                <Field field="firstName" /> {' '} <Field field="surname" />
                            </DataGridHasOneFilter>
                        </DataGridToolbar>
                        <DataGridLoader>
                            <DataGridTable>
                                <DataGridColumn>
                                    <div className="flex gap-4">
                                        <Link to="registrationDetail(id: $entity.id)">
                                            <Button>Detail</Button>
                                        </Link>
                                    </div>
                                </DataGridColumn>
                                <DataGridHasOneColumn field="person" header="Name">
                                    <Link to="userDetail(id: $entity.id)">
                                        <a>
                                            <Field field="firstName" /> {' '} <Field field="surname" />
                                        </a>
                                    </Link>
                                </DataGridHasOneColumn>
                                <DataGridDateColumn field="createdAt" header="Registered At" children={<Field field="createdAt" format={formatDateTime} />}/>
                                <DataGridBooleanColumn field="accepted" header="Accepted" />
                                <DataGridEnumColumn field="payment" header="Payment" options={{ paid: 'Paid', cancelled: 'Cancelled', pending: 'Pending' }}/>
                                <DataGridNumberColumn field="paymentId" header="Payment ID" />
                                <DataGridTextColumn field="person.tenantPerson.email" header="Email" />
                                <DataGridTextColumn field="person.xname" header="InSIS username" />
                                <DataGridTextColumn field="person.esnCardId" header="ESN Card ID" />
                                <DataGridHasOneColumn field="personWhoMadeRegistration" header="Manually registered by">
                                    <Field field="firstName" /> {' '} <Field field="surname" />
                                </DataGridHasOneColumn>
                            </DataGridTable>
                        </DataGridLoader>
                    </DataGrid>
					</>
				</div>
			</Binding>
		</>
	)
}
