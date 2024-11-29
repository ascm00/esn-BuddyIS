import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { DeleteEntityModalButton } from '@app/lib/buttons/deleteEntityModalButton'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { Component, EntitySubTree, Environment, Field, Link, useEntity, useEntitySubTree, useIdentity } from '@contember/interface'
import { identityEnvironmentExtension } from '@contember/interface'
import { TrashIcon } from 'lucide-react'

export default () => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						My buddy application 🤝
					</Slots.Title>
					<Slots.Back>
						<BackButton />
					</Slots.Back>
					<MyApplicationFR  />
				</div>
			</Binding>
		</>
	)
}

const MyApplicationFR = Component(() => {

    const id = useIdentity()?.person?.id
    const applicationId = useEntitySubTree('myApplicationFr').getField('id').value

    if(!applicationId) {
        return (
            <>
                <div className='bg-blue-200 p-4 rounded-md'><div className='text-500'>You have no buddy applications. Click on 'Apply for a buddy' to apply. ☝️</div></div>
                <Slots.Actions>
                    <Link to="applicationFrCreate">
                    <Button>
                        Apply for a buddy
                    </Button>
                </Link>
            </Slots.Actions>
            </>
        )
    } else {

	return(<>
        <EntitySubTree entity={`ApplicationFr(person.tenantPerson.id='${id}')`} isCreating={false}>
        <Slots.Actions>
            {/* <Link to={`applicationFrEdit(id: '${applicationId}')`}>
                <Button>
                    Edit application
                </Button>
            </Link> */}
            <DeleteEntityModalButton 
				message={`Are you completely sure to delete your buddy application? If you are already assigned to a buddy, it won't delete your buddy pair. In case you want to cancel your buddy pair, please contact us at 'helpdesk@esnvseprague.cz'.`}
				deleteMessage="Delete"
				cancelTo={'myApplicationFr'}
				afterPersistTo={'myApplicationFr'}
			>
				<Button variant={'destructive'}>
					<TrashIcon />
				</Button>
			</DeleteEntityModalButton>
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
                            Semester
                        </TableCell>
                        <TableCell className="font-semibold">
                            <Field field="semester.name" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Study program
                        </TableCell>
                        <TableCell className="font-semibold">
                            <Field field="person.studyProgram.name" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Home University Country
                        </TableCell>
                        <TableCell className="font-semibold">
                            <Field field="person.countryOfUniversity.name" />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            Preferred buddy gender
                        </TableCell>
                        <TableCell className="font-semibold">
                            <PreferredSexCell />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableWrapper>
    </EntitySubTree>
    </>)}
}, (_, env) => (
	<>

		<EntitySubTree entity={`ApplicationFr(person.tenantPerson.id='${env.getExtension(identityEnvironmentExtension).identity?.person?.id}')`} alias={'myApplicationFr'}>
            <Field field="id" />
            <Field field="person.firstName" />
            <Field field="person.surname" />
            <Field field="semester.name" />
            <Field field="person.studyProgram.name" />
            <Field field="person.countryOfUniversity.name" />
            <Field field="preferredBuddySex" />
        </EntitySubTree>
	</>
))

export const PreferredSexCell = Component(() => {
	const entity = useEntity()
	const preferredSex = entity.getField('preferredBuddySex').value

	if(preferredSex === 'dontCare') {
		return 'Not preferred'
	} else if (preferredSex === 'man') {
		return 'Man'
	} else if (preferredSex === 'woman') {
		return 'Woman'
	}
	return null
}, () => (
	<>
		<Field field="preferredBuddySex" />
	</>
))
