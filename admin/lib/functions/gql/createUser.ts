export default `mutation($personId: UUID!, $createData: PersonCreateInput!, $updateData: PersonUpdateInput!) {
	upsertPerson(by: { id: $personId }, create: $createData, update: $updateData) {
		errorMessage
		errors {
			message
		    type
		}
		ok
	}
}`