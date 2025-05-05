export default `mutation($personId: UUID!, $createData: PersonCreateInput!, $updateData: PersonUpdateInput!) {
	createPerson(by: { id: $personId }, create: $createData, update: $updateData) {
		errorMessage
		errors {
			message
		    type
		}
		ok
	}
}`
