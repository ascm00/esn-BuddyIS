import { Binding } from '@app/lib/binding'
import { BackButton } from '@app/lib/buttons'
import { Slots } from '@app/lib/layout'
import { Button } from '@app/lib/ui/button'
import { Table, TableBody, TableCell, TableRow, TableWrapper } from '@app/lib/ui/table'
import { Component, EntitySubTree, Environment, Field, Link, useEntity, useEntitySubTree, useIdentity } from '@contember/interface'
import { identityEnvironmentExtension } from '@contember/interface'

export default (env : Environment) => {
	return (
		<>
			<Binding>
				<div className="flex flex-col gap-12">
					<Slots.Title>
						My buddy application
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

	return(<>
        <Slots.Actions>
            <Link to={`applicationFrEdit(id: '${applicationId}')`}>
                <Button>
                    Edit application
                </Button>
            </Link>
        </Slots.Actions>
        <EntitySubTree entity={`ApplicationFr(person.tenantPerson.id='${id}')`} isCreating={false}>
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
    </>)
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
